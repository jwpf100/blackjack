///////////////////////////
//////list of elements/////
///////////////////////////

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

const useImagesInt = document.getElementById("card-images")
const dealersTurnInt = document.getElementById("dealers-turn")
const cardDelayInt = document.getElementById("card-delay")

const startGameInt = document.getElementById("startGame")

const playerScoreInt = document.getElementById("playerScoreDisplay")
const dealerScoreInt = document.getElementById("dealerScoreDisplay")

const playerHitInt = document.getElementById("playerHit")
const playerStickInt = document.getElementById("playerStick")
const restartGameInt = document.getElementById("restartGame")
const dealersGoInt = document.getElementById("dealersGo")

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

///////////////////////////
////////Card Arrays  //////
///////////////////////////

const dealerCardsDisplay = [dealerCard1Int, dealerCard2Int, dealerCard3Int, dealerCard4Int, dealerCard5Int, dealerCard6Int, dealerCard7Int, dealerCard8Int, dealerCard9Int, dealerCard10Int, dealerCard11Int]
const playerCardsDisplay = [playerCard1Int, playerCard2Int, playerCard3Int, playerCard4Int, playerCard5Int, playerCard6Int, playerCard7Int, playerCard8Int, playerCard9Int, playerCard10Int, playerCard11Int]

////////////////////////////////////////////
////////Disable/Enable/SHow/Hide Buttons//////////////
////////////////////////////////////////////

const disablePlayerButtons = () => {
  playerHitInt.disabled = true
  playerStickInt.disabled = true
  dealHandInt.disabled = true
  dealersGoInt.disabled = false
}


const enablePlayerButtons = () => {
  playerHitInt.disabled = false
  playerStickInt.disabled = false
  dealHandInt.disabled = false
  dealersGoInt.disabled = true
}

const enableDealButton = () => {
  dealHandInt.disabled = false
}

const hideButtons = () => {
  $(dealHandInt).hide()
  $(playerHitInt).hide()
  $(playerStickInt).hide()
  // $(showControlsInt).hide()
  $(dealersGoInt).hide()
}

const inPlayButtons = () => {
  $(startGameInt).hide()
  $(showControlsInt).hide()
  $(playerHitInt).show()
  $(playerStickInt).show()
  $(dealersGoInt).hide()
}

const dealNewHandButtons = () => {
  $(playerHitInt).hide()
  $(playerStickInt).hide()
  $(dealHandInt).show()
  $(showControlsInt).show()
  $(dealersGoInt).hide()
}

////////////////////////////////
/////Display Cards on Screen////////
////////////////////////////////

const displayCards = (arrCard, arrDisplay) => {
  for (let i = 0; i < arrCard.length; i++) {
    arrDisplay[i].getElementsByTagName('img')[0].src = `./img/cards/${arrCard[i]['card']}${arrCard[i]['suit']}.png`;
    arrDisplay[i].getElementsByTagName('img')[0].classList.add('cardVisible')
  }
}

////////////////////////////////
/////Display Cards on Screen without pictures////////
////////////////////////////////

const displayCardsNoImages = (arrCard, arrDisplay) => {
  for (let i = 0; i < arrCard.length; i++) {
    arrDisplay[i].getElementsByTagName('img')[0].src = ``;
    if (arrCard[i]['suit'] === 'D') {
      arrDisplay[i].getElementsByTagName('p')[0].innerHTML = `${arrCard[i]['card']}&#9830`;
      arrDisplay[i].classList.add('cardRed')
      arrDisplay[i].getElementsByTagName('p')[0].classList.add('cardVisible')
    } else if (arrCard[i]['suit'] === 'H') {
      arrDisplay[i].getElementsByTagName('p')[0].innerHTML = `${arrCard[i]['card']}&#9829`;
      arrDisplay[i].classList.add('cardRed')
      arrDisplay[i].getElementsByTagName('p')[0].classList.add('cardVisible')
    } else if (arrCard[i]['suit'] === 'C') {
      arrDisplay[i].getElementsByTagName('p')[0].innerHTML = `${arrCard[i]['card']}&#9827`;
      arrDisplay[i].classList.add('cardBlack')
      arrDisplay[i].getElementsByTagName('p')[0].classList.add('cardVisible');
    } else if (arrCard[i]['suit'] === 'S') {
      arrDisplay[i].getElementsByTagName('p')[0].innerHTML = `${arrCard[i]['card']}&#9824`;
      arrDisplay[i].classList.add('cardBlack')
      arrDisplay[i].getElementsByTagName('p')[0].classList.add('cardVisible');
    }
    arrDisplay[i].classList.add('cardVisible')
  }
  console.log('Noimages')
}

