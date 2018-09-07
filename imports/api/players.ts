import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'

import { generateID } from '../logic/utilities'
import Card, { newHand } from '../logic/card'

export interface Player {
  _id: string,
  hand: Card[],
  tokens: number,
}

export const Players = new Mongo.Collection<Player>('players')

Meteor.methods({
  'players.newPlayer': () => {
    const newPlayer: Player = {
      _id: generateID(),
      hand: newHand(),
      tokens: 2,
    }

    Players.insert(newPlayer)

    return newPlayer
  }
})
