var scores, roundScore, activePlayer, gamePlaying;

newGame();

document.querySelector('.btn-roll').addEventListener('click', function (){
    //if there is no winner, run function. else > deactivate btn-roll
    if (gamePlaying){
      // choose a random number                                               
    var dice = Math.floor(Math.random() * 6) + 1;

    // display the dice image
    var diceDOM = document.querySelector('.dice');
    //grabs the image based on the dice variable chosen above
    diceDOM.src = 'img/dice-' + dice + '.png';

    //
    if (dice !== 1){
        // add score to the current score
        roundScore += dice;
        // add round score to the current player
        document.querySelector("#current-" + activePlayer).textContent = roundScore;
    } else{
         // run nextPlayer function
        nextPlayer();  
        }
    }
}); //end btn-roll

document.querySelector('.btn-hold').addEventListener('click', function(){
    // run if the game is still playing
    if (gamePlaying){
    //add current score to global score
    scores[activePlayer] += roundScore;
    
    //update UI to relect scores
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
   
    // check if the player won the game
    if (scores[activePlayer] >= 50 ){
        //hide the dice
        document.querySelector('.dice').style.display = 'none';
        //change the player name to "winner"
        document.querySelector('#name-' + activePlayer).textContent = "Winner!!";
        //add winner class to the winner
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        //remove the active class
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        // display new game button
        document.querySelector('.btn-new').style.display = 'block';

        gamePlaying = false;
    } else{
         // run nextPlayer function
        nextPlayer();
        }
    }
}); //end btn-hold

document.querySelector('.btn-new').addEventListener('click', newGame);

function nextPlayer(){
    // switch player
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        //set round score back to 0
        roundScore = 0;
        // if player rolls a 1, set their score to 0
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        
        //change player class based on which users turn it is  
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');  
}

function newGame (){
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    //set all values and classes to 0
    document.getElementById('score-0').textContent = "0";
    document.getElementById('score-1').textContent = "0";
    document.getElementById('current-0').textContent = "0";
    document.getElementById('current-1').textContent = "0";
    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.btn-new').style.display = 'none';
    document.querySelector('.dice').style.display = 'block';

    // diplay dice roll tooltip and distroy it after
  $('#rollTooltip').tooltip('show');
    setTimeout(function(){$('#rollTooltip').tooltip('hide');},3000);
    setTimeout(function(){$('#rollTooltip').tooltip('destroy');},3001);
    $('#holdTooltip').tooltip('show');
    setTimeout(function(){$('#holdTooltip').tooltip('hide');},3000);
    setTimeout(function(){$('#holdTooltip').tooltip('destroy');},3001);
    $('.dice').addClass('animated wobble');
};

// dice animation timmer
// function checktime() {
//     var time;
//     window.onload = resetTimer;
//     // DOM Events
//     document.onmousemove = resetTimer;
//     document.onkeypress = resetTimer;
//     document.onclick = resetTimer;

//     function animateDice() {
//         $('.dice').addClass('animated wobble')
//         }

//     function resetTimer() {
//         clearTimeout(time);
//         time = setTimeout(animateDice, 3000)
//         // 1000 milisec = 1 sec
//     }
//     resetTimer();
// };

// checktime();



