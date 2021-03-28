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
let dealersTurnActive = false;
let startingDeck = 0;
let minDelay = 250;

/////////////////////////////
/////Initial Game Set Up////////////
/////////////////////////////

disablePlayerButtons()
hideButtons()
$(startGameInt).show()

const startNewGame = (numDecks) => {
  //Create deck of cards - number of decks optional 
  createDeck(numDecks);
  //Shuffle cards
  shuffleDeck();
  //Deal player 2 cards
  dealCard(2, playerCards, playerCardsDisplay);
  playerSetScore();
  //Deal dealer cards
  //Card 1 face up
  dealCard(1, dealerCards, dealerCardsDisplay);
  dealerSetScore();
  //Card 2 face down
  dealCardFaceDown(1, dealerCards, dealerCardsDisplay);
  //Enable player buttons - Stick Hit
  enablePlayerButtons()
  inPlayButtons()
  gameInProgress = true;
  //If player hits 21 - dealers Go  
  if (playerScore === 21) {
    playerInfoDisplayInt.children[0].innerHTML = `Player is on ${playerScore} : Dealer's turn...`;
    disablePlayerButtons()
    hideButtons()
    if (cardDelayInt.value < minDelay || dealersTurnInt.checked) {
      $(dealersGoInt).show()
    } else {
      setTimeout(() => {
        dealersGo();
      }, cardDelayInt.value);
    };
    //Else Player to select action
  } else {
    playerInfoDisplayInt.children[0].innerHTML = `Player is on ${playerScore} : Hit or Stick?`

  }
}

////////////////////////////////
////////Deal New Hand/////////////
////////////////////////////////

//As Above but with game in progress, could merge this with the above to reduce code.  

const dealNewHand = () => {
  if (!gameInProgress) {
    disablePlayerButtons()
    hideButtons()
    //Deal player 2 cards
    dealCard(2, playerCards, playerCardsDisplay);
    playerSetScore();
    //Deal dealer cards
    //Card 1 face up
    dealCard(1, dealerCards, dealerCardsDisplay);
    dealerSetScore();
    //Card 2 face down
    dealCardFaceDown(1, dealerCards, dealerCardsDisplay);
    if (playerScore === 21) {
      playerInfoDisplayInt.children[0].innerHTML = `Player is on ${playerScore} : Dealer's turn...`

      if (cardDelayInt.value < minDelay || dealersTurnInt.checked) {
        $(dealersGoInt).show()
      } else {
        setTimeout(() => {
          dealersGo();
        }, cardDelayInt.value);
      };

    } else {
      playerInfoDisplayInt.children[0].innerHTML = `Player is on ${playerScore} : Hit or Stick?`
      enablePlayerButtons()
      inPlayButtons()
    }
    gameInProgress = true;
  } else {
    alert('Game already in progress!')
  }
}


/////////////////////////////
/////DEAL CARDS////////////
/////////////////////////////


//Add shuffled cards to the relevant array 

const dealCard = (num, arrCards, arrDisplay) => {
  for (let i = 0; i < num; i++) {
    let card = shuffledDeck.shift();
    arrCards.push(card);
    // countCards();
  };
  if (useImagesInt.checked) {
    displayCards(arrCards, arrDisplay);
    console.log('images')
  } else {
    displayCardsNoImages(arrCards, arrDisplay);
  }
}

//as above but facedown for dealer's second card

const dealCardFaceDown = (num, arrCards, arrDisplay) => {
  for (let i = 0; i < num; i++) {
    let card = shuffledDeck.shift();
    arrCards.push(card);
    // countCards();
  };
}


//////////////////////////////
////////Count score//////////
//////////////////////////////

