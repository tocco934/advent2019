import { main } from './part1';
import input from './input';

test('1002, 6, 3, 6, 4, 6, 33 produces 99', () => {
  expect(main([1002, 6, 3, 6, 4, 6, 33], 0)).toEqual(99);
});

test('given input returns x as the last value', () => {
  expect(main(input, 1)).toEqual(12234644);
});
