import * as _ from 'lodash';

export const isWithinRange = (min: number, max: number, valueToCheck: number): boolean =>
  _.inRange(valueToCheck, min, max + 1);

export const isSixDigits = (valueToCheck: number): boolean =>
  _.inRange(valueToCheck, 100000, 1000000);

export const hasAdjacentPair = (valueToCheck: number) => {
  const stringRep = _.toString(valueToCheck);
  return _.reduce(
    stringRep,
    (foundPair, currentVal, i) => {
      if (foundPair || !((i + 1) < stringRep.length)) {
        return foundPair;
      }

      return stringRep[i] === stringRep[i + 1];
    },
    false);
};

export const digitsNeverDecrease = (valueToCheck: number) => {
  const stringRep = _.toString(valueToCheck);

  return _.reduce(
    stringRep,
    (isGood, currentVal, i) => {
      if (!isGood || i === 0) {
        return isGood;
      }

      return _.parseInt(stringRep[i]) >= _.parseInt(stringRep[i - 1]);
    },
    true);
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
