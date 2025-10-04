import * as assert from 'assert';
import { incrementUInt, decrementUInt, isZero, isOne, readUInt, writeUInt } from "./ASCIIEncodedNumerical.ts";

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
        const t = "#y|";
        assert.equal(incrementUInt(t, 1, 2), `#;:|`);
    }

    shouldDecrementWithBorrowShrink()
    {
        const t = `#;:|`;
        assert.equal(decrementUInt(t, 1, 3), "#y|");
    }

    shouldNotDecrementBeyondZero()
    {
        const t = "#:|";
        assert.throws(() => decrementUInt(t, 1, 2));
    }

    shouldIsZeroTrue()
    {
        const t = "#:|";
        assert.equal(isZero(t, 1, 2), true);
    }

    shouldIsZeroFalseForOne()
    {
        const t = "#;|";
        assert.equal(isZero(t, 1, 2), false);
    }

    shouldIsZeroFalseForMultipleDigits()
    {
        const t = "#;:|";
        assert.equal(isZero(t, 1, 3), false);
    }

    shouldIsZeroFalseForNonZero()
    {
        const t = "#a|";
        assert.equal(isZero(t, 1, 2), false);
    }

    shouldIsOneTrue()
    {
        const t = "#;|";
        assert.equal(isOne(t, 1, 2), true);
    }

    shouldIsOneFalseForZero()
    {
        const t = "#:|";
        assert.equal(isOne(t, 1, 2), false);
    }

    shouldIsOneFalseForMultipleDigits()
    {
        const t = "#;;|";
        assert.equal(isOne(t, 1, 3), false);
    }

    shouldIsOneFalseForNonOne()
    {
        const t = "#a|";
        assert.equal(isOne(t, 1, 2), false);
    }

    shouldReadCounterSingleDigit()
    {
        const t = "#a|";
        assert.equal(readUInt(t, 1, 2), 97 - 58); // 'a' = 97
    }

    shouldReadCounterMultipleDigits()
    {
        const t = "#;:|";
        assert.equal(readUInt(t, 1, 3), 64); // '('=0, ')'=1, 0*64 +1 =1
    }

    shouldReadCounterZero()
    {
        const t = "#:|";
        assert.equal(readUInt(t, 1, 2), 0);
    }

    shouldReadCounterLarge()
    {
        const t = "#yy|"; // 'y' = 63 in our encoding => 63*64 + 63
        assert.equal(readUInt(t, 1, 3), 63 * 64 + 63);
    }

    shouldWriteCounterSingleDigit()
    {
        const t = "#a|";
        assert.equal(writeUInt(t, 1, 2, 98 - 58), "#b|");
    }

    shouldWriteCounterMultipleDigits()
    {
        const t = "#a|";
        assert.equal(writeUInt(t, 1, 2, 64), "#;:|");
    }

    shouldWriteCounterZero()
    {
        const t = "#a|";
        assert.equal(writeUInt(t, 1, 2, 0), "#:|");
    }
}