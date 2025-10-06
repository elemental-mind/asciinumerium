import * as assert from 'assert';
import { incrementUInt, decrementUInt, isZero, isOne, readUInt, writeUInt, encodeUIntToASCII, decodeUIntFromASCII } from "./ASCIIEncodedNumerical.ts";

export class ASCIIEncodedNumericalTests
{
    shouldIncrementSimple()
    {
        const t = "#a|";
        assert.equal(incrementUInt(t, 1, 2), "#b|");
    }

    shouldDecrementSimple()
    {
        const t = "#b|";
        assert.equal(decrementUInt(t, 1, 2), "#a|");
    }

    shouldIncrementWithCarry()
    {
        const t = '#"|';
        assert.equal(incrementUInt(t, 1, 2), "#10|");
    }

    shouldDecrementWithBorrowShrink()
    {
        const t = "#10|";
        assert.equal(decrementUInt(t, 1, 3), '#"|');
    }

    shouldNotDecrementBeyondZero()
    {
        const t = "#0|";
        assert.throws(() => decrementUInt(t, 1, 2));
    }

    shouldIsZeroTrue()
    {
        const t = "#0|";
        assert.equal(isZero(t, 1, 2), true);
    }

    shouldIsZeroFalseForMultipleDigits()
    {
        const t = "#10|";
        assert.equal(isZero(t, 1, 3), false);
    }

    shouldIsZeroFalseForNonZero()
    {
        const t = "#a|";
        assert.equal(isZero(t, 1, 2), false);
    }

    shouldIsOneTrue()
    {
        const t = "#1|";
        assert.equal(isOne(t, 1, 2), true);
    }


    shouldIsOneFalseForMultipleDigits()
    {
        const t = "#11|";
        assert.equal(isOne(t, 1, 3), false);
    }

    shouldIsOneFalseForNonOne()
    {
        const t = "#a|";
        assert.equal(isOne(t, 1, 2), false);
    }

    shouldReadCounterSingleDigit()
    {
        const t = "#9|";
        assert.equal(readUInt(t, 1, 2), 9);
    }

    shouldReadCounterMultipleDigits()
    {
        const t = "#10|";
        assert.equal(readUInt(t, 1, 3), 64);
    }

    shouldReadCounterZero()
    {
        const t = "#0|";
        assert.equal(readUInt(t, 1, 2), 0);
    }

    shouldReadCounterLarge()
    {
        const t = '#""|'; // '"' = 63 in our encoding => 63*64 + 63
        assert.equal(readUInt(t, 1, 3), 63 * 64 + 63);
    }

    shouldWriteCounterSingleDigit()
    {
        const t = "#a|";
        assert.equal(writeUInt(t, 1, 2, 11), "#b|");
    }

    shouldWriteCounterMultipleDigits()
    {
        const t = "#a|";
        assert.equal(writeUInt(t, 1, 2, 64), "#10|");
    }

    shouldWriteCounterZero()
    {
        const t = "#a|";
        assert.equal(writeUInt(t, 1, 2, 0), "#0|");
    }

    shouldEncodeZero()
    {
        assert.equal(encodeUIntToASCII(0), "0");
    }

    shouldEncodeOne()
    {
        assert.equal(encodeUIntToASCII(1), "1");
    }

    shouldEncodeSixtyThree()
    {
        assert.equal(encodeUIntToASCII(63), '"');
    }

    shouldEncodeSixtyFour()
    {
        assert.equal(encodeUIntToASCII(64), "10");
    }

    shouldEncodeLargeNumber()
    {
        // 63*64 + 63 = 4095 + 63 = 4158, encoded as '""'
        assert.equal(encodeUIntToASCII(63 * 64 + 63), '""');
    }

    shouldThrowOnNegativeEncode()
    {
        assert.throws(() => encodeUIntToASCII(-1));
    }

    shouldDecodeZero()
    {
        assert.equal(decodeUIntFromASCII("0"), 0);
    }

    shouldDecodeOne()
    {
        assert.equal(decodeUIntFromASCII("1"), 1);
    }

    shouldDecodeSixtyThree()
    {
        assert.equal(decodeUIntFromASCII('"'), 63);
    }

    shouldDecodeSixtyFour()
    {
        assert.equal(decodeUIntFromASCII("10"), 64);
    }

    shouldDecodeLargeNumber()
    {
        assert.equal(decodeUIntFromASCII('""'), 63 * 64 + 63);
    }

    shouldRoundTrip()
    {
        const values = [0, 1, 42, 63, 64, 12345, 100000];
        for (const value of values) {
            const encoded = encodeUIntToASCII(value);
            const decoded = decodeUIntFromASCII(encoded);
            assert.equal(decoded, value);
        }
    }
}