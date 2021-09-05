'use strict';
// SElecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores,currentScore,activePlayer,playing;
//starting cond.


const init = function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;
   
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    
     scores = [0, 0];
     currentScore = 0;
     activePlayer = 0;
     playing = true;

};
init();
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`)
        .textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}
//Rolling dice functionallity
btnRoll.addEventListener('click', function () {
    if (playing) {

        //1.generating random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        //2.display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;
        //3.check for rolled 1 :if true,switch to next player
        if (dice !== 1) {
            //add dice to current score
            currentScore = currentScore + dice;
            document.getElementById(`current--${activePlayer}`)
                .textContent = currentScore;
        } else {
            //switch to next player

            switchPlayer();
        }
    }
});
btnHold.addEventListener('click', function () {
    if (playing) {


        //add current score to active player
        scores[activePlayer] += currentScore;
        //scores[1]=score[1]+currentScore
        document.getElementById(`score--${activePlayer}`).textContent =
            scores[activePlayer];
        //check if score is >=100
        if (scores[activePlayer] >= 30) {
            //finish the game..
            playing = false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).
                classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).
                classList.add('player--active');
        } else {
            //switch to next palyer
            switchPlayer();
        }
    }

});
btnNew.addEventListener('click', function () {
    init();
    diceEl.classList.remove('hidden');


});