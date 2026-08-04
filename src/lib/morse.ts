export const MORSE_CODE: Record<string, string> = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "0": "-----", "1": ".----", "2": "..---", "3": "...--", "4": "....-",
  "5": ".....", "6": "-....", "7": "--...", "8": "---..", "9": "----.",
  ".": ".-.-.-", ",": "--..--", "?": "..--..", "'": ".----.",
  "!": "-.-.--", "/": "-..-.", "(": "-.--.", ")": "-.--.-",
  "&": ".-...", ":": "---...", ";": "-.-.-.", "=": "-...-",
  "+": ".-.-.", "-": "-....-", "_": "..--.-", '\"': ".-..-.",
  "$": "...-..-", "@": ".--.-.",
  " ": "/",
};

export const TEXT_CODE: Record<string, string> = Object.entries(MORSE_CODE).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {} as Record<string, string>
);

export function textToMorse(text: string): string {
  return text
    .toUpperCase()
    .split("")
    .map((char) => MORSE_CODE[char] || "")
    .filter(Boolean)
    .join(" ");
}

export function morseToText(morse: string): string {
  return morse
    .trim()
    .split(/\s+/)
    .map((code) => {
      if (code === "/") return " ";
      return TEXT_CODE[code] || "";
    })
    .join("");
}

// ─── Audio Engine ───────────────────────────────────────────────
let currentAudioCtx: AudioContext | null = null;
let currentOscillators: OscillatorNode[] = [];
let currentGainNodes: GainNode[] = [];
let playTimeoutId: ReturnType<typeof setTimeout> | null = null;
let isCurrentlyPlaying = false;

export function getIsPlaying(): boolean {
  return isCurrentlyPlaying;
}

export function stopMorseAudio(): void {
  for (const osc of currentOscillators) {
    try {
      osc.stop();
    } catch (_e) {
      /* already stopped */
    }
  }
  for (const gain of currentGainNodes) {
    try {
      gain.disconnect();
    } catch (_e) {
      /* already disconnected */
    }
  }
  if (currentAudioCtx && currentAudioCtx.state !== "closed") {
    try {
      currentAudioCtx.close();
    } catch (_e) {
      /* already closed */
    }
  }
  if (playTimeoutId) {
    clearTimeout(playTimeoutId);
    playTimeoutId = null;
  }
  currentOscillators = [];
  currentGainNodes = [];
  currentAudioCtx = null;
  isCurrentlyPlaying = false;
}

export function playMorseAudio(
  morse: string,
  options: { speed?: number; frequency?: number; volume?: number } = {}
): Promise<void> {
  // Stop any previous playback first
  stopMorseAudio();

  const { speed = 20, frequency = 550, volume = 0.5 } = options;
  const dotDuration = 1.2 / speed; // seconds per dot
  const dashDuration = dotDuration * 3;
  const symbolGap = dotDuration; // gap between elements within a letter
  const letterGap = dotDuration * 3; // gap between letters
  const wordGap = dotDuration * 7; // gap between words
  const ATTACK = 0.005; // 5ms attack
  const RELEASE = 0.005; // 5ms release

  return new Promise((resolve) => {
    const audioCtx = new AudioContext();
    currentAudioCtx = audioCtx;
    currentOscillators = [];
    currentGainNodes = [];
    isCurrentlyPlaying = true;

    const startTime = audioCtx.currentTime + 0.05; // small buffer to avoid glitches
    let time = startTime;

    for (const char of morse) {
      if (char === ".") {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, time);

        // Envelope: 5ms attack, sustain, 5ms release
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(volume, time + ATTACK);
        gainNode.gain.setValueAtTime(volume, time + dotDuration - RELEASE);
        gainNode.gain.linearRampToValueAtTime(0, time + dotDuration);

        oscillator.start(time);
        oscillator.stop(time + dotDuration + 0.01);

        currentOscillators.push(oscillator);
        currentGainNodes.push(gainNode);

        time += dotDuration + symbolGap;
      } else if (char === "-") {
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(frequency, time);

        // Envelope: 5ms attack, sustain, 5ms release
        gainNode.gain.setValueAtTime(0, time);
        gainNode.gain.linearRampToValueAtTime(volume, time + ATTACK);
        gainNode.gain.setValueAtTime(volume, time + dashDuration - RELEASE);
        gainNode.gain.linearRampToValueAtTime(0, time + dashDuration);

        oscillator.start(time);
        oscillator.stop(time + dashDuration + 0.01);

        currentOscillators.push(oscillator);
        currentGainNodes.push(gainNode);

        time += dashDuration + symbolGap;
      } else if (char === " ") {
        // Gap between letters: 3x dot total, already 1x dot gap after last element
        time += letterGap - symbolGap;
      } else if (char === "/") {
        // Gap between words: 7x dot total, already 1x dot gap after last element
        time += wordGap - symbolGap;
      }
    }

    const totalDuration = (time - startTime) * 1000;

    // After playback completes, clean up and resolve
    playTimeoutId = setTimeout(() => {
      isCurrentlyPlaying = false;
      currentOscillators = [];
      currentGainNodes = [];
      if (audioCtx && audioCtx.state !== "closed") {
        audioCtx.close();
      }
      currentAudioCtx = null;
      resolve();
    }, totalDuration + 300);
  });
}
