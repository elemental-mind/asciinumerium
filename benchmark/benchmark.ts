import { Bench } from 'tinybench';
import { writeUInt, incrementUInt, decrementUInt } from '../source/ASCIIEncodedNumerical.ts';

async function runBenchmarks() {
    const bench = new Bench({ time: 100 });

    // Short strings (~100 chars)
    const shortPrefix = 'x'.repeat(48);
    const shortSuffix = 'x'.repeat(48);

    // Long strings (~1000 chars)
    const longPrefix = 'x'.repeat(498);
    const longSuffix = 'x'.repeat(498);

    // Pre-build strings for benchmarks
    const shortSingleWrite = shortPrefix + 'a' + shortSuffix;
    const shortMultiWrite = shortPrefix + ';: ' + shortSuffix;
    const longSingleWrite = longPrefix + 'a' + longSuffix;
    const longMultiWrite = longPrefix + ';: ' + longSuffix;

    const shortIncSingleNoCarry = shortPrefix + 'a' + shortSuffix;
    const shortIncSingleCarry = shortPrefix + 'y' + shortSuffix;
    const shortIncMultiNoCarry = shortPrefix + ';: ' + shortSuffix;
    const shortIncMultiCarry = shortPrefix + 'yy' + shortSuffix;
    const longIncSingleNoCarry = longPrefix + 'a' + longSuffix;
    const longIncSingleCarry = longPrefix + 'y' + longSuffix;
    const longIncMultiNoCarry = longPrefix + ';: ' + longSuffix;
    const longIncMultiCarry = longPrefix + 'yy' + longSuffix;

    const shortDecSingleNoBorrow = shortPrefix + 'b' + shortSuffix;
    const shortDecSingleBorrow = shortPrefix + ';: ' + shortSuffix;
    const shortDecMultiNoBorrow = shortPrefix + ';b' + shortSuffix;
    const shortDecMultiBorrow = shortPrefix + 'z: ' + shortSuffix;
    const longDecSingleNoBorrow = longPrefix + 'b' + longSuffix;
    const longDecSingleBorrow = longPrefix + ';: ' + longSuffix;
    const longDecMultiNoBorrow = longPrefix + ';b' + longSuffix;
    const longDecMultiBorrow = longPrefix + 'z: ' + longSuffix;

    // Benchmarks for writeUInt - short strings
    bench.add('writeUInt - single digit (short)', () => {
        const result = writeUInt(shortSingleWrite, 48, 49, 10);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('writeUInt - multi-digit (short)', () => {
        const result = writeUInt(shortMultiWrite, 48, 50, 100);
        if (result.length === 0) console.log('dummy');
    });

    // Benchmarks for writeUInt - long strings
    bench.add('writeUInt - single digit (long)', () => {
        const result = writeUInt(longSingleWrite, 498, 499, 10);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('writeUInt - multi-digit (long)', () => {
        const result = writeUInt(longMultiWrite, 498, 500, 100);
        if (result.length === 0) console.log('dummy');
    });

    // Benchmarks for incrementUInt - short strings
    bench.add('incrementUInt - single digit no carry (short)', () => {
        const result = incrementUInt(shortIncSingleNoCarry, 48, 49);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('incrementUInt - single digit with carry (short)', () => {
        const result = incrementUInt(shortIncSingleCarry, 48, 49);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('incrementUInt - multi-digit no carry (short)', () => {
        const result = incrementUInt(shortIncMultiNoCarry, 48, 50);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('incrementUInt - multi-digit with carry (short)', () => {
        const result = incrementUInt(shortIncMultiCarry, 48, 50);
        if (result.length === 0) console.log('dummy');
    });

    // Benchmarks for incrementUInt - long strings
    bench.add('incrementUInt - single digit no carry (long)', () => {
        const result = incrementUInt(longIncSingleNoCarry, 498, 499);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('incrementUInt - single digit with carry (long)', () => {
        const result = incrementUInt(longIncSingleCarry, 498, 499);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('incrementUInt - multi-digit no carry (long)', () => {
        const result = incrementUInt(longIncMultiNoCarry, 498, 500);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('incrementUInt - multi-digit with carry (long)', () => {
        const result = incrementUInt(longIncMultiCarry, 498, 500);
        if (result.length === 0) console.log('dummy');
    });

    // Benchmarks for decrementUInt - short strings
    bench.add('decrementUInt - single digit no borrow (short)', () => {
        const result = decrementUInt(shortDecSingleNoBorrow, 48, 49);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('decrementUInt - single digit with borrow (short)', () => {
        const result = decrementUInt(shortDecSingleBorrow, 48, 50);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('decrementUInt - multi-digit no borrow (short)', () => {
        const result = decrementUInt(shortDecMultiNoBorrow, 48, 50);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('decrementUInt - multi-digit with borrow (short)', () => {
        const result = decrementUInt(shortDecMultiBorrow, 48, 51);
        if (result.length === 0) console.log('dummy');
    });

    // Benchmarks for decrementUInt - long strings
    bench.add('decrementUInt - single digit no borrow (long)', () => {
        const result = decrementUInt(longDecSingleNoBorrow, 498, 499);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('decrementUInt - single digit with borrow (long)', () => {
        const result = decrementUInt(longDecSingleBorrow, 498, 500);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('decrementUInt - multi-digit no borrow (long)', () => {
        const result = decrementUInt(longDecMultiNoBorrow, 498, 500);
        if (result.length === 0) console.log('dummy');
    });

    bench.add('decrementUInt - multi-digit with borrow (long)', () => {
        const result = decrementUInt(longDecMultiBorrow, 498, 501);
        if (result.length === 0) console.log('dummy');
    });

    await bench.run();

    console.table(bench.table());
}

runBenchmarks();