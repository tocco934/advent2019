import { executeInstructions } from './executeInstructions';

export const main = (instructions: number[], input: number): number => {
  let lastValue: number = 0;
  for (const output of executeInstructions(instructions, input)) {
    console.log('Output', output);
    lastValue = output;
  }
  return lastValue;
};
