// counter.js
import './style.css';

const scrtxt = document.getElementById('current-score');
const toptxt = document.getElementById('top-score');

const scores = JSON.parse(localStorage['scores']);
scores.forEach(element => {
  if (element > toptxt.textContent) {toptxt.textContent = element}
});

function showPopup(message, options = {}) {
  // Default settings
  const {
    background = 'rgba(116, 15, 15, 0.8)',
    textColor = '#fff',
    buttonColor = '#6264dbff', // indigo-500
    zIndex = 9999,
    autoClose = false,
    duration = 3000
  } = options;

  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    background: ${background};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: ${zIndex};
  `;

  const popup = document.createElement('div');
  popup.style.cssText = `
    background: linear-gradient(to bottom right, #1f2937, #111827);
    color: ${textColor};
    padding: 1.5rem 2rem;
    border-radius: 0.75rem;
    box-shadow: 0 0 30px rgba(0,0,0,0.4);
    text-align: center;
    max-width: 320px;
    font-family: sans-serif;
  `;
  popup.innerHTML = `
    <p style="margin-bottom: 1rem; font-size: 1rem; line-height: 1.4;">${message}</p>
    <button style="
      background: ${buttonColor};
      color: white;
      padding: 0.5rem 1.25rem;
      border: none;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s;
    ">OK</button>
  `;

  overlay.appendChild(popup);
  document.body.appendChild(overlay);

  const close = () => overlay.remove();
  popup.querySelector('button').addEventListener('click', function() {window.location.href = '\\index.html'});

  if (autoClose) {
    setTimeout(close, duration);
  }
}

document.addEventListener('DOMContentLoaded', async () => {
  const game = document.getElementById('game');
  const opts = document.getElementById('opts');
  let running = true;
  if (!game || !opts) return;

  const colors = ['red', 'blue', 'green'];
  let sequence = [];
  let userSequence = [];
  let score = 0;

  function resetSeq() {
    sequence = [];
    for (let i = 0; i < score + 2; i++) {
      const randColor = colors[Math.floor(Math.random() * colors.length)];
      sequence.push(randColor);
    }
    userSequence = [];
  }

  async function shiftGame(seq, time = 800) {
    if (!running) {return}
    for (const color of seq) {
      game.style.background = color;
      await new Promise(resolve => setTimeout(resolve, time));
      game.style.background = 'grey';
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }

  function checkCorrect(color) {
    userSequence.push(color);
    const idx = userSequence.length - 1;

    game.style.background = color;
    setTimeout(() => (game.style.background = 'grey'), 300);

    if (userSequence[idx] !== sequence[idx]) {
      resetGame();
      return;
    }

    if (userSequence.length === sequence.length) {
      score++;
      scrtxt.textContent = score;
      nextRound();
    }
  }

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

  async function nextRound() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    resetSeq();
    await shiftGame(sequence);
  }

  function resetGame() {
    running = false;
    let scores = localStorage.getItem('scores');
    showPopup(`You lose! Score: ${score}`)

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

  createOpts();
  await nextRound();
});
