import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import includes from 'lodash/includes'

import { generateID, MongoID } from '../ui/utilities'
import { User } from './users'
import Card from '../logic/card'
import { GameState } from '../logic/game'

export const Games = new Mongo.Collection<Game>('games')

export interface Game {
  _id: MongoID,
  currentPlayers: PlayerData[], // IDs of players
  currentTurn: MongoID, // Id of single player
  name: string,
  state: GameState,
}

export interface PlayerData {
  hand: Card[],
  tokens: number,
  userId: MongoID, // ID of user this data pertains to
}

if (Meteor.isServer) {
  Meteor.publish(
    'currentGame',
    function currentGame() {
      return Games.find({ currentPlayers: { $elemMatch: { userId: this.userId }} })
    },
  )

  Meteor.methods({
    'games.leaveGame'() {
      Games.update({ currentPlayers: { $elemMatch: { userId: this.userId }} }, { $pull: {
        currentPlayers: { userId: this.userId },
      }})
    },
  })
}
