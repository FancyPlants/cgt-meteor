import { Meteor } from 'meteor/meteor'

import { generateID } from '../imports/ui/utilities'

// this is so outrageously important
import '../imports/api/users'
import '../imports/api/lobbies'
import '../imports/api/games'

Meteor.startup(() => {
  // code to run on server at startup
})
