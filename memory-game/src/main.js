import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  const gameBtn = document.getElementById('gameBtn');
  if (gameBtn) {
    gameBtn.addEventListener('click', startGame);
  }

  const statsBtn = document.getElementById('statsBtn');
  if (statsBtn) {
    statsBtn.addEventListener('click', showStats);
  }

  const uploadBtn = document.getElementById('uploadBtn');
  if (uploadBtn) {
    uploadBtn.addEventListener('click', uploadImages);
  }
  let userUploads = localStorage.getItem('Images');
  let stats = localStorage.getItem('Path');
});


document.addEventListener("DOMContentLoaded", (event) => {
  let userUploads = localStorage.getItem('Images')
  let stats = localStorage.getItem('Path')
});

function startGame() {
  window.location.href = '\\memory.html';
}

function showStats() {
  return
}

function uploadImages() {
  return
}