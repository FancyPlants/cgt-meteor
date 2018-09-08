import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import Card from '../logic/card'

export interface User extends Meteor.User {
  currentGame: CurrentGame,
  profile: UserProfile,
}

interface CurrentGame {
  hand: Card[],
  gameId: string,
  tokens: number,
}

interface UserProfile {
  gamesWon: number,
  gamesLost: number,
}
