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
let timeBetweenGoes = 1500;
let startingDeck = 0;

/////////////////////////////
/////Initial Set Up////////////
/////////////////////////////

disablePlayerButtons()
hideButtons()
$(startGameInt).show()

const startNewGame = (numDecks) => {
  //Create deck of cards - number of decks optional although currently 1 by default
  createDeck(numDecks);
  //Testing - Log number of cards
  //startingCardsInt.innerHTML = deckCards.length;
  //Shuffle cards
  shuffleDeck();  
  //Testing - Log shuffled true/false
  //cardsShuffledInt.innerHTML = "Yes";
  //Testing - Log number of shuffled cards
  //numberOfCardsLeftInt.innerHTML = shuffledDeck.length;
  //Deal player 2 cards
  dealCard(2, playerCards, playerCardsDisplay);
  playerSetScore();
  //Deal dealer cards
  //Card 1 face up
  dealCard(1, dealerCards, dealerCardsDisplay);
  dealerSetScore();
  //Card 2 face down
  dealCardFaceDown(1, dealerCards, dealerCardsDisplay);
  enablePlayerButtons()
  inPlayButtons()
  gameInProgress = true;
  if(playerScore === 21) {
    playerInfoDisplayInt.children[0].innerHTML = `Player is on ${playerScore} : Dealer's turn...`;
    disablePlayerButtons()
    hideButtons()
    setTimeout(() => {
      dealersGo();  
    }, timeBetweenGoes);    
  } else {
  playerInfoDisplayInt.children[0].innerHTML = `Player is on ${playerScore} : Hit or Stick?`

  }
}

////////////////////////////////
////////Deal New Hand/////////////
////////////////////////////////


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
      setTimeout(() => {
        dealersGo();
      }, timeBetweenGoes);
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

const dealCard = (num, arrCards, arrDisplay) => {
  for (let i=0; i < num; i++) {
    let card = shuffledDeck.shift();
  arrCards.push(card);
  // countCards();
};
  displayCards(arrCards, arrDisplay);
}

const dealCardFaceDown = (num, arrCards, arrDisplay) => {
  for (let i=0; i < num; i++) {
    let card = shuffledDeck.shift();
  arrCards.push(card);
  // countCards();
};
}


//////////////////////////////
////////Count score//////////
//////////////////////////////

const scoreCounter = (arrCards, arrScore, noCards, score) => {
  if (score !== 'BUST' ) {
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
}return arrScore
}
}
/////////////////////////////////////////////////////////////////////////
///////CHECK SCORES - HOW DO I REPLACE THE BELOW WITH A UNIFORM FUNCTION?//////////
/////////////////////////////////////////////////////////////////

const checkScore = (score, arrScore) => {
  if(arrScore.length > 1 ) {
    if(arrScore[0] === 21 || arrScore[1] === 21) {
      arrScore.pop();
      arrScore[0] = 21;
      score = arrScore[0];
    } else if (arrScore[1] > 21) {
      arrScore.pop();
      score = arrScore[0];
    } else {
      score = arrScore[1];
    }
  } else {
    if(arrScore[0] > 21) {
      score = 'BUST'
    } else {
      score = arrScore[0];
    }
  }
  return score
}



