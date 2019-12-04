import { main, Day2Part2 } from './part2';
import input from './input';

test('looking for 19690720 returns the noun x and verb y and formula result z', () => {
  const result: Day2Part2 = main(input, 19690720);
  expect(result).toEqual({
    noun: 82,
    verb: 50,
    equation: 8250,
  });
});
