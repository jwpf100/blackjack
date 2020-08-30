let dealerCards = [];
let playerCards = [];
let playerScoreArr = [0];
let playerNoDealtCards = 0;
let dealerScoreArr = [0];
let dealerNoDealtCards = 0;
const blackjack = 21;
let playerScore = 0;
let dealerScore = 0;
let gameInProgress = false;
let gameCountPlayer = 0;
let gameCountDealer = 0;


const startNewGame = (numDecks) => {
  //Create deck of cards - number of decks optional although currently 1 by default
  createDeck(numDecks);
  //Testing - Log number of cards
  startingCardsInt.innerHTML = deckCards.length
  //Shuffle cards
  shuffleDeck();  
  //Testing - Log shuffled true/false
  cardsShuffledInt.innerHTML = "Yes"
  //Testing - Log number of shuffled cards
  numberOfCardsLeftInt.innerHTML = shuffledDeck.length
  //Deal player 2 cards
  dealCard(2, playerCards, playerCardsDisplay);
  playerSetScore()
  //Deal dealer cards
  dealCard(2, dealerCards, dealerCardsDisplay);
  dealerSetScore()
  if(playerScore === 21) {
    playerInfoDisplayInt.innerHTML = `Player is on ${playerScore} : Dealer's turn...`
    dealersGo()
  } else {
  playerInfoDisplayInt.innerHTML = `Player is on ${playerScore} : Hit or Stick?`
  }
  gameInProgress = true;
}

/////////////////////////////
/////DEAL CARDS////////////
/////////////////////////////

const dealCard = (num, arrCards, arrDisplay) => {
  for (let i=0; i < num; i++) {
    let card = shuffledDeck.shift();
  arrCards.push(card);
  countCards();
};
  displayCards(arrCards, arrDisplay);
}


////////////////////////////////
////////DEALER's GO
////////////////////////////////

const dealersGo = () => {
  if(dealerScore === 'BUST') {
    compareScores()
  } else if (dealerScore > 16 ) {
    compareScores()
  } else {
    playerInfoDisplayInt.innerHTML = `Dealer is on ${dealerScore}. Dealer Hits.`
    dealCard(1, dealerCards, dealerCardsDisplay)
    dealerSetScore()
    dealersGo()
  }
  }

  ////////////////////////////////
////////Compare Scores
////////////////////////////////

const compareScores = () => {
  if (dealerScore === 'BUST' && playerScore === 'BUST') {
    playerInfoDisplayInt.innerHTML = `It's a draw! Both players have gone bust.`
  } else if (dealerScore === 'BUST') {
    playerInfoDisplayInt.innerHTML = `Player wins with ${playerScore}! Dealer has gone bust.`
    gameCountPlayer ++
    gameCountPInt.innerHTML = `Player Games: ${gameCountPlayer}`
  } else if (playerScore === 'BUST') { 
    playerInfoDisplayInt.innerHTML = `Dealer wins! Player has gone bust`
    gameCountDealer ++
    gameCountDInt.innerHTML = `Dealer Games: ${gameCountDealer}`
  } else if (playerScore > dealerScore) { 
    playerInfoDisplayInt.innerHTML = `Player wins with ${playerScore}!`
    gameCountPlayer ++
    gameCountPInt.innerHTML = `Player Games: ${gameCountPlayer}`
  } else if (playerScore < dealerScore) { 
    playerInfoDisplayInt.innerHTML = `Dealer wins with ${dealerScore}!`
    gameCountDealer ++
    gameCountDInt.innerHTML = `Dealer Games: ${gameCountDealer}`
  } else if (playerScore === dealerScore) { 
    playerInfoDisplayInt.innerHTML = `It's a draw! Both players have ${dealerScore}.`
}
gameInProgress = false;
};


const countCards = () => {
  numberOfCardsLeftInt.innerHTML = shuffledDeck.length
}


// dealerCard1.innerHTML = `${shuffledDeck[51].card} ${shuffledDeck[51].suit}`;

// console.log(shuffledDeck[1])