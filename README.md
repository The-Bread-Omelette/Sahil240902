# Enigma Machine Simulator

An implementation of the historic Enigma cipher machine used in WWII, featuring rotor encryption/decryption and plugboard configurations.

## Features
- **Object-oriented design** with modular components (rotors, reflector, plugboard)
- **CLI and GUI versions**
- Configurable settings:
  - Rotor types (I-V)
  - Ring settings & positions
  - Plugboard pairings
  - Reflector types (UKW-B/UKW-C)[5][7]

## Installation

Download python

Go to the directry

Start local web server
python -m http.server 8000
Then open http://localhost:8000 in your browser

text

## Example Configuration
from enigma import EnigmaMachine

Initialize machine with settings
machine = EnigmaMachine(
rotors=['II', 'IV', 'V'],
reflector='B',
ring_settings=[1,,
plugboard='AV BS CG DL FU HZ IN KM OW RX')

Encrypt/decrypt message
message = "SECRETMESSAGE"
ciphertext = machine.process_text(message)
print(f"Encrypted: {ciphertext}")

#Hopefully The UI is userfriendly enough
##(it contains bugs whihc i intend to correct aafter 21st)