////////////////////////////////
/////Reset Cards Displayed at end of game////////
////////////////////////////////

const resetCards = (arrDisplay) => {
  for (let i = 0; i < arrDisplay.length; i++) {
    arrDisplay[i].getElementsByTagName('img')[0].src = `./img/cards/blue_back.png`;
    arrDisplay[i].getElementsByTagName('p')[0].innerHTML = ``;
    arrDisplay[i].classList.remove('cardRed');
    arrDisplay[i].classList.remove('cardBlack');
    arrDisplay[i].getElementsByTagName('img')[0].classList.remove('cardVisible');
    if (i > 1) {
      arrDisplay[i].getElementsByTagName('img')[0].classList.remove('cardVisible');
      arrDisplay[i].classList.remove('cardVisible');
      arrDisplay[i].getElementsByTagName('p')[0].innerHTML = ``;
      arrDisplay[i].classList.remove('cardRed');
      arrDisplay[i].classList.remove('cardBlack');
      // arrDisplay[i].getElementsByTagName('p')[0].classList.remove('cardVisible');
    }
  }
}

////////////////////////////////
////////Show scores on screen
////////////////////////////////

const setScoreInt = (name, score, scoreArr, scoreInt) => {
  if (scoreArr.length > 1) {
    scoreInt.innerHTML = `${scoreArr[0]} or ${scoreArr[1]}`;
  } else {
    scoreInt.innerHTML = `${score}`;
  }
}

////////////////////////////////
/////Start a Game Button Listener////////
////////////////////////////////

startGameInt.addEventListener('click', () => {
  gameInProgress ? alert('Game already in progress.') : startNewGame(cardDecksInt.value);
})

////////////////////////////////
////////Restart Game Button Listener (Testing Only)/////////////
////////////////////////////////

// restartGameInt.addEventListener('click', () => {
//   resetGame();
// })


////////////////////////////////
////////Deal new Hand Button Listener/////////////
////////////////////////////////

dealHandInt.addEventListener('click', () => {
  if (!gameInProgress) {
    resetGame()
    dealNewHand()
  } else {
    alert('Game already in progress!')
  }
});

////////////////////////////////
////////Reset Deck (Testing Only)/////////////
////////////////////////////////

// resetDeckInt.addEventListener('click', () => {
//   resetDeck();
// });

////////////////////////////////
////////Player HIT Button Listener/////////////
////////////////////////////////

playerHitInt.addEventListener('click', () => {
  disablePlayerButtons();
  playerHit();
});

////////////////////////////////
////////Player STICK Button Listener/////////////
////////////////////////////////

playerStickInt.addEventListener('click', () => {
  playerStick();
});



////////////////////////////////
////////Dealers Go Button Listener/////////////
////////////////////////////////

dealersGoInt.addEventListener('click', () => {
  $(dealersGoInt).hide()
  dealersGo();
});



////////////////////////////////
////////SHOW Controls button Listener/////////////
////////////////////////////////

showControlsInt.addEventListener('click', () => {
  if (gameControlsInt.style.display === "none") {
    gameControlsInt.style.display = "block";
  } else {
    gameControlsInt.style.display = "none";
  }
});

////////////////////////////////
////////Count up cards and set scores at the end of each go//////////////
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

////////////////////////////////