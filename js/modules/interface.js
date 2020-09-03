const dealerCard1Int = document.getElementById("dealerCard1")
const dealerCard2Int = document.getElementById("dealerCard2")
const dealerCard3Int = document.getElementById("dealerCard3")
const dealerCard4Int = document.getElementById("dealerCard4")
const dealerCard5Int = document.getElementById("dealerCard5")
const dealerCard6Int = document.getElementById("dealerCard6")
const dealerCard7Int = document.getElementById("dealerCard7")
const dealerCard8Int = document.getElementById("dealerCard8")
const dealerCard9Int = document.getElementById("dealerCard9")
const dealerCard10Int = document.getElementById("dealerCard10")
const dealerCard11Int = document.getElementById("dealerCard11")


const playerCard1Int = document.getElementById("playerCard1")
const playerCard2Int = document.getElementById("playerCard2")
const playerCard3Int = document.getElementById("playerCard3")
const playerCard4Int = document.getElementById("playerCard4")
const playerCard5Int = document.getElementById("playerCard5")
const playerCard6Int = document.getElementById("playerCard6")
const playerCard7Int = document.getElementById("playerCard7")
const playerCard8Int = document.getElementById("playerCard8")
const playerCard9Int = document.getElementById("playerCard9")
const playerCard10Int = document.getElementById("playerCard10")
const playerCard11Int = document.getElementById("playerCard11")

// const startingCardsInt = document.getElementById("startingCards")
// const cardsShuffledInt = document.getElementById("cardsShuffled")
// const numberOfCardsLeftInt = document.getElementById("numberOfCardsLeft")

const useImagesInt = document.getElementById("card-images")

const startGameInt = document.getElementById("startGame")
// const dealerNewCardInt = document.getElementById("dealerNewCard")
// const playerNewCardInt = document.getElementById("playerNewCard")

const playerScoreInt = document.getElementById("playerScoreDisplay")
const dealerScoreInt = document.getElementById("dealerScoreDisplay")

const playerHitInt = document.getElementById("playerHit")
const playerStickInt = document.getElementById("playerStick")
const restartGameInt = document.getElementById("restartGame")

const showControlsInt = document.getElementById("showControls")
const gameControlsInt = document.getElementById("game-controls")

const dealHandInt = document.getElementById("dealHand")
const resetDeckInt = document.getElementById("resetDeck")
const cardDecksInt = document.getElementById("card-decks")
const playerInfoDisplayInt = document.getElementById("playerInfoDisplay")
const dealerInfoDisplayInt = document.getElementById("dealerInfoDisplay")
const debuggingInfoInt = document.getElementById("debuggingInfo")

const gameCountDInt = document.getElementById("gameCountD")
const gameCountPInt = document.getElementById("gameCountP")

const dealerCardsDisplay = [dealerCard1Int, dealerCard2Int, dealerCard3Int, dealerCard4Int, dealerCard5Int, dealerCard6Int, dealerCard7Int, dealerCard8Int, dealerCard9Int, dealerCard10Int, dealerCard11Int]
const playerCardsDisplay = [playerCard1Int, playerCard2Int, playerCard3Int, playerCard4Int, playerCard5Int, playerCard6Int, playerCard7Int, playerCard8Int, playerCard9Int, playerCard10Int, playerCard11Int]

////////////////////////////////////////////
////////Disable/Enable Buttons//////////////
////////////////////////////////////////////

const disablePlayerButtons = () => {
  playerHitInt.disabled = true
  playerStickInt.disabled = true
  dealHandInt.disabled = true
}

const enablePlayerButtons = () => {
  playerHitInt.disabled = false
  playerStickInt.disabled = false
  dealHandInt.disabled = false
}

const enableDealButton = () => {
  dealHandInt.disabled = false
}

const hideButtons = () => {
  $(dealHandInt).hide()
  $(playerHitInt).hide()
  $(playerStickInt).hide()
}

const inPlayButtons = () => {
  $(startGameInt).hide()
  $(playerHitInt).show()
  $(playerStickInt).show()
}

