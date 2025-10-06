import { ASCIIEncodedNumericalTests } from "../source/ASCIIEncodedNumerical.spec.ts";

function run()
{
    const tests = new ASCIIEncodedNumericalTests();
    tests.shouldIncrementSimple();
    tests.shouldDecrementSimple();
    tests.shouldIncrementWithCarry();
    tests.shouldDecrementWithBorrowShrink();
    tests.shouldNotDecrementBeyondZero();
    tests.shouldIsZeroTrue();
    tests.shouldIsZeroFalseForMultipleDigits();
    tests.shouldIsZeroFalseForNonZero();
    tests.shouldIsOneTrue();
    tests.shouldIsOneFalseForMultipleDigits();
    tests.shouldIsOneFalseForNonOne();
    tests.shouldReadCounterSingleDigit();
    tests.shouldReadCounterMultipleDigits();
    tests.shouldReadCounterZero();
    tests.shouldReadCounterLarge();
    tests.shouldWriteCounterSingleDigit();
    tests.shouldWriteCounterMultipleDigits();
    tests.shouldWriteCounterZero();
    tests.shouldEncodeZero();
    tests.shouldEncodeOne();
    tests.shouldEncodeSixtyThree();
    tests.shouldEncodeSixtyFour();
    tests.shouldEncodeLargeNumber();
    tests.shouldThrowOnNegativeEncode();
    tests.shouldDecodeZero();
    tests.shouldDecodeOne();
    tests.shouldDecodeSixtyThree();
    tests.shouldDecodeSixtyFour();
    tests.shouldDecodeLargeNumber();
    tests.shouldRoundTrip();

    console.log("All tests passed");
}

run();
