import Deck from "./deck.js";

const CARD_VALUE_MAP = {
  /*2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,*/
  "♣": 15,
  "♦": 16,
  "♥": 17,
  "♠": 18
};

const computerCardSlot = document.querySelector(".computer-card-slot");
const playerCardSlot = document.querySelector(".player-card-slot");
const computerDeckElement = document.querySelector(".computer-deck");
const playerDeckElement = document.querySelector(".player-deck");
const text = document.querySelector(".text");

let playerDeck, computerDeck, inRound, stop, playerArr = [];

document.addEventListener("click", () => {
  if (stop) {
    startGame();
    return;
  }

  if (inRound) {
    cleanBeforeRound();
  } else {
    flipCards();
  }
});

startGame();
function startGame() {
  const deck = new Deck();
  deck.shuffle();

  const deckMidpoint = Math.ceil(deck.numberOfCards / 2);
  playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
  computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards));
  inRound = false;
  stop = false;

  cleanBeforeRound();
}

function cleanBeforeRound() {
  inRound = false;
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";
  text.innerHTML = "";

  updateDeckCount();
}

function flipCards() {
  inRound = true;

  const playerCard = playerDeck.pop();
  const playerCard2 = playerDeck.pop();
  const playerCard3 = playerDeck.pop();
  const playerCard4 = playerDeck.pop();
  const playerCard5 = playerDeck.pop();

  const computerCard = computerDeck.pop();
  const computerCard2 = computerDeck.pop();
  const computerCard3 = computerDeck.pop();
  const computerCard4 = computerDeck.pop();
  const computerCard5 = computerDeck.pop();

  playerCardSlot.appendChild(playerCard.getHTML());
  playerCardSlot.appendChild(playerCard2.getHTML());
  playerCardSlot.appendChild(playerCard3.getHTML());
  playerCardSlot.appendChild(playerCard4.getHTML());
  playerCardSlot.appendChild(playerCard5.getHTML());

  computerCardSlot.appendChild(computerCard.getHTML());
  computerCardSlot.appendChild(computerCard2.getHTML());
  computerCardSlot.appendChild(computerCard3.getHTML());
  computerCardSlot.appendChild(computerCard4.getHTML());
  computerCardSlot.appendChild(computerCard5.getHTML());

  updateDeckCount();

  playerArr.push(playerCard, playerCard2, playerCard3, playerCard4, playerCard5);
  console.log(playerArr)

  console.log(playerCard)
  console.log(playerCard2)
  console.log(playerCard3)
  console.log(playerCard4)
  console.log(playerCard5)


  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "Win";
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "Lose";
  } else {
    text.innerText = "Draw";
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You lose..";
    stop = true;
  } else if (isGameOver(playerDeck)) {
    text.innerText = "You win!";
    stop = true;
  }
}

function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;
}

function isRoundWinner(cardOne, cardTwo) {
  //return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value];
  return CARD_VALUE_MAP[cardOne.suit] > CARD_VALUE_MAP[cardTwo.suit];
}

function isGameOver(deck) {
  return deck.numberOfCards === 0;
}

//console.log(deck.cards);

//computerCardSlot.appendChild(deck.cards[0].getHTML());
