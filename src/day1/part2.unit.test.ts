import { main } from './part2';
import { input } from './part1';

test('14 mass requires 2 fuel', () => {
  expect(main([14])).toEqual(2);
});

test('1969 mass requires 966 fuel', () => {
  expect(main([1969])).toEqual(966);
});

test('100756 mass requires 50346 fuel', () => {
  expect(main([100756])).toEqual(50346);
});

test('input masses requires x fuel', () => {
  expect(main(input)).toEqual(4736213);
});
