# Tic-Tac-Toe using Min-Max Algorithm

A browser-based Tic-Tac-Toe game where you play against an unbeatable AI opponent powered by the Minimax algorithm.

## Overview

You play as **X** and the AI plays as **O**. The AI evaluates every possible sequence of future moves using Minimax, a decision-making algorithm that assumes both players play optimally. Because of this, the AI never makes a mistake: the best possible outcome for a human player is a draw, and any misstep results in a loss.

## How It Works

The board is represented as a flat array of 9 cells. On each AI turn, the `minimax` function recursively simulates every legal move from the current position, scoring the end of each branch as a win for the AI (+10), a win for the human (-10), or a draw (0). The AI then picks the move that maximizes its guaranteed outcome, while assuming the human will always pick the move that minimizes the AI's outcome. This recursive maximizing/minimizing process is what gives the algorithm its name.

Win detection checks all 8 possible winning lines (3 rows, 3 columns, 2 diagonals) after every move, and the winning line is highlighted on the board when the game ends.

## Features

- Play against a Minimax-based AI that never loses
- Visual highlight of the winning line when a game ends
- Win, loss, and draw detection with status messages
- Restart button to start a new game instantly
- No dependencies, frameworks, or build steps — just open the file in a browser

## Tech Stack

- HTML for structure
- CSS (inline) for styling and layout
- Vanilla JavaScript (inline) for game logic and the Minimax AI

## Project Structure

```
.
├── index.html      # Game markup, styling, and logic (self-contained)
└── README.md
```

## Getting Started

No installation or build step required.

1. Clone the repository:
   ```
   git clone https://github.com/PingiliVaishnaviReddy/Tic-Tac-Toe.git
   ```
2. Open `index.html` directly in any web browser.

## How to Play

1. Click any empty cell to place your **X**.
2. The AI responds automatically as **O** after a short delay.
3. The game ends when there's a winning line or the board fills up, with the result shown below the board.
4. Click **Restart Game** to play again.

## Notes

Since the AI always plays optimally, it cannot be beaten — the best achievable result against it is a draw. This is expected behavior for a correctly implemented Minimax opponent in a solved game like Tic-Tac-Toe, rather than a bug.

## Acknowledgements

Built as a hands-on exercise in implementing the Minimax algorithm and game-tree search in JavaScript.
