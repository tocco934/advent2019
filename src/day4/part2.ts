import * as _ from 'lodash';
import { isWithinRange, isSixDigits, digitsNeverDecrease } from './part1';

const hasAdjacentPair = (valueToCheck: number) => {
  const stringRep = _.toString(valueToCheck);
  return _.reduce(
    stringRep,
    (foundPair, currentVal, i) => {
      if (foundPair || !((i + 1) < stringRep.length)) {
        return foundPair;
      }

      if (stringRep[i] === stringRep[i + 1]) {
        let isStillValid = true;
        // check behind
        if (i !== 0) {
          isStillValid = stringRep[i - 1] !== stringRep[i];
        }

        // check ahead
        if (isStillValid && (i + 2) !== stringRep.length) {
          isStillValid = stringRep[i + 2] !== stringRep[i];
        }
        return isStillValid;
      }
      return foundPair;
    },
    false);
};

export const isValidPassword = (min: number, max: number, valueToCheck: number) =>
  isWithinRange(min, max, valueToCheck)
  && isSixDigits(valueToCheck)
  && hasAdjacentPair(valueToCheck)
  && digitsNeverDecrease(valueToCheck);

const findValidCombos = (start: number, end: number) => {
  const goodNumbers = [];
  for (let i = start; i <= end; i += 1) {
    if (isValidPassword(start, end, i)) {
      goodNumbers.push(i);
    }
  }

  return goodNumbers;
};

export const main = (start: number, end: number) => {
  const goodValues = findValidCombos(start, end);
  return goodValues.length;
};
