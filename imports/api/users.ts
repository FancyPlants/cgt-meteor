import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import Card from '../logic/card'
import { generateID } from '../ui/utilities'
import includes from 'lodash/includes'

interface UserOptions {
  profile: UserProfile
}

Accounts.onCreateUser((options: UserOptions, user: User) => {
  user._id = generateID()
  user.profile = {
    gamesLost: 0,
    gamesWon: 0,
  }

  user.currentGame = {
    hand: [],
    gameId: '',
    tokens: 2,
  }

  return user
})

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

if (Meteor.isServer) {
  Meteor.publish(
    'users',

    // TODO: find a way to hide some of the currentGame info of users
    function users() {
      return Meteor.users.find({}, { fields: {
        username: 1,
        currentGame: 1,
        profile: 1,
      }})
    },
  )
}
