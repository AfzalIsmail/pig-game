'use strict';

// Selecting elements
const player0Elmnt = document.querySelector('.player--0');
const player1Elmnt = document.querySelector('.player--1');
const score0Elmnt = document.querySelector('#score--0'); /** Total score for player 1 */
const score1Elmnt = document.getElementById('score--1'); // supposed to be faster than querySelector for getting Ids. No need for '#' /** Total score for player 2 */
const current0Elmnt = document.getElementById('current--0'); /** Current score fpr player 1 */
const current1Elmnt = document.getElementById('current--1'); /** Current score fpr player 2 */

const diceElmnt = document.querySelector('.dice'); /** Dice image */
const rolllBtn = document.querySelector('.btn--roll'); /** Roll button */
const holdBtn = document.querySelector('.btn--hold'); /** Hold button */
const newBtn = document.querySelector('.btn--new'); /** New button */

let scores ,currentScore, activePlayer, playing;

// Starting conditions
const init = function(){

    score0Elmnt.textContent = 0;
    score1Elmnt.textContent = 0; // javascript will automaticallly convert 0 to string to display
    current0Elmnt.textContent = 0;
    current0Elmnt.textContent = 0;

    // document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    // player0Elmnt.classList.add('player--active');
    // document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');

    diceElmnt.classList.add('hidden');
    player0Elmnt.classList.remove('player--winner');
    player1Elmnt.classList.remove('player--winner');
    player0Elmnt.classList.add('player--active');
    player1Elmnt.classList.remove('player--active');

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true; // check if game is over or not

}

/** Initialise game */
init();

const switchPlayer = function(){
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0; // using ternary operator tp switch between palyer 0 and 1
    player0Elmnt.classList.toggle('player--active'); // Toggle will add the class if it not present: remove the class if it is present
    player1Elmnt.classList.toggle('player--active');
}

// Rolling dice functionality
rolllBtn.addEventListener('click', function () {
    
    if(playing){

        // 1. Generate random dice number
        const diceRoll = Math.trunc(Math.random() * 6) + 1;
        // console.log(diceRoll);

        // 2. Display dice value
        diceElmnt.classList.remove('hidden');
        diceElmnt.src = `dice-${diceRoll}.png`; 

        // 3. Checked if rolled 1
        if(diceRoll !== 1){

            // Add dice value to current score
            currentScore += diceRoll;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;

        }else{
            
            // Switch to next player
            switchPlayer();

        }
    }

});

holdBtn.addEventListener('click', function(){

    if(playing){

        // 1. Add current score to active player's score
        scores[activePlayer] += currentScore;  // Increase the active player's score
        document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

        // 2. Check if score is >= 100
        if(scores[activePlayer] >= 20){ //
            playing = false;
            diceElmnt.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            
        }else{
            // Switch to next player
            switchPlayer();
        }

    }
    
});

newBtn.addEventListener('click', init);