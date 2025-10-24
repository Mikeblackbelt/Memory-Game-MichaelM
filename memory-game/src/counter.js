document.addEventListener('DOMContentLoaded', async () => {
  const game = document.getElementById('game');
  const opts = document.getElementById('opts');

  game.style.width = '40%';
  game.style.height = '40%';

  async function shiftGame(correct, time = 1000) {
    // if opts is not an array i will explode
    for (const color of correct) {
      await new Promise(resolve => {
        setTimeout(() => {
          game.style.background = color;
          resolve();
        }, time);
      });
    }
  }

  await shiftGame(['red', 'blue', 'green']);
});
