import * as stats from "dice-pool-calc/stats";
import { Die } from "dice-pool-calc";

// Count rolls of 5 or higher in a pool of 12d6

const countSuccess = (accumulator: number, outcome: number) => {
  if (outcome >= 5) {
    accumulator++;
  }
  return accumulator;
};

const successPool = Die.pool(countSuccess, 0, Die.nd(12, 6));

const average = stats.average(successPool);
const median = stats.median(successPool);

console.log({ outcomes: successPool.outcomes.toJS(), average, median });
