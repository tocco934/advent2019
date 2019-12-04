import * as _ from 'lodash';

export const updateArray = (input: number[]): number[] => {
  const updatedInput = [...input];
  let keepGoing = true;
  for (let i = 0; keepGoing; i = i + 4) {
    switch (updatedInput[i]) {
      case 1:
        updatedInput[updatedInput[i + 3]] = updatedInput[updatedInput[i + 1]]
          + updatedInput[updatedInput[i + 2]];
        break;
      case 2:
        updatedInput[updatedInput[i + 3]] = updatedInput[updatedInput[i + 1]]
          * updatedInput[updatedInput[i + 2]];
        break;
      case 99:
        keepGoing = false;
        break;
    }
  }

  return updatedInput;
};

export const main = (input: number[]): number => {
  return updateArray(input)[0];
};
