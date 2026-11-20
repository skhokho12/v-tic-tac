function Square({ value, onClick, disabled, isWinningSquare }) {
  return (
    <button
      type="button"
      className={`square ${value ? `occupied ${value.toLowerCase()}` : ''} ${isWinningSquare ? 'winning' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={value ? `Square occupied by ${value}` : 'Empty square'}
    >
      <span className={`piece ${value ? `piece-${value.toLowerCase()}` : ''}`} aria-hidden="true">
        {value === 'X' && (
          <span className="piece-x">
            <span className="x-bar x-bar-a"></span>
            <span className="x-bar x-bar-b"></span>
          </span>
        )}
        {value === 'O' && <span className="piece-o"></span>}
      </span>
    </button>
  )
}

export default Square
