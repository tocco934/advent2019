import * as _ from 'lodash';

export type InstructionCode = (
  instructions: number[],
  currentPos: number,
  parameterModes: string) => UpdateInstruction | InputInstruction
  | OutputInstruction | PointerUpdateInstruction;

export type UpdateInstruction = {
  execute: () => number[];
  nextInstruction: () => number;
};

export type InputInstruction = {
  execute: (input?: number) => number[];
  nextInstruction: () => number;
};

export type OutputInstruction = {
  execute: () => number;
  nextInstruction: () => number;
};

export type PointerUpdateInstruction = {
  execute: () => number | null;
  nextInstruction: () => number;
};

const getParamModes = (parameterModes: string, expectedLength: number) => {
  const paddedModeString = _.padStart(parameterModes, expectedLength, '0');
  return _.join(_.reverse(_.toArray(paddedModeString)), '');
};

const getPosition = (parameterMode: string, instructions: number[], position: number) => (parameterMode === '0'
  ? instructions[position]
  : position);

// add
const instruction1 = (
  instructions: number[],
  currentPos: number,
  parameterModes: string): UpdateInstruction => ({
    nextInstruction: () => (currentPos + 4),
    execute: () => {
      const splitParameterModes = getParamModes(parameterModes, 3);
      const position1 = getPosition(splitParameterModes[0], instructions, currentPos + 1);
      const position2 = getPosition(splitParameterModes[1], instructions, currentPos + 2);
      const position3 = getPosition(splitParameterModes[2], instructions, currentPos + 3);
      instructions[position3] =
        instructions[position1]
        + instructions[position2];
      return instructions;
    },
  });

// multiply
const instruction2 = (
  instructions: number[],
  currentPos: number,
  parameterModes: string): UpdateInstruction => ({
    nextInstruction: () => (currentPos + 4),
    execute: () => {
      const splitParameterModes = getParamModes(parameterModes, 3);
      const position1 = getPosition(splitParameterModes[0], instructions, currentPos + 1);
      const position2 = getPosition(splitParameterModes[1], instructions, currentPos + 2);
      const position3 = getPosition(splitParameterModes[2], instructions, currentPos + 3);
      instructions[position3] =
        instructions[position1]
        * instructions[position2];
      return instructions;
    },
  });

// save input
const instruction3 = (
  instructions: number[],
  currentPos: number,
  parameterModes: string): InputInstruction => ({
    nextInstruction: () => (currentPos + 2),
    execute: (input) => {
      if (!_.isUndefined(input)) {
        instructions[instructions[currentPos + 1]] = input;
      }
      return instructions;
    },
  });

// output value
const instruction4 = (
  instructions: number[],
  currentPos: number,
  parameterModes: string): OutputInstruction => ({
    nextInstruction: () => (currentPos + 2),
    execute: () => {
      return instructions[instructions[currentPos + 1]];
    },
  });

// update pointer if not 0
const instruction5 = (
  instructions: number[],
  currentPos: number,
  parameterModes: string): PointerUpdateInstruction => ({
    execute: () => {
      const splitParameterModes = getParamModes(parameterModes, 2);
      const position1 = getPosition(splitParameterModes[0], instructions, currentPos + 1);
      if (instructions[position1] !== 0) {
        return instructions[getPosition(splitParameterModes[1], instructions, currentPos + 2)];
      }
      return null;
    },
    nextInstruction: () => (currentPos + 3),
  });

// update pointer if 0
const instruction6 = (
  instructions: number[],
  currentPos: number,
  parameterModes: string): PointerUpdateInstruction => ({
    execute: () => {
      const splitParameterModes = getParamModes(parameterModes, 2);
      const position1 = getPosition(splitParameterModes[0], instructions, currentPos + 1);
      if (instructions[position1] === 0) {
        return instructions[getPosition(splitParameterModes[1], instructions, currentPos + 2)];
      }
      return null;
    },
    nextInstruction: () => (currentPos + 3),
  });

// 1 less than 2 store 1, if not then 0
const instruction7 = (
  instructions: number[],
  currentPos: number,
  parameterModes: string): UpdateInstruction => ({
    execute: () => {
      const splitParameterModes = getParamModes(parameterModes, 3);
      const position1 = getPosition(splitParameterModes[0], instructions, currentPos + 1);
      const position2 = getPosition(splitParameterModes[1], instructions, currentPos + 2);
      const position3 = getPosition(splitParameterModes[2], instructions, currentPos + 3);
      instructions[position3] = instructions[position1] < instructions[position2]
        ? 1
        : 0;
      return instructions;
    },
    nextInstruction: () => (currentPos + 4),
  });

// 1 equal to 2 store 1, if not then 0
const instruction8 = (
  instructions: number[],
  currentPos: number,
  parameterModes: string): UpdateInstruction => ({
    execute: () => {
      const splitParameterModes = getParamModes(parameterModes, 3);
      const position1 = getPosition(splitParameterModes[0], instructions, currentPos + 1);
      const position2 = getPosition(splitParameterModes[1], instructions, currentPos + 2);
      const position3 = getPosition(splitParameterModes[2], instructions, currentPos + 3);
      instructions[position3] = instructions[position1] === instructions[position2]
        ? 1
        : 0;
      return instructions;
    },
    nextInstruction: () => (currentPos + 4),
  });


export function* executeInstructions(instructions: number[], input: number) {
  let updatedInput = _.cloneDeep(instructions);
  let keepGoing = true;
  let currentPos = 0;

  while (keepGoing) {
    const currentInstruction = updatedInput[currentPos];
    const currentInstructString = _.toString(currentInstruction);
    const instructionCode = _.join(_.takeRight(currentInstructString, 2), '');
    const parameterModes = _.replace(currentInstructString, instructionCode, '');

    let instructionType;
    // TODO: if I use classes or interfaces can I switch on those??/
    switch (_.parseInt(instructionCode)) {
      case 1:
        instructionType = instruction1(updatedInput, currentPos, parameterModes);
        updatedInput = instructionType.execute();
        currentPos = instructionType.nextInstruction();
        break;
      case 2:
        instructionType = instruction2(updatedInput, currentPos, parameterModes);
        updatedInput = instructionType.execute();
        currentPos = instructionType.nextInstruction();
        break;
      case 7:
        instructionType = instruction7(updatedInput, currentPos, parameterModes);
        updatedInput = instructionType.execute();
        currentPos = instructionType.nextInstruction();
        break;
      case 8:
        instructionType = instruction8(updatedInput, currentPos, parameterModes);
        updatedInput = instructionType.execute();
        currentPos = instructionType.nextInstruction();
        break;
      case 3:
        instructionType = instruction3(updatedInput, currentPos, parameterModes);
        instructionType.execute(input);
        currentPos = instructionType.nextInstruction();
        break;
      case 4:
        instructionType = instruction4(updatedInput, currentPos, parameterModes);
        yield instructionType.execute();
        currentPos = instructionType.nextInstruction();
        break;
      case 5: {
        instructionType = instruction5(updatedInput, currentPos, parameterModes);
        const newPointer = instructionType.execute();
        currentPos = !_.isNull(newPointer)
          ? newPointer
          : instructionType.nextInstruction();
        break;
      }
      case 6: {
        instructionType = instruction6(updatedInput, currentPos, parameterModes);
        const newPointer = instructionType.execute();
        currentPos = !_.isNull(newPointer)
          ? newPointer
          : instructionType.nextInstruction();
        break;
      }
      case 99:
        keepGoing = false;
        break;
      default:
        keepGoing = false;
        console.log('AHHHH');
        break;
    }
  }
}
