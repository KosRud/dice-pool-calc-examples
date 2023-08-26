import * as stats from "dice-pool-calc/stats";
import { Die } from "dice-pool-calc";

// 3d4 + 2d6 + 1d8

const sumDice = (accumulator: number, outcome: number) => accumulator + outcome;

const dice = Die.nd(3, 4).concat(Die.nd(2, 6), Die.nd(1, 8));

const sumPool = Die.pool(sumDice, 0, dice);

const average = stats.average(sumPool);
const median = stats.median(sumPool);

console.log({ outcomes: sumPool.outcomes.toJSON(), average, median });
