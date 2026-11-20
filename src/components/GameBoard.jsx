import Square from './Square'

function GameBoard({ board, onSquareClick, disabled, winningLine }) {
  return (
    <section className="board-shell" aria-label="Tic-Tac-Toe Board">
      <div className="board-grid" role="grid" aria-label="3 by 3 board">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => onSquareClick(index)}
            disabled={disabled || value !== null}
            isWinningSquare={winningLine.includes(index)}
          />
        ))}
      </div>
      {winningLine.length === 3 && (
        <div className="win-indicator" aria-hidden="true">
          Victory Line Active
        </div>
      )}
    </section>
  )
}

export default GameBoard
