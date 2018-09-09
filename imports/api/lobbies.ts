import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import includes from 'lodash/includes'

import { generateID } from '../logic/utilities'
import { User } from './users'

export interface Lobby {
  _id: string,
  name: string,

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
      const currentLobbies = Lobbies.find({ name }).fetch()

      if (currentLobbies.length > 0) {
        throw new Meteor.Error('Lobby with the same name already exists!')
      }

      Lobbies.insert({
        _id: generateID(),
        name,
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
  })
}
