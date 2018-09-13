import { Meteor } from 'meteor/meteor'

import { MongoID } from '../ui/utilities'
import { Card } from './card'
import { Games } from '../api/games'

// stil unsure I'm going to use this, but I'm thinking that decision trees
// need to have the edges defined as well, for transitioning the state of this machine
export enum GameAction {
  INCOME = 'income',

}

// want to structure this like a Redux reducer, e.g. have a single
// function which users playing can dispatch actions to
export interface DispatchedAction {
  gameId: MongoID,
  payload?: ActionPayload,
  type: GameAction,
  userId: MongoID, // current user
}

export interface ActionPayload {
  cardSelected?: Card,
  targetUserId?: MongoID,
}

// * This is where it's at, all the good shit is happening here
export function performAction(action: DispatchedAction) {
  // validate above all else
  validateAction(action)

  // then, make sure that it's actually this person's turn
  const userId = Meteor.userId()
  const game = Games.findOne({ _id: action.gameId })

  let flag = false
  for (const playerData of game.currentPlayers) {
    if (playerData.userId === userId) {
      flag = true
      break
    }
  }

  if (!flag) {
    throw new Meteor.Error('User does not exist in this game.')
  }

  // TODO: Implement checking if it's this user's turn

  switch (action.type) {
    case GameAction.INCOME:

  }
}

function validateAction(possibleAction: DispatchedAction) {
  // can't validate much unfortunately, too much changes
  let isValid = false
  try {
    isValid = (
      typeof possibleAction.type === 'string' &&
      typeof possibleAction.userId === 'string' &&
      typeof possibleAction.gameId === 'string'
    )
  } catch (err) {
    throw new Meteor.Error('Invalid action')
  }

  if (!isValid) {
    throw new Meteor.Error('Invalid action')
  }
}
