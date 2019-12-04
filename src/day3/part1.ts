import * as _ from 'lodash';

type PathMap = {
  [key: string]: {
    [key: string]: string,
  },
};

const goRight = (x: number, y: number) => ([x + 1, y]);
const goLeft = (x: number, y: number) => ([x - 1, y]);
const goUp = (x: number, y: number) => ([x, y + 1]);
const goDown = (x: number, y: number) => ([x, y - 1]);

const updateMap = (
  pathMap: PathMap, startingX: number, startingY: number,
  steps: number, stepFunc: Function, checkFn: Function, flag: string) => {

  let x = startingX;
  let y = startingY;
  const coordsToSave: number[][] = [];

  const updatedMap = _.cloneDeep(pathMap);
  for (let i = steps; i > 0; i -= 1) {
    [x, y] = stepFunc(x, y);

    if (!updatedMap[x.toString()]) {
      updatedMap[x.toString()] = {};
    }
    if (checkFn(updatedMap[x.toString()][y.toString()])) {
      coordsToSave.push([x, y]);
    }
    updatedMap[x.toString()][y.toString()] = flag;
  }

  return {
    coordsToSave,
    pathMap: updatedMap,
    endingX: x,
    endingY: y,
  };
};

const executeWire = (
  startingMap: PathMap, instructions: string[],
  checkFn: Function, flag: string) => {
  let x = 0;
  let y = 0;

  let pathMap = _.cloneDeep(startingMap);
  let coordsToSave: number[][] = [];

  _.forEach(instructions, (instruction: string) => {
    let instructionFunc: Function = goRight;
    let steps = 0;

    if (_.startsWith(instruction, 'R')) {
      steps = _.parseInt(_.replace(instruction, 'R', ''));
      instructionFunc = goRight;
    } else if (_.startsWith(instruction, 'L')) {
      steps = _.parseInt(_.replace(instruction, 'L', ''));
      instructionFunc = goLeft;
    } else if (_.startsWith(instruction, 'U')) {
      steps = _.parseInt(_.replace(instruction, 'U', ''));
      instructionFunc = goUp;
    } else if (_.startsWith(instruction, 'D')) {
      steps = _.parseInt(_.replace(instruction, 'D', ''));
      instructionFunc = goDown;
    }

    const instructionResult = updateMap(pathMap, x, y, steps, instructionFunc, checkFn, flag);
    pathMap = instructionResult.pathMap;
    x = instructionResult.endingX;
    y = instructionResult.endingY;
    if (!_.isEmpty(instructionResult.coordsToSave)) {
      coordsToSave = _.concat(coordsToSave, instructionResult.coordsToSave);
    }
  });

  return { pathMap, coordsToSave };
};

const calculateDistanceFromStart = (x: number, y: number): number => Math.abs(x) + Math.abs(y);

export const main = (wire1: string[], wire2: string[]) => {
  const wire1Result = executeWire({}, wire1, () => false, 'FIRST');

  const checkFn = (flag?: string) => (flag === 'FIRST');
  const wire2Result = executeWire(wire1Result.pathMap, wire2, checkFn, 'SECOND');

  const distances = _.map(wire2Result.coordsToSave, ([x, y]) => calculateDistanceFromStart(x, y));
  return _.min(distances) || 0;
};
