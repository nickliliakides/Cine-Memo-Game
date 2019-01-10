const cards = document.querySelectorAll('.memory-card');

document.getElementById('new-game-btn').addEventListener('click', restartGame);

cards.forEach(card => card.addEventListener('click', flipCard));

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function restartGame() {
  location.reload();
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;

  check4Match();
}

function check4Match() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? detachCards() : unflipCards();
}

function detachCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(function() {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1250);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 42);
    card.style.order = randomPos;
  });
})();
