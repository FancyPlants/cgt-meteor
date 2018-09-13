/*
 * What is this enum for? Well my thinking is that,
 * within a turn-based game like not-coup, there are points where
 * the game "stops" and a player must make a decision. This is meant
 * mainly so that I can visualize what this game needs.
 *
 * holy fuck games are just fat state machines
 */

// this enum doesn't need a state for income
export enum GameState {
  // player is able to choose to coup, income, and any other special power
  TURN_START = 'turn_start',

  // only a game-stopping choice when a targeted user has more than one card
  COUP = 'coup',

  // gives players an option to call out any card use of any other player
  // this should encompass basically every use of assassin -> ambassador
  BLUFF_CALL = 'bluff_call',

  // when a player is being assassinated, they can choose to accept it, call
  // the bluff of the person assassinating them, or claim contessa
  ASSASSINATION = 'assassination',

  // if a player being assassinated claims contessa, then the attacking
  // player can accept the contessa claim or claim the defender is bluffing
  CONTESSA_CLAIMED = 'contessa_claimed',

  // when someone uses a captain, the person being stolen from is able to
  // block it with a captain, at which time the thief can accept it or
  // call their bluff
  CAPTAIN_BLOCK_CAPTAIN = 'captain_block_captain',

  // stealing can also be blocked with ambassador, with same actions as above
  CAPTAIN_BLOCK_AMBASSADOR = 'captain_block_ambassador',

  // if player attempts to draw new influences and isn't called on any bluffs,
  // then they have the choice between two cards
  AMBASSADOR_DRAW = 'ambassador_draw',

  // if a player attempts to draw 2 tokens instead of one, any other player can
  // claim a duke to prevent the foreign aid. At that point, if someone claims
  // duke, the state turns to a normal BLUFF_CALL
  FOREIGN_AID = 'foreign_aid',

  // after getting coup'd or assassinated or something, the user
  // has the option of choosing either card to lose
  LOSING_CARD = 'losing_card',
}