const dealNewHandButtons = () => {
  $(playerHitInt).hide()
  $(playerStickInt).hide()
  $(dealHandInt).show()
}

////////////////////////////////
/////Show Cards Interface////////
////////////////////////////////

const displayCards = (arrCard, arrDisplay) => {
  for (let i = 0; i < arrCard.length; i++) {
    arrDisplay[i].getElementsByTagName('img')[0].src = `./img/cards/${arrCard[i]['card']}${arrCard[i]['suit']}.png`;
    arrDisplay[i].getElementsByTagName('img')[0].classList.add('cardVisible')
  }
}

const displayCardsNoImages = (arrCard, arrDisplay) => {
  for (let i = 0; i < arrCard.length; i++) {
    arrDisplay[i].getElementsByTagName('img')[0].src = ``;
    if(arrCard[i]['suit'] === 'D') {
      arrDisplay[i].getElementsByTagName('p')[0].innerHTML = `${arrCard[i]['card']}&#9830`;
      arrDisplay[i].classList.add('cardRed')
    } else if (arrCard[i]['suit'] === 'H') {
      arrDisplay[i].getElementsByTagName('p')[0].innerHTML = `${arrCard[i]['card']}&#9829`;
      arrDisplay[i].classList.add('cardRed')
    } else if (arrCard[i]['suit'] === 'C') {
      arrDisplay[i].getElementsByTagName('p')[0].innerHTML = `${arrCard[i]['card']}&#9827`;
    } else if (arrCard[i]['suit'] === 'S') { 
      arrDisplay[i].getElementsByTagName('p')[0].innerHTML = `${arrCard[i]['card']}&#9824`;
    }
    arrDisplay[i].classList.add('cardVisible')
  }
  console.log('Noimages')
}


const resetCards = (arrDisplay) => {
  for (let i = 0; i < arrDisplay.length; i++) {
    arrDisplay[i].getElementsByTagName('img')[0].src = `./img/cards/blue_back.png`;
    if (i > 1) {
      arrDisplay[i].getElementsByTagName('img')[0].classList.remove('cardVisible');
      arrDisplay[i].classList.remove('cardVisible');
    }
  }
}

////////////////////////////////
/////Set Score Interface////////
////////////////////////////////

const setScoreInt = (name, score, scoreArr, scoreInt) => {
  if (scoreArr.length > 1) {
    scoreInt.innerHTML = `${scoreArr[0]} or ${scoreArr[1]}`;
  } else {
    scoreInt.innerHTML = `${score}`;
  }
}

////////////////////////////////
/////Start a Game Button////////
////////////////////////////////

startGameInt.addEventListener('click', () => {
  gameInProgress ? alert('Game already in progress.') : startNewGame(cardDecksInt.value);
})

////////////////////////////////
////////Restart Game Button/////////////
////////////////////////////////

restartGameInt.addEventListener('click', () => {
  resetGame();
})


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
  resetDeck();
});

////////////////////////////////
////////HIT/////////////
////////////////////////////////

playerHitInt.addEventListener('click', () => {
  disablePlayerButtons();
  playerHit();

});

////////////////////////////////
////////STICK/////////////
////////////////////////////////

playerStickInt.addEventListener('click', () => {
  playerStick();
});

////////////////////////////////
////////SHOW CONTORLS/////////////
////////////////////////////////

showControlsInt.addEventListener('click', () => {
  if (gameControlsInt.style.display === "none") {
    gameControlsInt.style.display = "block";
  } else {
    gameControlsInt.style.display = "none";
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

// dealerNewCardInt.addEventListener('click', () => {
//   dealCard(1, dealerCards, dealerCardsDisplay);
// })

// playerNewCardInt.addEventListener('click', () => {
//   dealCard(1, playerCards, playerCardsDisplay);
// })

// playerScoreInt.addEventListener('click', () => {
//   playerSetScore()
// })

// dealerScoreInt.addEventListener('click', () => {
//   dealerSetScore()
// })