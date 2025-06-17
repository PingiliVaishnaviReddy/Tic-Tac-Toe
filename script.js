const boardElement = document.getElementById('board');
const statusElement = document.getElementById('status');

let board = Array(9).fill(null);
let human = 'X';
let ai = 'O';
let gameOver = false;

function render() {
  boardElement.innerHTML = '';
  board.forEach((val, i) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.textContent = val || '';
    if (!val && !gameOver) {
      cell.addEventListener('click', () => humanMove(i));
    }
    boardElement.appendChild(cell);
  });
}

function humanMove(index) {
  if (board[index] || gameOver) return;
  board[index] = human;
  render();
  if (checkGame(human)) return;
  statusElement.textContent = "AI Thinking...";
  setTimeout(() => {
    aiMove();
    render();
    checkGame(ai);
  }, 300);
}

function aiMove() {
  const bestMove = minimax(board, ai).index;
  board[bestMove] = ai;
}

function minimax(newBoard, player) {
  const availSpots = newBoard.map((v, i) => v === null ? i : null).filter(v => v !== null);

  if (checkWin(newBoard, human)) return { score: -10 };
  if (checkWin(newBoard, ai)) return { score: 10 };
  if (availSpots.length === 0) return { score: 0 };

  let moves = [];

  for (let i = 0; i < availSpots.length; i++) {
    let move = {};
    move.index = availSpots[i];
    newBoard[availSpots[i]] = player;

    if (player === ai) {
      let result = minimax(newBoard, human);
      move.score = result.score;
    } else {
      let result = minimax(newBoard, ai);
      move.score = result.score;
    }

    newBoard[availSpots[i]] = null;
    moves.push(move);
  }

  let bestMove;
  if (player === ai) {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
}

function checkWin(board, player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(p => p.every(i => board[i] === player));
}

function checkGame(player) {
  if (checkWin(board, player)) {
    statusElement.textContent = (player === human ? "You Win! 🎉" : "AI Wins! 🤖");
    highlightWin(player);
    gameOver = true;
    return true;
  } else if (!board.includes(null)) {
    statusElement.textContent = "It's a Draw! 😐";
    gameOver = true;
    return true;
  }
  statusElement.textContent = player === human ? "AI's Turn..." : "Your Turn";
  return false;
}

function highlightWin(player) {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  winPatterns.forEach(p => {
    if (p.every(i => board[i] === player)) {
      [...boardElement.children].forEach((cell, i) => {
        if (p.includes(i)) {
          cell.classList.add('winner');
        }
      });
    }
  });
}

function resetGame() {
  board = Array(9).fill(null);
  gameOver = false;
  statusElement.textContent = "Your Turn";
  render();
}

render();
