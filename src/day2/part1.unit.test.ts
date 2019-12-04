import { main, updateArray } from './part1';
import input from './input';

test('1,0,0,0,99 returns 2', () => {
  expect(updateArray([1, 0, 0, 0, 99])).toEqual([2, 0, 0, 0, 99]);
});

test('2,3,0,3,99 returns 2', () => {
  expect(updateArray([2, 3, 0, 3, 99])).toEqual([2, 3, 0, 6, 99]);
});

test('1,1,1,4,99,5,6,0,99 returns 30', () => {
  expect(updateArray([1, 1, 1, 4, 99, 5, 6, 0, 99])).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
});

test('2,4,4,5,99,0 returns 2', () => {
  expect(updateArray([2, 4, 4, 5, 99, 0])).toEqual([2, 4, 4, 5, 99, 9801]);
});

test('1,9,10,3,2,3,11,0,99,30,40,50 returns 3500', () => {
  expect(updateArray([1, 9, 10, 3, 2, 3, 11, 0, 99, 30, 40, 50]))
    .toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
});

test('input returns 3562672', () => {
  const inputToUse = [...input];
  inputToUse[1] = 12;
  inputToUse[2] = 2;
  expect(main(inputToUse)).toEqual(3562672);
});

test('input returns 19690720', () => {
  const inputToUse = [...input];
  inputToUse[1] = 82;
  inputToUse[2] = 50;
  expect(main(inputToUse)).toEqual(19690720);
});
