import { isValidPassword, main } from './part2';

test('returns true for 112233', () => {
  expect(isValidPassword(0, 1000000, 112233)).toEqual(true);
});

test('returns false for 123444', () => {
  expect(isValidPassword(0, 1000000, 123444)).toEqual(false);
});

test('returns true for 111122', () => {
  expect(isValidPassword(0, 1000000, 111122)).toEqual(true);
});

test('returns 670 for the range 254032-789860', () => {
  expect(main(254032, 789860)).toEqual(670);
});
