# Asciinumerium

A TypeScript library for encoding and decoding unsigned integers into readable ASCII characters. 
Provides functions to read, write, increment, decrement and check values in compact ASCII-encoded numerical representations. 

It's super tiny, extremely fast and tree-shakeable.

This library was mainly created for use cases where strings and numbers would be interleaved and where an ArrayBuffer might hinder development ergnomics, but where you'd still like the memory benefits of single-byte encoded count trackers etc., as V8 for example stores ASCII-encodable strings as 8 bit arrays.
Think strings like `...\<key>#\<count>|\<key>#\<count>...` e.g. `"id_xyz#900|id_abc#57"`. 

## Features

- **ASCII Encoding/Decoding**: Encode unsigned integers into compact ASCII strings and decode them back
- **Increment/Decrement Operations**: Performant arithmetic operations directly on encoded strings minimizing changed digits.
- **Value Checks**: Check if an encoded value is zero or one
- **Compact Representation**: Uses a custom ASCII-based encoding for efficient storage

## Installation

```bash
npm install asciinumerium
```

## Concepts

### Character ranges & identifying numbers

This library maps numbers from 0 to 63 onto the following character set: `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'"`. This means `0 => 0` all the way to `63 => "` to then wrap around to `64 => 10` and `127 => 1"` and so forth.

## Usage

### Encoding and Decoding

```typescript
import { readUInt, writeUInt } from 'asciinumerium';

const encoded = writeUInt("#a|", 1, 2, 42); // Encode 42 into the string
console.log(encoded); // "#y|"

const decoded = readUInt("#y|", 1, 2); // Decode back to number
console.log(decoded); // 42
```

### Incrementing/Decrementing Values

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

- **`encodeUIntToASCII(value: number): string`**
  - Encodes an unsigned integer into an ASCII-encoded string using a custom base-64 like encoding.
  - `value`: The unsigned integer to encode. Must be non-negative.
  - Returns: The ASCII-encoded string representation of the value.
  - Throws: Error if the value is negative.

- **`decodeUIntFromASCII(encodedNumber: string): number`**
  - Decodes an ASCII-encoded string back into an unsigned integer.
  - `encodedNumber`: The ASCII-encoded string to decode.
  - Returns: The decoded unsigned integer.

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