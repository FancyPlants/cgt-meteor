import random from 'lodash/random'

export enum Card {
  Assassin = 'assassin',
  Captain = 'captain',
  Contessa = 'contessa',
  Duke = 'duke',
  Ambassador = 'ambassador',
}

const cards = [
  Card.Assassin,
  Card.Captain,
  Card.Contessa,
  Card.Duke,
  Card.Ambassador,
]

export const newHand = () => [
  cards[random(0, cards.length - 1)],
  cards[random(0, cards.length - 1)],
]
