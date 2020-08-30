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

const playerHitInt = document.getElementById("playerHit")
const playerStickInt = document.getElementById("playerStick")
const restartGameInt = document.getElementById("restartGame")

const dealHandInt = document.getElementById("dealHand")
const resetDeckInt = document.getElementById("resetDeck")
const cardDecksInt = document.getElementById("card-decks")
const playerInfoDisplayInt = document.getElementById("playerInfoDisplay")

const gameCountDInt = document.getElementById("gameCountD")
const gameCountPInt = document.getElementById("gameCountP")

const dealerCardsDisplay = [dealerCard1Int, dealerCard2Int, dealerCard3Int, dealerCard4Int, dealerCard5Int, dealerCard6Int]
const playerCardsDisplay = [playerCard1Int, playerCard2Int, playerCard3Int, playerCard4Int, playerCard5Int, playerCard6Int]

////////////////////////////////
/////Show Cards Interface////////
////////////////////////////////

const displayCards = (arrCard, arrDisplay) => {
  for (let i = 0; i < arrCard.length; i++) {
    arrDisplay[i].getElementsByTagName('img')[0].src = `./img/cards/${arrCard[i]['card']}${arrCard[i]['suit']}.png`;
  }
}

const resetCards = (arrDisplay) => {
  for (let i = 0; i < arrDisplay.length; i++) {
    arrDisplay[i].getElementsByTagName('img')[0].src = `./img/cards/blue_back.png`;
  }
}

////////////////////////////////
/////Start a Game Button////////
////////////////////////////////

startGameInt.addEventListener('click', () => {
  gameInProgress ? alert('Game already in progress.') : startNewGame(cardDecksInt.value);
})

////////////////////////////////
/////Set Score Interface////////
////////////////////////////////

const setScoreInt = (name, score, scoreArr, scoreInt) => {
  if (scoreArr.length > 1) {
    scoreInt.innerHTML = `${name} Score: ${scoreArr[0]} or ${scoreArr[1]}`;
  } else {
    scoreInt.innerHTML = `${name} Score: ${score}`;
  }
}

////////////////////////////////
////////Restart /////////////
////////////////////////////////

restartGameInt.addEventListener('click', () => {
  resetGame();
})

const resetGame = () => {
  gameInProgress = false;
  dealerCards = [];
  resetCards(dealerCardsDisplay)
  dealerScore = 0
  dealerNoDealtCards = 0
  dealerScoreArr = [0]
  setScoreInt('Dealer', dealerScore, dealerScoreArr, dealerScoreInt)
  playerCards = [];
  resetCards(playerCardsDisplay)
  playerScore = 0
  playerNoDealtCards = 0
  playerScoreArr = [0]
  setScoreInt('Player', playerScore, playerScoreArr, playerScoreInt)
}

////////////////////////////////
////////Deal New Hand /////////////
////////////////////////////////

const dealNewHand = () => {
  if (!gameInProgress) {
    dealCard(2, playerCards, playerCardsDisplay);
    playerSetScore()
    dealCard(2, dealerCards, dealerCardsDisplay);
    dealerSetScore()
    if (playerScore === 21) {
      playerInfoDisplayInt.innerHTML = `Player is on ${playerScore} : Dealer's turn...`
    } else {
      playerInfoDisplayInt.innerHTML = `Player is on ${playerScore} : Hit or Stick?`
    }
    gameInProgress = true;
  } else {
    alert('Game already in progress!')
  }
}

dealHandInt.addEventListener('click', () => {
  if (!gameInProgress) {
    resetGame()
    dealNewHand()
  } else {
    alert('Game already in progress!')
  }
});

////////////////////////////////
////////Reset Deck /////////////
////////////////////////////////

resetDeckInt.addEventListener('click', () => {
  if (!gameInProgress) {
    deckCards = [];
    shuffledDeck = [];
    createDeck(cardDecksInt.value);
    startingCardsInt.innerHTML = deckCards.length
    shuffleDeck();
    //Testing - Log shuffled true/false
    cardsShuffledInt.innerHTML = "Yes"
    //Testing - Log number of shuffled cards
    numberOfCardsLeftInt.innerHTML = shuffledDeck.length
  } else {
    alert('Game already in progress!')
  }
});


////////////////////////////////
////////HIT/////////////
////////////////////////////////

playerHitInt.addEventListener('click', () => {
  if (gameInProgress) {
    if (playerScore < 21 && playerScore !== 'BUST') {
      dealCard(1, playerCards, playerCardsDisplay);
      playerSetScore();
      if (playerScore === 'BUST') {
        playerInfoDisplayInt.innerHTML = `Player is ${playerScore} : Dealer's turn...`;
        dealersGo();
      } else if (playerScore === 21) {
        playerInfoDisplayInt.innerHTML = `Player is on ${playerScore} : Dealer's turn...`;
        dealersGo();
      } else {
        playerInfoDisplayInt.innerHTML = `Player is on ${playerScore} : Hit or Stick?`
      };
    } else {
      alert('No game currently in progress')
    }
  }
});

////////////////////////////////
////////STICK/////////////
////////////////////////////////

playerStickInt.addEventListener('click', () => {
  if (gameInProgress) {
    /////Code to switch to dealer's go
    dealersGo()
  } else {
    alert('No game currently in progress')
  }
});


////////////////////////////////
////////DISPLAY HAND TOTALS//////////////
////////////////////////////////

const playerSetScore = () => {
  scoreCounter(playerCards, playerScoreArr, playerNoDealtCards, playerScore);
  playerCheckScore(playerScoreArr);
  setScoreInt('Player', playerScore, playerScoreArr, playerScoreInt);
  playerNoDealtCards = playerCards.length;
}

const dealerSetScore = () => {
  //console.log(dealerCards, dealerScoreArr, dealerNoDealtCards, dealerScore)
  scoreCounter(dealerCards, dealerScoreArr, dealerNoDealtCards, dealerScore);
  //console.log(dealerScoreArr)
  dealerCheckScore(dealerScoreArr);
  //console.log('Dealer', dealerScore, dealerScoreArr, dealerScoreInt);
  setScoreInt('Dealer', dealerScore, dealerScoreArr, dealerScoreInt);
  dealerNoDealtCards = dealerCards.length;
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

playerScoreInt.addEventListener('click', () => {
  playerSetScore()
})

dealerScoreInt.addEventListener('click', () => {
  dealerSetScore()
})