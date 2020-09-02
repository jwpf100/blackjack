const cardFactory = (card, suit) => {
  return {
    card,
    suit,
  }
}

const suits = ['H', 'S', 'C', 'D'];
const faces = ['J', 'Q', 'K', 'A'];
const numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10];
let deckCards = [];
let shuffledDeck = [];

//Create (num) deck(s) of cards//
const createDeck = (num) => {
  let i = 0;
  while (i < num) {
    suits.forEach(suit => {
      numbers.forEach(number => {
        deckCards.push(cardFactory(number, suit))
      });
      faces.forEach(face => {
        deckCards.push(cardFactory(face, suit))
      });
    });
    i++;
  }
  startingDeck = deckCards.length;
  return deckCards
}

const shuffleDeckTest = () => {
  shuffledDeck = [];
  shuffledDeck.push(cardFactory('A', 'C'))
  shuffledDeck.push(cardFactory('10', 'C'))
  shuffledDeck.push(cardFactory('5', 'C'))
  shuffledDeck.push(cardFactory('6', 'C'))
  shuffledDeck.push(cardFactory('8', 'C'))
  shuffledDeck.push(cardFactory('A', 'C'))
  shuffledDeck.push(cardFactory('A', 'C'))
  shuffledDeck.push(cardFactory('8', 'C'))
  return shuffledDeck;
}

//Shuffle Deck
const shuffleDeck = () => {
  const numberShuffle = deckCards.length;
    shuffledDeck = [];
  for (let i = 0; i < numberShuffle; i++) {
    let numberCards = deckCards.length;
    //Pick random card
    let shuffledCardPosition = Math.floor(Math.random() * numberCards)
    //Add Card to shuffledDeck
    shuffledDeck.push(deckCards[shuffledCardPosition])
    //Remove Card from deckCards
    deckCards.splice(shuffledCardPosition, 1)
  }
  return shuffledDeck;
}

//Test shuffling works
// createDeck(1)
// console.log(`Deck of cards length = ${deckCards.length}`)
// console.log(`Card 1 = ${deckCards[0].card}, ${deckCards[0].suit}`)
// console.log(`Card 52 = ${deckCards[51].card}, ${deckCards[51].suit}`)
// shuffleDeck()
// console.log("Now shuffle Cards")
// console.log(`Deck of cards length = ${deckCards.length}`)
// console.log(`Shuffled deck of cards length = ${shuffledDeck.length}`)
// console.log(`Card 1 = ${shuffledDeck[0].card}, ${shuffledDeck[0].suit}`)
// console.log(`Card 52 = ${shuffledDeck[51].card}, ${shuffledDeck[51].suit}`)
