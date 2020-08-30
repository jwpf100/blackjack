const dealerCards = [];
const playerCards = [];
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
  // countCardScore(playerCards, playerScoreArr, playerNoDealtCards);
  // checkScore(playerScoreArr)
  // setScoreInt('Player', playerScore, playerScoreArr, playerScoreInt)
  //Deal dealer cards
  dealCard(2, dealerCards, dealerCardsDisplay);
  // countCardScore(dealerCards,dealerScoreArr,dealerNoDealtCards)
  // checkScore(dealerScoreArr)
  // setScoreInt('Dealer', dealerScore, dealerScoreArr, dealerScoreInt)
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

/////////////////////////////
/////CALCULATE SCORE////////////
/////////////////////////////

const countCardScore = (arrCards, arrScore, noCards) => {
  for(i=noCards; i<arrCards.length; i++) {
    switch (arrCards[i]['card']) {
      case 'A':
        if(arrScore.length === 1) {
          arrScore.push(arrScore[0]);
          arrScore[0] = (arrScore[0] * 1) + 1;
          arrScore[1] = (arrScore[1] * 1) + 11;
        }else{
          arrScore[0] = (arrScore[0] * 1) + 1;
          arrScore[1] = (arrScore[1] * 1 ) + 1;
        }
        break;
      case 'J': case 'Q': case 'K':
        if(arrScore.length === 1) {
          arrScore[0] = (arrScore[0] * 1 ) + 10;
        }else{
          arrScore[0] = (arrScore[0] * 1 ) + 10;
          arrScore[1] = (arrScore[1] * 1) + 10;
        }
        break;
      default:
        if(arrScore.length === 1) {
          arrScore[0] = (arrScore[0] * 1 ) + (arrCards[i]['card'] * 1 );
        }else{
          arrScore[0] = (arrScore[0] * 1 ) + (arrCards[i]['card'] * 1);
          arrScore[1] = (arrScore[1] * 1 ) + (arrCards[i]['card'] * 1 );
        }
    }
    noCards++
} 
}

const checkScore = (arrScore, score) => {
  console.log('Starting checkScore')
  if(arrScore.length > 1 ) {
    if(arrScore[1] > 21) {
      arrScore.pop();
      score = arrScore[0];
    } else {
      score = arrScore[1];
    }
  } else {
    if(arrScore[0] > 21) {
      console.log('Bust')
      score = 'BUST'
    } else {
      console.log('Expecting this')
      score = arrScore[0];
      console.log(score)
    }
  }
  setScoreInt('Player', score, arrScore, playerScoreInt)
} 


////////////////////////////////
////////////////////////////////HIT
////////////////////////////////


const countCards = () => {
  numberOfCardsLeftInt.innerHTML = shuffledDeck.length
}


// dealerCard1.innerHTML = `${shuffledDeck[51].card} ${shuffledDeck[51].suit}`;

// console.log(shuffledDeck[1])