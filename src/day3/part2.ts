import * as _ from 'lodash';
import { findIntersections } from './part1';

export const main = (wire1: string[], wire2: string[]): number => {
  const intersections = findIntersections(wire1, wire2);

  const distances = _.map(intersections, intersect => intersect[2] + intersect[3]);
  return _.min(distances) || 0;
};
