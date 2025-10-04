// These are helper functions to keep track of a counter
// A counter string might be encoded in string like "#<counter>|", e.g. "#5zAb|"

export const zeroCharValue: number = 58;       // ASCII: ":"
export const maxCharValue: number = zeroCharValue + 63;   // ASCII: "y"

export function isZero(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): boolean
{
    return text.charCodeAt(lastDigitIndexExclusive - 1) === zeroCharValue && lastDigitIndexExclusive - firstDigitIndexInclusive === 1;
}

export function isOne(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): boolean
{
    return text.charCodeAt(lastDigitIndexExclusive - 1) - zeroCharValue === 1 && lastDigitIndexExclusive - firstDigitIndexInclusive === 1;
}

export function readUInt(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): number
{
    let number = 0;
    for (let currentIndex = firstDigitIndexInclusive; currentIndex < lastDigitIndexExclusive;)
    {
        number += text.charCodeAt(currentIndex++) - zeroCharValue;
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
            digits.unshift((value & 63) + zeroCharValue);
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
        // Increment current digit, add it to changed digits
        changedDigits.unshift(text.charCodeAt(currentIndex) + 1);

        // If we went from 97 to 98 we can break, as 8 < 10, thus no carry needed, otherwise we need to correct the out of bounds value to a zero and handle carry logic.
        if (changedDigits[0] <= maxCharValue) break; else changedDigits[0] = zeroCharValue;

        if (currentIndex === firstDigitIndexInclusive)
        {
            // If we overflowed all existing digits, add a new most significant digit and break the loop. As we have more digits now we need to extend
            changedDigits.unshift(zeroCharValue + 1);
            break;
        }
    }

    return text.slice(0, currentIndex) + String.fromCharCode(...changedDigits) + text.slice(lastDigitIndexExclusive);
}

export function decrementUInt(text: string, firstDigitIndexInclusive: number, lastDigitIndexExclusive: number): string
{
    if (isZero(text, firstDigitIndexInclusive, lastDigitIndexExclusive)) throw new Error("Can not decrement. Value at zero. ");
    let changedDigits = [];
    let currentIndex = lastDigitIndexExclusive;

    while (currentIndex--)
    {
        // Decrement current digit and add it to changed digits
        changedDigits.unshift(text.charCodeAt(currentIndex) - 1);

        //If we have something like 12 => 11. We're ok
        if (changedDigits[0] > zeroCharValue) break;

        // We either have something like 10 => 09, or something like 11 => 10. In either case we break, but we need to remove digits in he 09 case.
        if (changedDigits[0] === zeroCharValue)
        {
            //Case 09
            if (currentIndex === firstDigitIndexInclusive) changedDigits.shift();
            break;
        }

        //We have a 1 => 1<-1> and correct that to 19
        changedDigits[0] = maxCharValue;
    }
    // Update the text with the new digit values
    return text.slice(0, currentIndex) + String.fromCharCode(...changedDigits) + text.slice(lastDigitIndexExclusive);
}
