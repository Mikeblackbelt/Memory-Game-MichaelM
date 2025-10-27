// counter.js
import './style.css';

document.addEventListener('DOMContentLoaded', async () => {
  const game = document.getElementById('game');
  const opts = document.getElementById('opts');
  var curri = 0;
  var score = 0;
  var sequence = []; 
  const colors = ['red', 'blue', 'green'];

  function resetSeq() {
    for (let i = 0; i < score + 2; i++) {
      sequence.push(opts)
    }
  }

  if (!game || !opts) return;

  // Flash the sequence of colors
  async function shiftGame(correct, time = 1000) {
    // Add grey at the end
    const sequence = [...correct, 'grey'];

    for (const color of sequence) {
      await new Promise(resolve => {
        setTimeout(() => {
          game.style.background = color;
          resolve();
        }, time);
      });
    }

    game.style.background = 'grey';
  }

  // Create buttons for each color option
  function createOpts(correct) {
    opts.innerHTML = ''; // clear previous buttons

    for (const color of correct) {
      const btn = document.createElement('button');
      btn.textContent = color.toUpperCase();
      btn.style.background = color;
      btn.style.color = 'white';
      btn.style.padding = '8px 16px';
      btn.style.margin = '4px';
      btn.style.border = 'none';
      btn.style.borderRadius = '6px';
      btn.style.cursor = 'pointer';
      btn.addEventListener(checkCorrect(color, seq))

      btn.addEventListener('click', () => {
        // flash the color briefly on click
        game.style.background = color;
        setTimeout(() => {
          game.style.background = 'grey';
        }, 300);
      });

      opts.appendChild(btn);
    }
  }

  function checkCorrect(color, seq) {
    if (seq[curri] == color[curri]) {
      if (curri == length(seq) - 1) {
        resetSeq();
      }
      else {
        curri += 1;
      }
    }
    else {
      resetGame();
    }
  }

  createOpts(colors);
  await shiftGame(colors);
});
