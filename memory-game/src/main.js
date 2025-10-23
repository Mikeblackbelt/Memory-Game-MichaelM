import './style.css';

const playButton = document.getElementById('gameBtn');
const uploadButton = document.getElementById('uploadBtn');
const statsButton = document.getElementById('statsBtn');

playButton.addEventListener('click', (event) => {
  window.location.href = 'upload.html';
})



document.addEventListener("DOMContentLoaded", (event) => {
  let userUploads = localStorage.getItem('Images')
  let stats = localStorage.getItem('Path')
});

