import { main } from './part2';
import input from './input';

test('1002, 6, 3, 6, 4, 6, 33 produces 99', () => {
  expect(main([1002, 6, 3, 6, 4, 6, 33], 0)).toEqual(99);
});

test('returns 1 because input is equal to 8', () => {
  expect(main([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 8)).toEqual(1);
});

test('returns 0 because input is not equal to 8', () => {
  expect(main([3, 9, 8, 9, 10, 9, 4, 9, 99, -1, 8], 7)).toEqual(0);
});

test('retuns 1 because the input is less than 8', () => {
  expect(main([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], 7)).toEqual(1);
});

test('retuns 0 because the input is not less than 8', () => {
  expect(main([3, 9, 7, 9, 10, 9, 4, 9, 99, -1, 8], 10)).toEqual(0);
});


// 3, 3, 1108, -1, 8, 3, 4, 3, 99 - Using immediate mode, consider whether the input is equal to 8; output 1(if it is) or 0(if it is not).
// 3, 3, 1107, -1, 8, 3, 4, 3, 99 - Using immediate mode, consider whether the input is less than 8; output 1(if it is) or 0(if it is not).

test('given input returns x as the last value', () => {
  expect(main(input, 5)).toEqual(3508186);
});