const scoreCounter = (arrCards, arrScore, noCards, score) => {
  if (score !== 'BUST') {
    for (i = noCards; i < arrCards.length; i++) {
      switch (arrCards[i]['card']) {
        case 'A':
          if (arrScore.length === 1) {
            arrScore.push(arrScore[0]);
            arrScore[0] = (arrScore[0] * 1) + 1;
            arrScore[1] = (arrScore[1] * 1) + 11;
          } else {
            arrScore[0] = (arrScore[0] * 1) + 1;
            arrScore[1] = (arrScore[1] * 1) + 1;
          }
          break;
        case 'J':
        case 'Q':
        case 'K':
          if (arrScore.length === 1) {
            arrScore[0] = (arrScore[0] * 1) + 10;
          } else {
            arrScore[0] = (arrScore[0] * 1) + 10;
            arrScore[1] = (arrScore[1] * 1) + 10;
          }
          break;
        default:
          if (arrScore.length === 1) {
            arrScore[0] = (arrScore[0] * 1) + (arrCards[i]['card'] * 1);
          } else {
            arrScore[0] = (arrScore[0] * 1) + (arrCards[i]['card'] * 1);
            arrScore[1] = (arrScore[1] * 1) + (arrCards[i]['card'] * 1);
          }
      }
    }
    return arrScore
  }
}
/////////////////////////////////////////////////////////////////////////
///////CHECK SCORES - <21, 21, BUST//////////
/////////////////////////////////////////////////////////////////


const playerCheckScore = (arrScore) => {
  if (arrScore.length > 1) {
    if (arrScore[0] === 21 || arrScore[1] === 21) {
      arrScore.pop();
      arrScore[0] = 21;
      playerScore = arrScore[0];
    } else if (arrScore[1] > 21) {
      arrScore.pop();
      playerScore = arrScore[0];
    } else {
      playerScore = arrScore[1];
    }
  } else {
    if (arrScore[0] > 21) {
      playerScore = 'BUST'
    } else {
      playerScore = arrScore[0];
    }
  }
  return playerScore
}

const dealerCheckScore = (arrScore) => {
  if (arrScore.length > 1) {
    if (arrScore[0] === 21 || arrScore[1] === 21) {
      arrScore.pop();
      arrScore[0] = 21;
      dealerScore = arrScore[0];
    } else if (arrScore[1] > 21) {
      arrScore.pop();
      dealerScore = arrScore[0];
    } else {
      dealerScore = arrScore[1];
    }
  } else {
    if (arrScore[0] > 21) {
      dealerScore = 'BUST'
    } else {
      dealerScore = arrScore[0];
    }
  }
  return dealerScore
}


////////////////////////////////
////////HIT/////////////
////////////////////////////////
////////

const playerHit = () => {
  if (gameInProgress) {
    if (playerScore < 21 && playerScore !== 'BUST') {
      dealCard(1, playerCards, playerCardsDisplay);
      setTimeout(() => {
        playerSetScore();
        if (playerScore === 'BUST') {
          playerInfoDisplayInt.children[0].innerHTML = `Player is ${playerScore} : Dealer's turn...`;
          disablePlayerButtons()
          hideButtons()
          if (cardDelayInt.value < minDelay || dealersTurnInt.checked) {
            $(dealersGoInt).show()
          } else {
            setTimeout(() => {
              dealersGo();
            }, cardDelayInt.value);
          };
        } else if (playerScore === 21) {
          playerInfoDisplayInt.children[0].innerHTML = `Player is on ${playerScore} : Dealer's turn...`;
          disablePlayerButtons()
          hideButtons()
          if (cardDelayInt.value < minDelay || dealersTurnInt.checked) {
            $(dealersGoInt).show()
          } else {
            setTimeout(() => {
              dealersGo();
            }, cardDelayInt.value);
          };
        } else {
          playerInfoDisplayInt.children[0].innerHTML = `Player is on ${playerScore} : Hit or Stick?`
          enablePlayerButtons();
        };
      }, (cardDelayInt.value * .5));
    } else {
      alert('No game currently in progress')
    }
  }
};

////////////////////////////////
////////STICK/////////////
////////////////////////////////

const playerStick = () => {
  if (gameInProgress) {
    /////Code to switch to dealer's go
    playerInfoDisplayInt.children[0].innerHTML = `Player sticks on ${playerScore}. Dealer's go.`;
    disablePlayerButtons()
    hideButtons()

    if (cardDelayInt.value < minDelay || dealersTurnInt.checked) {
      $(dealersGoInt).show()
    } else {
      setTimeout(() => {
        dealersGo();
      }, cardDelayInt.value);
    };

  } else {
    alert('No game currently in progress')
  }
}

////////////////////////////////
////////DEALER's GO
////////////////////////////////

