import * as stats from "dice-pool-calc/stats";
import { Die } from "dice-pool-calc";
import { List } from "immutable";

// highest 4 from 8d6

const saveHighest4 = (accumulator: List<number>, outcome: number) => {
  const numDice = 4;

  // Inserting a value in a sorted sequence can be done more efficiently.
  // This is kept simple for the sake of example.
  const result = accumulator.push(outcome).sort((a, b) => a - b);

  if (result.count() <= numDice) {
    return result;
  } else {
    return result.splice(0, result.count() - numDice);
  }
};

// highest 4 as sorted array of numbers
const highest4 = Die.pool(saveHighest4, List(), Die.nd(8, 6));

// sum of highest 4
const sumHighest4 = highest4.interpret((outcome) =>
  outcome.reduce((a, b) => a + b, 0)
);

const average = stats.average(sumHighest4);
const median = stats.median(sumHighest4);

console.log({ outcomes: sumHighest4.outcomes.toJS(), average, median });
