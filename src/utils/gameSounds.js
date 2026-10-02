let audioContext;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (
      window.AudioContext || window.webkitAudioContext
    )();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  return audioContext;
}

function playTone({
  frequency,
  duration,
  type = "sine",
  volume = 0.08,
  delay = 0,
}) {
  const ctx = getAudioContext();

  const oscillator = ctx.createOscillator();
  const gain = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(
    frequency,
    ctx.currentTime + delay
  );

  gain.gain.setValueAtTime(
    0,
    ctx.currentTime + delay
  );

  gain.gain.linearRampToValueAtTime(
    volume,
    ctx.currentTime + delay + 0.01
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    ctx.currentTime + delay + duration
  );

  oscillator.connect(gain);
  gain.connect(ctx.destination);

  oscillator.start(ctx.currentTime + delay);
  oscillator.stop(ctx.currentTime + delay + duration);
}

export function playCardClick() {
  playTone({
    frequency: 520,
    duration: 0.08,
    type: "sine",
    volume: 0.045,
  });
}

export function playFlipBack() {
  playTone({
    frequency: 240,
    duration: 0.12,
    type: "triangle",
    volume: 0.05,
  });
}

export function playMatch() {
  playTone({
    frequency: 523.25,
    duration: 0.12,
    type: "sine",
    volume: 0.07,
  });

  playTone({
    frequency: 659.25,
    duration: 0.14,
    type: "sine",
    volume: 0.07,
    delay: 0.08,
  });

  playTone({
    frequency: 783.99,
    duration: 0.2,
    type: "sine",
    volume: 0.08,
    delay: 0.16,
  });
}

export function playLevelComplete() {
    // Opening fanfare
    playTone({
        frequency: 392.0,
        duration: 0.22,
        type: "sine",
        volume: 0.14,
    });

    playTone({
        frequency: 493.88,
        duration: 0.22,
        type: "sine",
        volume: 0.14,
        delay: 0.16,
    });

    playTone({
        frequency: 587.33,
        duration: 0.25,
        type: "sine",
        volume: 0.15,
        delay: 0.32,
    });

    // Main victory notes
    playTone({
        frequency: 783.99,
        duration: 0.35,
        type: "sine",
        volume: 0.17,
        delay: 0.52,
    });

    playTone({
        frequency: 987.77,
        duration: 0.42,
        type: "sine",
        volume: 0.18,
        delay: 0.78,
    });

    playTone({
        frequency: 1174.66,
        duration: 0.55,
        type: "sine",
        volume: 0.20,
        delay: 1.05,
    });

    // Big final victory chord
    playTone({
        frequency: 783.99,
        duration: 0.8,
        type: "sine",
        volume: 0.13,
        delay: 1.35,
    });

    playTone({
        frequency: 987.77,
        duration: 0.8,
        type: "sine",
        volume: 0.13,
        delay: 1.35,
    });

    playTone({
        frequency: 1174.66,
        duration: 0.9,
        type: "sine",
        volume: 0.15,
        delay: 1.35,
    });

    playTone({
        frequency: 1567.98,
        duration: 1.0,
        type: "sine",
        volume: 0.12,
        delay: 1.35,
    });
}