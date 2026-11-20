# Tic-Tac

A responsive Tic-Tac-Toe game built with React and Vite. Choose Player vs Player or Player vs Computer, enter player names, and keep track of wins across rounds.

## Project Links

- **Live Demo:** [Netlify]https://vusim-tic-tac.netlify.app
- **GitHub Repository:** [GitHub]https://github.com/skhokho12/v-tic-tac

## Features

- Player vs Player mode
- Player vs Computer mode
- Computer move logic that takes a winning move and blocks an immediate human win
- Custom player names, with default fallback names
- Live turn, winner, draw, and computer-thinking status
- Winning square highlights
- Score tracking across rounds
- Restart, play again, edit setup, and reset score controls
- Responsive arcade-style interface

## Built With

- React 19
- React Hooks and `useReducer`
- Vite 8
- JavaScript (ES modules)
- CSS
- ESLint

## How to Play

1. Open the setup panel.
2. Select Player vs Player or Player vs Computer.
3. Enter a name for Player 1 (X). In Player vs Player mode, also enter a name for Player 2 (O).
4. Select **Start Game**.
5. Players take turns placing X and O on the board.
6. The first player to complete a row, column, or diagonal wins.
7. Use **Play Again** for a new round or **Reset Scores** to clear the scoreboard.

In Player vs Computer mode, Player 1 is X and the computer is O. The computer moves automatically after a short delay.

## Setup

Make sure Node.js and npm are installed.

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Available Scripts

```bash
npm run dev      # Start the development server
npm run build    # Create an optimized production build in dist
npm run preview  # Preview the production build locally
npm run lint     # Run ESLint
```

## Production Build

```bash
npm run build
```

The production files are written to the `dist` folder.
