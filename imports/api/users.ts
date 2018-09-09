import { Meteor } from 'meteor/meteor'
import { Accounts } from 'meteor/accounts-base'
import Card from '../logic/card'
import includes from 'lodash/includes'

// Accounts.onCreateUser((options, user) => {
//   user.
// })

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
      return Meteor.users.find({})
    },
  )
}
