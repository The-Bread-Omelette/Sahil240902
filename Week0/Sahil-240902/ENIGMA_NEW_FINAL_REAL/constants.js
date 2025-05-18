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
  "EKMFLGDQVZNTOWYHXUSPAIBRCJ",        /* Permutation for slow rotor      */
  "AJDKSIRUXBLHWTMCQGZNPYFVOE",        /* Permutation for medium rotor    */
  "BFHJLCPRTXVZNYEIWGAKMUSQO"         /* Permutation for fast rotor      */
];

export const ROTOR_BGCOLOR = "#BBAA77";       /* Background color for the rotor  */
export const ROTOR_WIDTH = 24;                /* Width of the setting indicator  */
export const ROTOR_HEIGHT = 26;               /* Height of the setting indicator */
export const ROTOR_COLOR = "Black";           /* Text color of the rotor         */
export const ROTOR_LABEL_DY = 9;              /* Offset from center to baseline  */
export const ROTOR_FONT = "Helvetica Neue-24";

export const ROTOR_LOCATIONS = [
   { x: 244, y: 95 },
   { x: 329, y: 95 },
   { x: 412, y: 95 }
];

export const posirot = ROTOR_LOCATIONS.map(loc => ({
  x: loc.x - ROTOR_WIDTH/2,  // 75, 175, 275
  y: loc.y - ROTOR_HEIGHT/2  // 100, 100, 100
}));

export const poserot = ROTOR_LOCATIONS.map(loc => ({
  x: loc.x + ROTOR_WIDTH/2,  // 125, 225, 325
  y: loc.y + ROTOR_HEIGHT/2  // 200, 200, 200
}));

export const REFLECTOR_PERMUTATION = "IXUHFEZDAOMTKQJWNSRLCYPBVG";

