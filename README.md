# Asciinumerium

A TypeScript library for encoding and decoding unsigned integers into readable ASCII characters. 
Provides functions to read, write, increment, decrement and check values in compact ASCII-encoded numerical representations. 

It's super tiny, extremely fast and tree-shakeable.

## Features

- **ASCII Encoding/Decoding**: Encode unsigned integers into compact ASCII strings and decode them back
- **Increment/Decrement Operations**: Perform arithmetic operations directly on encoded strings
- **Value Checks**: Check if an encoded value is zero or one
- **Compact Representation**: Uses a custom ASCII-based encoding for efficient storage

## Installation

```bash
npm install asciinumerium
```

## Concepts

### Character ranges & identifying numbers

> This library encodes numbers from 0 to 63 into the character range from ASCII 58 (":") to ASCII 121 ("y") for efficiency reasons. You can not use any characters in this range as delimiters for your numbers.

## Usage

### Encoding and Decoding

```typescript
import { readUInt, writeUInt } from 'asciinumerium';

const encoded = writeUInt("#a|", 1, 2, 42); // Encode 42 into the string
console.log(encoded); // "#y|"

const decoded = readUInt("#y|", 1, 2); // Decode back to number
console.log(decoded); // 42
```

### Incrementing Values

```typescript
import { incrementUInt } from 'asciinumerium';

const original = "#a|";
const incremented = incrementUInt(original, 1, 2);
console.log(incremented); // "#b|"
```

### Checking Values

```typescript
import { isZero, isOne } from 'asciinumerium';

console.log(isZero("#:|", 1, 2)); // true
console.log(isOne("#;|", 1, 2)); // true
```

## API Reference

### Functions

- **`readUInt(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): number`**
  - Decodes an unsigned integer from the specified substring of the text.
  - `text`: The string containing the encoded value.
  - `firstDigitIndexInclusive`: Start index of the encoded digits.
  - `lastDigitIndexExclusive`: End index (exclusive) of the encoded digits.
  - Returns: The decoded unsigned integer.

- **`writeUInt(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number, value: number): string`**
  - Encodes an unsigned integer into the specified substring of the text.
  - `text`: The original string.
  - `firstDigitIndexInclusive`: Start index where to write the encoded digits.
  - `lastDigitIndexExclusive`: End index (exclusive) where to write the encoded digits.
  - `value`: The unsigned integer to encode.
  - Returns: The modified string with the encoded value.

- **`incrementUInt(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): string`**
  - Increments the encoded unsigned integer in the specified substring.
  - `text`: The string containing the encoded value.
  - `firstDigitIndexInclusive`: Start index of the encoded digits.
  - `lastDigitIndexExclusive`: End index (exclusive) of the encoded digits.
  - Returns: The string with the incremented value.

- **`decrementUInt(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): string`**
  - Decrements the encoded unsigned integer in the specified substring.
  - `text`: The string containing the encoded value.
  - `firstDigitIndexInclusive`: Start index of the encoded digits.
  - `lastDigitIndexExclusive`: End index (exclusive) of the encoded digits.
  - Returns: The string with the decremented value.
  - Throws: Error if attempting to decrement below zero.

- **`isZero(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): boolean`**
  - Checks if the encoded value in the specified substring is zero.
  - `text`: The string containing the encoded value.
  - `firstDigitIndexInclusive`: Start index of the encoded digits.
  - `lastDigitIndexExclusive`: End index (exclusive) of the encoded digits.
  - Returns: True if the value is zero, false otherwise.

- **`isOne(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): boolean`**
  - Checks if the encoded value in the specified substring is one.
  - `text`: The string containing the encoded value.
  - `firstDigitIndexInclusive`: Start index of the encoded digits.
  - `lastDigitIndexExclusive`: End index (exclusive) of the encoded digits.
  - Returns: True if the value is one, false otherwise.

### Constants

- **`zeroCharValue: number`**: The ASCII value used as the zero digit (58, which is ':').
- **`maxCharValue: number`**: The maximum ASCII value used for digits (zeroCharValue + 63, which is 'y').

## License

MIT