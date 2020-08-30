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
/////////////////////////////////////
///////HOW DO I REPLACE THE BELOW WITH A UNIFORM FUNCTION?//////////
/////////////////////////////////////

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



