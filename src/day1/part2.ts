import * as _ from 'lodash';
import { input, calculateFuelNeeded } from './part1';

const calculateFuel = (mass: number): number => {
  const total = calculateFuelNeeded(mass);
  return total === 0
    ? total
    : total + calculateFuel(total);
};

export const main = (masses?: number[]): number => {
  const startingMasses = masses || input;
  const massTotals = _.map(startingMasses, i => calculateFuel(i));
  const total = _.sum(massTotals);
  return total;
};

// main();
