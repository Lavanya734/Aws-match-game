function GameOver({ moves = 0, time = "00:00", onReplay }) {
  return (
    <div className="game-over">
      <div className="game-over-content">
        <span className="game-over-label">
          GAME COMPLETE
        </span>

        <div className="game-over-icon">✓</div>

        <h1>
          You matched
          <br />
          <span>all 10 services.</span>
        </h1>

        <p>
          Nice work! You explored AWS services while
          playing the memory game.
        </p>

        <div className="final-stats">
          <div>
            <span>MOVES</span>
            <strong>{moves}</strong>
          </div>

          <div>
            <span>TIME</span>
            <strong>{time}</strong>
          </div>
        </div>

        <button className="replay-button" onClick={onReplay}>
          Play Again
          <span>↻</span>
        </button>
      </div>
    </div>
  );
}

export default GameOver;