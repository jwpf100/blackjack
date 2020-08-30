const dealerCard1Int = document.getElementById("dealerCard1")
const dealerCard2Int = document.getElementById("dealerCard2")
const dealerCard3Int = document.getElementById("dealerCard3")
const dealerCard4Int = document.getElementById("dealerCard4")
const dealerCard5Int = document.getElementById("dealerCard5")
const dealerCard6Int = document.getElementById("dealerCard6")

const playerCard1Int = document.getElementById("playerCard1")
const playerCard2Int = document.getElementById("playerCard2")
const playerCard3Int = document.getElementById("playerCard3")
const playerCard4Int = document.getElementById("playerCard4")
const playerCard5Int = document.getElementById("playerCard5")
const playerCard6Int = document.getElementById("playerCard6")

const startingCardsInt = document.getElementById("startingCards")
const cardsShuffledInt = document.getElementById("cardsShuffled")
const numberOfCardsLeftInt = document.getElementById("numberOfCardsLeft")

const startGameInt = document.getElementById("startGame")
const dealerNewCardInt = document.getElementById("dealerNewCard")
const playerNewCardInt = document.getElementById("playerNewCard")

const playerScoreInt = document.getElementById("playerScore")
const dealerScoreInt = document.getElementById("dealerScore")

const dealerCardsDisplay = [dealerCard1Int, dealerCard2Int, dealerCard3Int, dealerCard4Int, dealerCard5Int, dealerCard6Int]
const playerCardsDisplay = [playerCard1Int, playerCard2Int, playerCard3Int, playerCard4Int, playerCard5Int, playerCard6Int]

////////////////////////////////
/////Show Cards Interface////////
////////////////////////////////

const displayCards = (arrCard, arrDisplay) => {
  for(let i=0; i < arrCard.length; i++) {
  arrDisplay[i].getElementsByTagName('img')[0].src = `./img/cards/${arrCard[i]['card']}${arrCard[i]['suit']}.png`;
  }
}

////////////////////////////////
/////Start a Game Button////////
////////////////////////////////

startGameInt.addEventListener('click', () => {
  gameInProgress ? alert('Game already started') : startNewGame(1);
})

////////////////////////////////
/////Set Score Interface////////
////////////////////////////////

const setScoreInt = (name, score, scoreArr, scoreInt) => {
  if(scoreArr.length > 1) {
    scoreInt.innerHTML = `${name} Score: ${scoreArr[0]} or ${scoreArr[1]}`;
  } else {scoreInt.innerHTML = `${name} Score: ${score}`;
  }
}

////////////////////////////////
////////TEST FUNCTIONS//////////////
////////////////////////////////

dealerNewCardInt.addEventListener('click', () => {
  dealCard(1, dealerCards, dealerCardsDisplay);
})

playerNewCardInt.addEventListener('click', () => {
  dealCard(1, playerCards, playerCardsDisplay);
})

const playerSetScore = () => {
  scoreCounter(playerCards, playerScoreArr, playerNoDealtCards, playerScore);
  playerCheckScore(playerScoreArr) ;
  setScoreInt('Player', playerScore, playerScoreArr, playerScoreInt);
  playerNoDealtCards = playerCards.length;
}

const dealerSetScore = () => {
  scoreCounter(dealerCards, dealerScoreArr, dealerNoDealtCards, dealerScore);
  dealerCheckScore(dealerScoreArr) ;
  setScoreInt('Dealer', dealerScore, dealerScoreArr, dealerScoreInt);
  dealerNoDealtCards = dealerCards.length;
}

playerScoreInt.addEventListener('click', () => {
playerSetScore()
})



dealerScoreInt.addEventListener('click', () => {
dealerSetScore()
})