import { useEffect, useRef } from "react";

import {
  playCardClick,
  playFlipBack,
  playMatch,
} from "../utils/gameSounds";

function MemoryCard({
  service,
  isFlipped = false,
  isMatched = false,
  onClick,
}) {
  const previousFlipped = useRef(isFlipped);
  const previousMatched = useRef(isMatched);

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      playCardClick();
      onClick(service);
    }
  };

  useEffect(() => {
    if (!previousMatched.current && isMatched) {
      playMatch();
    }

    previousMatched.current = isMatched;
  }, [isMatched]);

  useEffect(() => {
    if (
      previousFlipped.current &&
      !isFlipped &&
      !isMatched
    ) {
      playFlipBack();
    }

    previousFlipped.current = isFlipped;
  }, [isFlipped, isMatched]);

  return (
    <button
      className={`memory-card ${isFlipped ? "is-flipped" : ""} ${
        isMatched ? "is-matched" : ""
      }`}
      onClick={handleClick}
      aria-label={
        isFlipped
          ? `${service?.name || "AWS service"} card`
          : "Hidden AWS service card"
      }
    >
      <div className="card-inner">
        <div className="card-face card-back">
          <span className="card-back-mark">AWS</span>

          <span className="card-back-symbol">
            ✦
          </span>

          <span className="card-back-hint">
            FLIP ME
          </span>
        </div>

        <div className="card-face card-front">
          {service?.icon && (
            <img
              src={service.icon}
              alt=""
              className="service-icon"
            />
          )}

          <span className="service-name">
            {service?.name || "AWS Service"}
          </span>

          {service?.category && (
            <span className="service-category">
              {service.category}
            </span>
          )}

          {isMatched && (
            <span className="match-badge">
              ✓ MATCH
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

export default MemoryCard;