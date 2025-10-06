// These are helper functions to keep track of a counter
// A counter string might be encoded in string like "#<counter>|", e.g. "#5zAb|"

const digitToCharMap = Uint8Array.from(["0123456789", "abcdefghijklmnopqrstuvwxyz", "ABCDEFGHIJKLMNOPQRSTUVWXYZ", "'", '"'].join("").split("").map(char => char.charCodeAt(0)));
const charToDigitMap = new Uint8Array(128);
const incrementMap = new Uint8Array(128);
const decrementMap = new Uint8Array(128);

//We prepare important constants
const zeroCharValue: number = digitToCharMap[0];
const oneCharValue: number = digitToCharMap[1];
const maxCharValue: number = digitToCharMap[63];

//We fill necessary mappings for fast lookup and decrement/increment operations
for (const [digit, charCode] of digitToCharMap.entries()) 
{
    charToDigitMap[charCode] = digit;
    if (digit === 0) decrementMap[charCode] = digitToCharMap[63]; else decrementMap[charCode] = digitToCharMap[digit - 1];
    if (digit === 63) incrementMap[charCode] = digitToCharMap[0]; else incrementMap[charCode] = digitToCharMap[digit + 1];
}

export function isZero(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): boolean
{
    return text.charCodeAt(lastDigitIndexExclusive - 1) === zeroCharValue && lastDigitIndexExclusive - firstDigitIndexInclusive === 1;
}

export function isOne(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): boolean
{
    return text.charCodeAt(lastDigitIndexExclusive - 1) === digitToCharMap[1] && lastDigitIndexExclusive - firstDigitIndexInclusive === 1;
}

export function encodeUIntToASCII(value: number)
{
    if (value < 0) throw new Error("Can not encode negative numbers");
    const digits = [];
    if
        (value === 0) digits.push(zeroCharValue);
    else
        while (value > 0)
        {
            digits.unshift(digitToCharMap[value & 63]);
            value >>= 6;
        }
    return String.fromCharCode(...digits);
}

export function decodeUIntFromASCII(encodedNumber: string)
{
    let number = 0;
    const numLength = encodedNumber.length;
    for (let currentIndex = 0; currentIndex < numLength;)
    {
        number += charToDigitMap[encodedNumber.charCodeAt(currentIndex++)];
        if (currentIndex < numLength)
            number <<= 6;
    }
    return number;
}

export function readUInt(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): number
{
    let number = 0;
    for (let currentIndex = firstDigitIndexInclusive; currentIndex < lastDigitIndexExclusive;)
    {
        number += charToDigitMap[text.charCodeAt(currentIndex++)];
        if (currentIndex < lastDigitIndexExclusive)
            number <<= 6;
    }
    return number;
}

export function writeUInt(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number, value: number): string
{
    if (value < 0) throw new Error("Can not write negative numbers");
    const digits = [];
    if
        (value === 0) digits.push(zeroCharValue);
    else
        while (value > 0)
        {
            digits.unshift(digitToCharMap[value & 63]);
            value >>= 6;
        }
    return text.slice(0, firstDigitIndexInclusive) + String.fromCharCode(...digits) + text.slice(lastDigitIndexExclusive);
}

export function incrementUInt(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): string
{
    let changedDigits = [];
    let currentIndex = lastDigitIndexExclusive;

    while (currentIndex--)
    {
        const incrementedDigit = incrementMap[text.charCodeAt(currentIndex)];
        changedDigits.unshift(incrementedDigit);

        //If we have not wrapped around, we can stop incrementing upstream digits
        if (incrementedDigit !== zeroCharValue) break;

        // If we overflowed all existing digits, add a new most significant digit and break the loop. As we have more digits now we need to extend
        if (currentIndex === firstDigitIndexInclusive)
        {
            changedDigits.unshift(oneCharValue);
            break;
        }
    }

    return text.slice(0, currentIndex) + String.fromCharCode(...changedDigits) + text.slice(lastDigitIndexExclusive);
}

export function decrementUInt(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): string
{
    let changedDigits = [];
    let currentIndex = lastDigitIndexExclusive;

    while (currentIndex--)
    {
        const decrementedDigit = decrementMap[text.charCodeAt(currentIndex)];
        changedDigits.unshift(decrementedDigit);

        //If we have not wrapped around we are good
        if (decrementedDigit !== maxCharValue && decrementedDigit !== zeroCharValue) break;

        // When we have something like a 09 for example, we can ditch the 0
        if (decrementedDigit === zeroCharValue && currentIndex === firstDigitIndexInclusive && currentIndex !== lastDigitIndexExclusive)
        {
            changedDigits.shift();
            break;
        }

        //If we decremented a zero we throw an errorx
        if (decrementedDigit === maxCharValue && currentIndex === firstDigitIndexInclusive) throw new Error("Can not decrement. Value at zero. ");
    }

    return text.slice(0, currentIndex) + String.fromCharCode(...changedDigits) + text.slice(lastDigitIndexExclusive);
}