const playerCheckScore = (arrScore) => {
  if(arrScore.length > 1 ) {
    if(arrScore[0] === 21 || arrScore[1] === 21) {
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
    if(arrScore[0] > 21) {
      playerScore = 'BUST'
    } else {
      playerScore = arrScore[0];
    }
  }
  return playerScore
} 

const dealerCheckScore = (arrScore) => {
  if(arrScore.length > 1 ) {
    if(arrScore[0] === 21 || arrScore[1] === 21) {
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
    if(arrScore[0] > 21) {
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
    // setTimeout(() => {
      playerSetScore();
    // }, timeBetweenGoes);
    if (playerScore === 'BUST') {
      playerInfoDisplayInt.children[0].innerHTML = `Player is ${playerScore} : Dealer's turn...`;
      disablePlayerButtons()
      hideButtons()
      setTimeout(() => {
        dealersGo();
      }, timeBetweenGoes);
    } else if (playerScore === 21) {
      playerInfoDisplayInt.children[0].innerHTML = `Player is on ${playerScore} : Dealer's turn...`;
      disablePlayerButtons()
      hideButtons()
      setTimeout(() => {
        dealersGo();
      }, timeBetweenGoes);
    } else {
      playerInfoDisplayInt.children[0].innerHTML = `Player is on ${playerScore} : Hit or Stick?`
    };
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
    playerInfoDisplayInt.children[0].innerHTML = `Player sticks on ${playerScore}. Dealer's go'.`;
    disablePlayerButtons()
    hideButtons()
    setTimeout(() => {
      dealersGo();
    }, timeBetweenGoes);

  } else {
    alert('No game currently in progress')
  }
}

////////////////////////////////
////////DEALER's GO
////////////////////////////////

const dealersGo = () => {
  // console.log('Before = ' + dealersTurnActive)
  if(!dealersTurnActive) {
    // console.log('Starting = turn over first card')
    //playerInfoDisplayInt.children[0].innerHTML = `Dealer's turn!`
    displayCards(dealerCards, dealerCardsDisplay)
    dealerSetScore()    
    // setTimeout(() => {
    // //Why do I never see this displayed?  Is it queued and instantly overwritten by the next message?  Either way, the code gives the desired result.  Need to understand asynchronous/synchronous better.
    // playerInfoDisplayInt.children[0].innerHTML = `Dealer is on ${dealerScore}!`
    // // console.log('During = turn over first card')
    // }, timeBetweenGoes);
    
    setTimeout(() => {
      dealersTurnActive = true;
      dealersGo()
    }, timeBetweenGoes);
  }else {
  if(dealerScore === 'BUST') {
    // console.log('Starting = dealerscore bust')
    playerInfoDisplayInt.children[0].innerHTML = `Dealer has gone bust!`
    setTimeout(()=> {
    compareScores();
    // console.log('During = dealerscore bust')
  }, timeBetweenGoes)
  } else if (dealerScore > 16 ) {
    // console.log('Starting = dealer score > 16')
    playerInfoDisplayInt.children[0].innerHTML = `Dealer sticks on ${dealerScore}.`
    setTimeout(()=> {
    compareScores();
    // console.log('During = dealer score > 16')
  }, timeBetweenGoes)
  } else {
    // console.log('Sktarting = Dealers turn else')
    // console.log('DTE Before= ' + dealersTurnActive)
    playerInfoDisplayInt.children[0].innerHTML = `Dealer is on ${dealerScore}. Dealer Hits.`
   
   setTimeout(() => {
    dealCard(1, dealerCards, dealerCardsDisplay)
    dealerSetScore()
    setTimeout(()=> {

      // console.log('During = Dealers turn else')
      // console.log('DTE During = ' + dealersTurnActive)
      dealersTurnActive = true;
      dealersGo()
    }, timeBetweenGoes);
   }, timeBetweenGoes);
  }
  }
  dealersTurnActive = false
}

  ////////////////////////////////
////////Compare Scores
////////////////////////////////

const compareScores = () => {
    if (dealerScore === 'BUST' && playerScore === 'BUST') {
      playerInfoDisplayInt.children[0].innerHTML = `It's a draw! Both players have gone bust.`
    } else if (dealerScore === 'BUST') {
      playerInfoDisplayInt.children[0].innerHTML = `Player wins with ${playerScore}! Dealer has gone bust.`
      // playerInfoDisplayInt.children[0].innerHTML = `Player Won`
      gameCountPlayer ++
      gameCountPInt.innerHTML = `${gameCountPlayer}`
    } else if (playerScore === 'BUST') { 
      playerInfoDisplayInt.children[0].innerHTML = `Dealer wins with ${dealerScore}! Player has gone bust`
      // playerInfoDisplayInt.children[0].innerHTML = `Dealer Won!`
      gameCountDealer ++
      gameCountDInt.innerHTML = `${gameCountDealer}`
    } else if (playerScore > dealerScore) { 
      playerInfoDisplayInt.children[0].innerHTML = `Player wins with ${playerScore}!`
      // playerInfoDisplayInt.children[0].innerHTML = `Player Won`
      gameCountPlayer ++
      gameCountPInt.innerHTML = `${gameCountPlayer}`
    } else if (playerScore < dealerScore) { 
      playerInfoDisplayInt.children[0].innerHTML = `Dealer wins with ${dealerScore}!`
      // playerInfoDisplayInt.children[0].innerHTML = `Dealer Won!`
      gameCountDealer ++
      gameCountDInt.innerHTML = `${gameCountDealer}`
    } else if (playerScore === dealerScore) { 
      playerInfoDisplayInt.children[0].innerHTML = `It's a draw! Both players have ${dealerScore}.`
  }
  setTimeout(() => {
    endOfHand()
  }, timeBetweenGoes*1.5);
};

////////////////////////////////
////////END OF HAND
////////////////////////////////

const endOfHand = () => {
  gameInProgress = false;
  debuggingInfoInt.children[0].innerHTML = `Starting deck = ${startingDeck}; Current deck = ${shuffledDeck.length}`
  playerInfoDisplayInt.children[0].innerHTML = `Good game! <br /> Would you like to play another hand?`
  //Reset deck of cards when no. drops below 25% of starting deck.
  if(shuffledDeck.length < (startingDeck * .25)) {
    createDeck(cardDecksInt.value)
    shuffleDeck()
  } 
  enableDealButton()
  dealNewHandButtons()
}

////////////////////////////////
////////RESET GAME
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
////////Reset Deck /////////////
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




// const countCards = () => {
//   numberOfCardsLeftInt.innerHTML = shuffledDeck.length
// }


// dealerCard1.innerHTML = `${shuffledDeck[51].card} ${shuffledDeck[51].suit}`;

// console.log(shuffledDeck[1])