const dealersGo = () => {
  if (!dealersTurnActive) {
    //If dealers first go, this turns over the covered second card
    if (useImagesInt.checked) {
      displayCards(dealerCards, dealerCardsDisplay);
      console.log('images')
    } else {
      displayCardsNoImages(dealerCards, dealerCardsDisplay);
    }
    //Calculate dealers score
    dealerSetScore()
    setTimeout(() => {
      dealersTurnActive = true;
      //restart function - recursion
      dealersGo()
    }, cardDelayInt.value);
  } else {
    //If dealer bust, go to compare scores
    if (dealerScore === 'BUST') {
      playerInfoDisplayInt.children[0].innerHTML = `Dealer has gone bust!`
      setTimeout(() => {
        compareScores();
      }, (cardDelayInt.value * 1.5))
      //If dealer score > 16 = Stick and compare scores
    } else if (dealerScore > 16) {
      playerInfoDisplayInt.children[0].innerHTML = `Dealer sticks on ${dealerScore}.`
      setTimeout(() => {
        compareScores();
      }, (cardDelayInt.value * 1.5))
      //If dealer score < 17 = Hit and restart function
    } else {
      playerInfoDisplayInt.children[0].innerHTML = `Dealer is on ${dealerScore}. Dealer Hits.`
      setTimeout(() => {
        dealCard(1, dealerCards, dealerCardsDisplay)
        dealerSetScore()
        setTimeout(() => {
          dealersTurnActive = true;
          dealersGo()
        }, cardDelayInt.value);
      }, cardDelayInt.value);
    }
  }
  dealersTurnActive = false
}

////////////////////////////////
////////Compare Scores and call result
////////////////////////////////

const compareScores = () => {
  if (dealerScore === 'BUST' && playerScore === 'BUST') {
    playerInfoDisplayInt.children[0].innerHTML = `It's a draw! Both players have gone bust.<br /> Would you like to play another hand?`
  } else if (dealerScore === 'BUST') {
    playerInfoDisplayInt.children[0].innerHTML = `Player wins with ${playerScore}! Dealer has gone bust.<br /> Would you like to play another hand?`
    // playerInfoDisplayInt.children[0].innerHTML = `Player Won`
    gameCountPlayer++
    gameCountPInt.innerHTML = `${gameCountPlayer}`
  } else if (playerScore === 'BUST') {
    playerInfoDisplayInt.children[0].innerHTML = `Dealer wins with ${dealerScore}! Player has gone bust.<br /> Would you like to play another hand?`
    // playerInfoDisplayInt.children[0].innerHTML = `Dealer Won!`
    gameCountDealer++
    gameCountDInt.innerHTML = `${gameCountDealer}`
  } else if (playerScore > dealerScore) {
    playerInfoDisplayInt.children[0].innerHTML = `Player wins with ${playerScore}!<br /> Would you like to play another hand?`
    // playerInfoDisplayInt.children[0].innerHTML = `Player Won`
    gameCountPlayer++
    gameCountPInt.innerHTML = `${gameCountPlayer}`
  } else if (playerScore < dealerScore) {
    playerInfoDisplayInt.children[0].innerHTML = `Dealer wins with ${dealerScore}!<br /> Would you like to play another hand?`
    // playerInfoDisplayInt.children[0].innerHTML = `Dealer Won!`
    gameCountDealer++
    gameCountDInt.innerHTML = `${gameCountDealer}`
  } else if (playerScore === dealerScore) {
    playerInfoDisplayInt.children[0].innerHTML = `It's a draw! Both players have ${dealerScore}.<br /> Would you like to play another hand?`
  }
  endOfHand()
};

////////////////////////////////
////////END OF HAND - reset
////////////////////////////////

const endOfHand = () => {
  gameInProgress = false;
  // debuggingInfoInt.children[0].innerHTML = `Starting deck = ${startingDeck}; Current deck = ${shuffledDeck.length}`
  // playerInfoDisplayInt.children[0].innerHTML = `Good game! <br /> Would you like to play another hand?`
  //Reset deck of cards when no. drops below 25% of starting deck.
  if (shuffledDeck.length < (startingDeck * .25)) {
    createDeck(cardDecksInt.value)
    shuffleDeck()
  }
  enableDealButton()
  dealNewHandButtons()
}

////////////////////////////////
////////RESET GAME - For Testing
////////////////////////////////


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
////////Reset Deck - For Testing
////////////////////////////////

const resetDeck = () => {
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
};
