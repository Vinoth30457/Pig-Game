"use strict";

const player0EL = document.querySelector(".player-0");
const player1EL = document.querySelector(".player-1");
const score0El = document.getElementById("score-0");
const score1El = document.getElementById("score-1");
const current0EL = document.getElementById("current-0");
const current1El = document.getElementById("current-1");
const setValue = document.getElementById("num");
const setValueBtn = document.querySelector(".set-value");
const diceEl = document.querySelector(".dice");
const newBtn = document.getElementById("btn--new");
const rollBtn = document.getElementById("btn--roll");
const holdBtn = document.getElementById("btn--hold");
const winningTxt = document.querySelector(".winning-txt");

//Global variable
let score, currentScore, activePlayer, isPlaying, dice, winningScore;

const init = () => {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  isPlaying = true;
  dice = 0;
  score0El.innerText = 0;
  score1El.innerText = 0;
  current0EL.innerText = 0;
  current1El.innerText = 0;
  diceEl.classList.add("close");
  diceEl.classList.remove("close");
  rollBtn.classList.remove("close");
  holdBtn.classList.remove("close");
  player0EL.classList.remove("winner");
  player1EL.classList.remove("winner");
  player0EL.classList.add("active-player");
  player1EL.classList.remove("active-player");
  winningTxt.classList.add("close");
  winningTxt.classList.remove("open");
  setValue.value = ``;
};
setValueBtn.addEventListener("click", () => {
  winningScore = Number(setValue.value);
});
const switchPlayer = () => {
  currentScore = 0;
  document.getElementById(`current-${activePlayer}`).innerText = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle("active-player");
  player1EL.classList.toggle("active-player");
};

//event listener

rollBtn.addEventListener("click", () => {
  dice = Math.trunc(Math.random() * 6 + 1);

  diceEl.classList.remove("close");
  diceEl.src = `./images/dice-${dice}.png`;
  //check dice ===1
  if (dice !== 1) {
    currentScore += dice;
    //display curren score
    document.getElementById(`current-${activePlayer}`).innerText = currentScore;
  } else {
    switchPlayer();
  }
});
holdBtn.addEventListener("click", () => {
  //add current score to total score
  score[activePlayer] += currentScore;
  document.getElementById(`score-${activePlayer}`).innerHTML =
    score[activePlayer];
  //update current score
  // currentScore = 0;
  // document.getElementById(`current-${activePlayer}`).innerText = currentScore;
  // check score
  if (score[activePlayer] >= winningScore) {
    document
      .querySelector(`.player-${activePlayer}`)
      .classList.remove("active-player");
    document.querySelector(`.player-${activePlayer}`).classList.add("winner");

    diceEl.classList.add("close");
    rollBtn.classList.add("close");
    holdBtn.classList.add("close");
    if (score[0] >= winningScore) {
      winningTxt.classList.remove("close");
      winningTxt.classList.add("open");
      let txt = `<p class="text">PLAYER <br> 1 <br> WON </p>`;
      winningTxt.innerHTML = txt;
    } else if (score[1] >= winningScore) {
      winningTxt.classList.remove("close");
      winningTxt.classList.add("open");
      let txt = `<p class="text">PLAYER<br> 2 <br> WON </p>`;
      winningTxt.innerHTML = txt;
    }
  } else if (score[activePlayer] !== 10) {
    switchPlayer();
  }
});
newBtn.addEventListener("click", init);
init();
