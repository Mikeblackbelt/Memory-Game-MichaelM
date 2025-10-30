import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const gameBtn = document.getElementById('gameBtn');
  if (gameBtn) {
    gameBtn.addEventListener('click', startGame);
  }

  const statsBtn = document.getElementById('statsBtn');
  if (statsBtn) {
    statsBtn.addEventListener('click', function () {window.location.href = '\\stats.html'});
  }

  const uploadBtn = document.getElementById('uploadBtn');
  if (uploadBtn) {
    uploadBtn.addEventListener('click', uploadImages);
  }
  let userUploads = localStorage.getItem('Images');
  let stats = localStorage.getItem('Path');
});

const back = document.getElementById('back');
back.addEventListener("click", function() {
  window.location.href = '\\index.html';
})


document.addEventListener("DOMContentLoaded", (event) => {
  let userUploads = localStorage.getItem('Images')
  let stats = localStorage.getItem('Path')
  showStats();
});

function startGame() {
  window.location.href = '\\memory.html';
}

function showStats() {
  let scores = JSON.parse(localStorage.getItem('scores'));
  if (scores.length === 0) {
    return
  }
  let max_score = 0;
  let average_score = 0;
  scores.forEach(element => {
    average_score += element/scores.length;
    max_score = Math.max(max_score, element)
  });
  const ms = document.getElementById('max');
  const as = document.getElementById('average');
  as.textContent = average_score.toPrecision(2);
  ms.textContent = max_score;
  
}


function uploadImages() {
  return
}

