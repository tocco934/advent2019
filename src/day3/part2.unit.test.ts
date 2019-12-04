import { main } from './part2';
import { wire1, wire2 } from './input';

test('should say the minimum sum of the steps to the intersection is 610', () => {
  const wire1Input = ['R75', 'D30', 'R83', 'U83', 'L12', 'D49', 'R71', 'U7', 'L72'];
  const wire2Input = ['U62', 'R66', 'U55', 'R34', 'D71', 'R55', 'D58', 'R83'];

  expect(main(wire1Input, wire2Input)).toEqual(610);
});

test('should say the minimum sum of the steps to the intersection is 410', () => {
  const wire1Instruct = ['R98', 'U47', 'R26', 'D63', 'R33', 'U87', 'L62', 'D20', 'R33', 'U53', 'R51'];
  const wire2Instruct = ['U98', 'R91', 'D20', 'R16', 'D67', 'R40', 'U7', 'R15', 'U6', 'R7'];

  expect(main(wire1Instruct, wire2Instruct)).toEqual(410);
});

test('returns something given the actual input', () => {
  expect(main(wire1, wire2)).toEqual(112316);
});
