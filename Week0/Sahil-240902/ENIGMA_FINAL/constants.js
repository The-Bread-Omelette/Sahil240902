export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const KEY_RADIUS = 24;
export const KEY_BORDER = 3;
export const KEY_BORDER_COLOR = "#CCCCCC";
export const KEY_BGCOLOR = "#666666";
export const KEY_UP_COLOR = "#CCCCCC";
export const KEY_DOWN_COLOR = "#CC3333";
export const KEY_LABEL_DY = 10;
export const KEY_FONT = "20px Arial";

export const LAMP_RADIUS = 23;
export const LAMP_BORDER_COLOR = "#111111";
export const LAMP_BGCOLOR = "#333333";
export const LAMP_OFF_COLOR = "#666666";
export const LAMP_LABEL_DY = 9;
export const LAMP_FONT = "20px Arial";

export const ROTOR_PERMUTATIONS = [
  "EKMFLGDQVZNTOWYHXUSPAIBRCJ", // Slow rotor
  "AJDKSIRUXBLHWTMCQGZNPYFVOE", // Medium rotor
  "BDFHJLCPRTXVZNYEIWGAKMUSQO", // Fast rotor
  "ESOVPZJAYQUIRHXLNFTGKDCMWB",
  "VZBRGITYUPSDNHLXAWMJQOFECK"
];

export const ROTOR_BGCOLOR = "#BBAA77";
export const ROTOR_WIDTH = 24;
export const ROTOR_HEIGHT = 26;
export const ROTOR_COLOR = "Black";
export const ROTOR_LABEL_DY = 9;
export const ROTOR_FONT = "20px Helvetica Neue";

export const ROTOR_LOCATIONS = [
  { x: 244, y: 95 },
  { x: 329, y: 95 },
  { x: 412, y: 95 }
];

// Rotor clickable box (top-left and bottom-right)
export const posirot = ROTOR_LOCATIONS.map(loc => ({
  x: loc.x - ROTOR_WIDTH / 2,
  y: loc.y - ROTOR_HEIGHT / 2
}));
export const poserot = ROTOR_LOCATIONS.map(loc => ({
  x: loc.x + ROTOR_WIDTH / 2,
  y: loc.y + ROTOR_HEIGHT / 2
}));

export const REFLECTOR_PERMUTATION = "IXUHFEZDAOMTKQJWNSRLCYPBVG";

// QWERTZ layout coordinates for plugboard keys (spaced for blue rectangles)
export const KEY_LOCATIONS = [
  { x: 110, y: 340 }, // Q
  { x: 180, y: 340 }, // W
  { x: 250, y: 340 }, // E
  { x: 320, y: 340 }, // R
  { x: 390, y: 340 }, // T
  { x: 460, y: 340 }, // Z
  { x: 530, y: 340 }, // U
  { x: 600, y: 340 }, // I
  { x: 670, y: 340 }, // O
  { x: 740, y: 340 }, // P
  { x: 150, y: 400 }, // A
  { x: 220, y: 400 }, // S
  { x: 290, y: 400 }, // D
  { x: 360, y: 400 }, // F
  { x: 430, y: 400 }, // G
  { x: 500, y: 400 }, // H
  { x: 570, y: 400 }, // J
  { x: 640, y: 400 }, // K
  { x: 710, y: 400 }, // L
  { x: 190, y: 460 }, // Y
  { x: 260, y: 460 }, // X
  { x: 330, y: 460 }, // C
  { x: 400, y: 460 }, // V
  { x: 470, y: 460 }, // B
  { x: 540, y: 460 }, // N
  { x: 610, y: 460 }  // M
];

export const LAMP_LOCATIONS = [
  { x: 144, y: 332 }, { x: 472, y: 403 }, { x: 321, y: 402 }, { x: 296, y: 333 },
  { x: 272, y: 265 }, { x: 372, y: 333 }, { x: 448, y: 334 }, { x: 524, y: 334 },
  { x: 650, y: 266 }, { x: 600, y: 335 }, { x: 676, y: 335 }, { x: 700, y: 403 },
  { x: 624, y: 403 }, { x: 549, y: 403 }, { x: 725, y: 267 }, { x:  94, y: 401 },
  { x: 121, y: 264 }, { x: 347, y: 265 }, { x: 220, y: 332 }, { x: 423, y: 265 },
  { x: 574, y: 266 }, { x: 397, y: 402 }, { x: 197, y: 264 }, { x: 246, y: 402 },
  { x: 170, y: 401 }, { x: 499, y: 265 }
];
