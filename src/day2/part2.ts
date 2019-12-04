import * as _ from 'lodash';
import { main as runInstructions, updateArray } from './part1';

export type Day2Part2 = {
  noun: number;
  verb: number;
  equation: number;
};

export const tryNounVerbCombo = (
  input: number[],
  firstPosValue: number,
  noun: number,
  verb: number): boolean => {
  const updatedInput = [...input];
  updatedInput[1] = noun;
  updatedInput[2] = verb;

  return runInstructions(updatedInput) === firstPosValue;
};

export const main = (input: number[], firstPosValue: number): Day2Part2 => {
  let noun = 0;
  let verb = 0;

  let keepGoing = true;
  for (noun = 0; keepGoing; noun += 1) {
    for (verb = 0; keepGoing && verb < 100; verb += 1) {
      keepGoing = !tryNounVerbCombo(input, firstPosValue, noun, verb);
    }
  }

  // correct due to final loop
  noun -= 1;
  verb -= 1;

  return {
    noun,
    verb,
    equation: (100 * noun) + verb,
  };
};
