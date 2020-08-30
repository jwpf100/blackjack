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
  //Set Scores
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
    console.log('dealer hits')
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
    console.log("Draw") 
  } else if (dealerScore === 'BUST') {
    console.log("Player Wins")
  } else if (playerScore === 'BUST') { 
    console.log("Dealer Wins")
  } else if (playerScore > dealerScore) { 
    console.log("Player Wins")
  } else if (playerScore < dealerScore) { 
    console.log("Dealer Wins")
  } else if (playerScore === dealerScore) { 
    console.log("Draw")
}
};


const countCards = () => {
  numberOfCardsLeftInt.innerHTML = shuffledDeck.length
}


// dealerCard1.innerHTML = `${shuffledDeck[51].card} ${shuffledDeck[51].suit}`;

// console.log(shuffledDeck[1])