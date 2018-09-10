import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'
import includes from 'lodash/includes'

import { generateID } from '../ui/utilities'
import { User } from './users'

export interface Game {
  currentPlayers: string, // IDs of players
  state: string,
}
