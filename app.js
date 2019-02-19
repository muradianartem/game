/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

let dice, activePlayer, score, diceDOM0, diceDOM1, roundScore, newGame, prevDice, winScore;


initGame()

document.querySelector('.btn-roll').addEventListener('click', function () {
    if (newGame) {
        //    1. show new dice
        dice[0] = Math.ceil(Math.random() * 6);
        dice[1] = Math.ceil(Math.random() * 6);
        diceDOM0.style.display = 'block';
        diceDOM1.style.display = 'block';
        diceDOM0.src = 'dice-' + dice[0] + '.png';
        diceDOM1.src = 'dice-' + dice[1] + '.png';
        winScore = document.querySelector('.final-score').value;
        winScore === false ? winScore = 100 : winScore;
//    2. lost if 1 score
        if (dice[0] === 1 || dice[1] === 1) {
                nextPlayer();
        } else {
            roundScore += dice[0] + dice[1];
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }
        }
});

document.querySelector('.btn-hold').addEventListener('click',function () {
    if (newGame) {
        // 1. Adding score
        score[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = score[activePlayer];
        // 2. find winner
        if (score[activePlayer] >= winScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            newGame = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    roundScore = 0;
    dice = [0, 0];
    document.getElementById('current-' + activePlayer).textContent = roundScore;
    document.getElementById('current-' + activePlayer).textContent = '0';
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.getElementById('current-' + activePlayer).textContent = '0';
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
}

document.querySelector('.btn-new').addEventListener('click', initGame);

function initGame() {
    score = [0, 0];
    dice = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    newGame = true;
    prevDice =
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    diceDOM0 = document.querySelector('.dice-0');
    diceDOM1 = document.querySelector('.dice-1');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    diceDOM0.style.display = 'none';
    diceDOM1.style.display = 'none';
}
