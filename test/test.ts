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
    tests.shouldIsZeroFalseForOne();
    tests.shouldIsZeroFalseForMultipleDigits();
    tests.shouldIsZeroFalseForNonZero();
    tests.shouldIsOneTrue();
    tests.shouldIsOneFalseForZero();
    tests.shouldIsOneFalseForMultipleDigits();
    tests.shouldIsOneFalseForNonOne();
    tests.shouldReadCounterSingleDigit();
    tests.shouldReadCounterMultipleDigits();
    tests.shouldReadCounterZero();
    tests.shouldReadCounterLarge();
    tests.shouldWriteCounterSingleDigit();
    tests.shouldWriteCounterMultipleDigits();
    tests.shouldWriteCounterZero();

    console.log("All tests passed");
}

run();
