function GameStats({
  moves = 0,
  time = "00:00",
  matched = 0,
  total = 10,
}) {
  return (
    <div className="game-stats">
      <div className="stat-item">
        <span className="stat-label">MOVES</span>
        <strong>{moves}</strong>
      </div>

      <div className="stat-divider"></div>

      <div className="stat-item">
        <span className="stat-label">TIME</span>
        <strong>{time}</strong>
      </div>

      <div className="stat-divider"></div>

      <div className="stat-item">
        <span className="stat-label">MATCHED</span>
        <strong>
          {matched}/{total}
        </strong>
      </div>
    </div>
  );
}

export default GameStats;