import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import includes from 'lodash/includes'

import { generateID } from '../ui/utilities'
import { User } from './users'

export interface Lobby {
  _id: string,
  name: string,
  isStarting: boolean,

  // player IDs
  currentPlayers: string[],
  maxPlayers: number,
}

export const Lobbies = new Mongo.Collection<Lobby>('lobbies')

if (Meteor.isServer) {
  Meteor.publish(
    'lobbies',
    function lobbies() {
      return Lobbies.find({})
    },
  )

  // ! Will be used later when app is more secure, just gotta do that
  // * AGILE DEVELOPMENT
  // Meteor.publish(
  //   'currentLobby',
  //   function lobbyPlayers(lobbyId: string) {
  //     return Lobbies.findOne({ _id: lobbyId })
  //   },
  // )

  Meteor.methods({
    'lobbies.newLobby'(name: string) {
      check(name, String)
      const currentLobbies = Lobbies.find({ name }).count()

      if (currentLobbies > 0) {
        throw new Meteor.Error('Lobby with the same name already exists!')
      }

      Lobbies.insert({
        _id: generateID(),
        name,
        isStarting: false,
        currentPlayers: [],
        maxPlayers: 10,
      })
    },

    'lobbies.joinLobby'(name: string) {
      check(name, String)

      const lobby = Lobbies.findOne({ name })

      // check different cases
      if (!lobby) {
        throw new Meteor.Error('Lobby does not exist!')
      }

      if (lobby.currentPlayers.length >= lobby.maxPlayers) {
        throw new Meteor.Error('Lobby is full!')
      }

      if (includes(lobby.currentPlayers, Meteor.userId())) {
        throw new Meteor.Error('You have already joined this lobby!')
      }

      Lobbies.update({ _id: lobby._id }, { $push: { currentPlayers: Meteor.userId() }})
    },

    'lobbies.leaveLobby'() {
      const userId = Meteor.userId()

      const lobby = Lobbies.findOne({ currentPlayers: userId })

      if (!lobby || !includes(lobby.currentPlayers, userId)) {
        throw new Meteor.Error('Unable to leave this lobby')
      }

      // delete lobby if nobody is there
      if (lobby.currentPlayers.length <= 1) {
        Lobbies.remove({ _id: lobby._id })
      } else {
        Lobbies.update({ _id: lobby._id }, { $pull: { currentPlayers: userId } })
      }
    },

    'lobbies.kickPlayer'(userId: string) {
      check(userId, String)
      const lobby = Lobbies.findOne({ currentPlayers: this.userId })

      if (!lobby || !includes(lobby.currentPlayers, this.userId)) {
        throw new Meteor.Error('Unable to kick player')
      }

      const host = Meteor.users.findOne({ _id: lobby.currentPlayers[0] })

      if (this.userId !== host._id) {
        throw new Meteor.Error('You are not the host of this game, cannot kick')
      }

      Lobbies.update({ _id: lobby._id }, { $pull: { currentPlayers: userId } })
    },

    'lobbies.startGame'() {
      const lobby = Lobbies.findOne({ currentPlayers: this.userId })

      if (!lobby) {
        throw new Meteor.Error('Wtf are you trying to do rn')
      }

      const host = Meteor.users.findOne({ _id: lobby.currentPlayers[0] })

      if (this.userId !== host._id) {
        throw new Meteor.Error('You are not the host, unable to start game.')
      }

      Lobbies.update({ _id: lobby._id }, { $set: { isStarting: true } })
      // TODO: create a game
    },
  })
}
