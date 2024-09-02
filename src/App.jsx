import { useState } from 'react';
import GameBoard from "./components/GameBoard/GameBoard";
import Header from "./components/Header/Header";
import Player from "./components/Player/Player";
import Log from "./components/Log/Log";
import GameOver from "./components/GameOver/GameOver";
import { WINNING_COMBINATIONS } from './winning-combinations';

const PLAYERS = {
  X: 'Player 1',
  O: 'Player 2'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = undefined;

  for (const winningCombination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[winningCombination[0].row][winningCombination[0].column];
    const secondSquareSymbol = gameBoard[winningCombination[1].row][winningCombination[1].column];
    const thirdSquareSymbol = gameBoard[winningCombination[2].row][winningCombination[2].column];

    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function initializeGameBoard(gameTurns) {
  const gameBoard = [...INITIAL_GAME_BOARD.map(innerArray => [...innerArray])];

  for (const gameTurn of gameTurns) {
      const { square, player } = gameTurn;
      const { rowIndex, colIndex } = square;

      gameBoard[rowIndex][colIndex] = player;
  }

  return gameBoard;
}

function App() {
  const [ players, setPlayers ] = useState(PLAYERS);
  const [ gameTurns, setGameTurns ] = useState([]);

  const currentPlayer = deriveActivePlayer(gameTurns);
  const gameBoard = initializeGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  const isDraw = gameTurns.length == 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex, ) {
    setGameTurns(previousTurns => {
      let currentPlayer = deriveActivePlayer(previousTurns);

      const updatedTurns = [{ square: { rowIndex: rowIndex, colIndex: colIndex }, player: currentPlayer}, ...previousTurns ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(previousState => {
      return {
        ...previousState,
        [symbol]: newName
      };
    });
  }

  return (
    <>
      <Header />
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={PLAYERS.X}
              symbol="X"
              isActive={currentPlayer === 'X'}
              onChangeName={handlePlayerNameChange} />
            <Player
              initialName={PLAYERS.O}
              symbol="O"
              isActive={currentPlayer === 'O'}
              onChangeName={handlePlayerNameChange} />
          </ol>
          {(winner || isDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
          <GameBoard
            onSelectSquare={handleSelectSquare}
            board={gameBoard} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  )
}

export default App;
