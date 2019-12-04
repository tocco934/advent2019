import * as _ from 'lodash';

type PathVisit = {
  flag: string;
  steps: number;
};

type PathMap = {
  [key: string]: {
    [key: string]: PathVisit,
  },
};

const goRight = (x: number, y: number) => ([x + 1, y]);
const goLeft = (x: number, y: number) => ([x - 1, y]);
const goUp = (x: number, y: number) => ([x, y + 1]);
const goDown = (x: number, y: number) => ([x, y - 1]);

const updateMap = (
  pathMap: PathMap, startingX: number, startingY: number, totalSteps: number,
  steps: number, stepFunc: Function, checkFn: Function, flag: string) => {

  let x = startingX;
  let y = startingY;
  const coordsToSave: number[][] = [];

  // tslint:disable-next-line: max-line-length
  // TODO: cloneDeep makes this take forever so I removed it... but that's not following best practices
  // TODO: look at immutable.js ?
  const updatedMap = pathMap;
  for (let i = 1; i <= steps; i += 1) {
    [x, y] = stepFunc(x, y);

    if (!updatedMap[x.toString()]) {
      updatedMap[x.toString()] = {};
    }

    const spotVisiting = updatedMap[x.toString()][y.toString()];
    if (checkFn(spotVisiting)) {
      coordsToSave.push([x, y, spotVisiting.steps, totalSteps + i]);
    }

    if (!spotVisiting || spotVisiting.flag !== flag) {
      updatedMap[x.toString()][y.toString()] = { flag, steps: totalSteps + i };
    }
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

  let pathMap = startingMap;
  let coordsToSave: number[][] = [];
  let totalSteps = 0;

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

    const instructionResult = updateMap(
      pathMap, x, y, totalSteps,
      steps, instructionFunc, checkFn, flag);
    pathMap = instructionResult.pathMap;
    x = instructionResult.endingX;
    y = instructionResult.endingY;
    totalSteps += steps;
    if (!_.isEmpty(instructionResult.coordsToSave)) {
      coordsToSave = _.concat(coordsToSave, instructionResult.coordsToSave);
    }
  });

  return { pathMap, coordsToSave };
};

const calculateDistanceFromStart = (x: number, y: number): number => Math.abs(x) + Math.abs(y);

export const findIntersections = (wire1: string[], wire2: string[]) => {
  const wire1Result = executeWire({}, wire1, () => false, 'FIRST');

  const checkFn = (visit?: { flag: string }) => (visit && visit.flag === 'FIRST');
  const wire2Result = executeWire(wire1Result.pathMap, wire2, checkFn, 'SECOND');

  return wire2Result.coordsToSave;
};

export const main = (wire1: string[], wire2: string[]): number => {
  const intersectionCoords = findIntersections(wire1, wire2);

  const distances = _.map(intersectionCoords, ([x, y]) => calculateDistanceFromStart(x, y));
  return _.min(distances) || 0;
};
