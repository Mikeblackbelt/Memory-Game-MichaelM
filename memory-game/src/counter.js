// counter.js
import './style.css';

document.addEventListener('DOMContentLoaded', async () => {
  const game = document.getElementById('game');
  const opts = document.getElementById('opts');
  let running = true;
  if (!game || !opts) return;

  const colors = ['red', 'blue', 'green'];
  let sequence = [];
  let userSequence = [];
  let score = 0;

  // Generate a new random sequence
  function resetSeq() {
    sequence = [];
    for (let i = 0; i < score + 2; i++) {
      const randColor = colors[Math.floor(Math.random() * colors.length)];
      sequence.push(randColor);
    }
    userSequence = [];
  }

  // Flash the sequence visually
  async function shiftGame(seq, time = 800) {
    if (!running) {return}
    for (const color of seq) {
      game.style.background = color;
      await new Promise(resolve => setTimeout(resolve, time));
      game.style.background = 'grey';
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }

  // Check user input
  function checkCorrect(color) {
    userSequence.push(color);
    const idx = userSequence.length - 1;

    // Flash clicked color
    game.style.background = color;
    setTimeout(() => (game.style.background = 'grey'), 300);

    // Wrong input
    if (userSequence[idx] !== sequence[idx]) {
      resetGame();
      return;
    }

    // Round complete
    if (userSequence.length === sequence.length) {
      score++;
      nextRound();
    }
  }

  // Create color buttons
  function createOpts() {
    opts.innerHTML = '';
    for (const color of colors) {
      const btn = document.createElement('button');
      btn.textContent = color.toUpperCase();
      btn.style.background = color;
      btn.style.color = 'white';
      btn.style.padding = '8px 16px';
      btn.style.margin = '4px';
      btn.style.border = 'none';
      btn.style.borderRadius = '6px';
      btn.style.cursor = 'pointer';
      btn.addEventListener('click', () => checkCorrect(color));
      opts.appendChild(btn);
    }
  }

  // Start a new round
  async function nextRound() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    resetSeq();
    await shiftGame(sequence);
  }

  // Save scores and reset game
  function resetGame() {
    running = false;
    let scores = localStorage.getItem('scores');

    if (scores && scores !== 'null') {
      scores = JSON.parse(scores);
    } else {
      scores = [];
    }

    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));

    score = 0;
    nextRound();

    setTimeout(() => {
      window.location.href = '/index.html';
    }, 6767);
  }

  // Initialize game
  createOpts();
  await nextRound();
});
