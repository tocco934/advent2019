import { isValidPassword, main } from './part1';

test('returns true for 122345', () => {
  expect(isValidPassword(0, 1000000, 122345)).toEqual(true);
});

test('returns true for 111123', () => {
  expect(isValidPassword(0, 1000000, 111123)).toEqual(true);
});

test('returns false for 135679', () => {
  expect(isValidPassword(0, 1000000, 135679)).toEqual(false);
});

test('returns true for 111111', () => {
  expect(isValidPassword(0, 1000000, 111111)).toEqual(true);
});

test('returns false for 223450', () => {
  expect(isValidPassword(0, 1000000, 223450)).toEqual(false);
});

test('returns false for 123789', () => {
  expect(isValidPassword(0, 1000000, 123789)).toEqual(false);
});

test('returns 1033 for the range 254032-789860', () => {
  expect(main(254032, 789860)).toEqual(1033);
});
