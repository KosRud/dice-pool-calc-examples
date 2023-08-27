import * as stats from "dice-pool-calc/stats";
import { Die } from "dice-pool-calc";
import { Repeat } from "immutable";

// 3d6, each die explodes on 5+
// maximum 2 explosions per die

const numDice = 3;
const maxExplosions = 2;
const explodesOn = 5;

const makeExplodingDie = (
  numSides: number,
  maxExplosions: number,
  explodesOn: number
): Die<number> => {
  return Die.d(numSides).reroll((outcome) => {
    if (maxExplosions == 0) {
      return Die.d(numSides);
    }

    if (outcome >= explodesOn) {
      return makeExplodingDie(
        numSides,
        maxExplosions - 1,
        explodesOn
      ).interpret((newOutcome) => newOutcome + outcome);
    }

    // if the die did not explore
    // return a new die which always rolls the same outcome
    return Die.singleOutcome(outcome);
  });
};
const explodingDie = makeExplodingDie(6, maxExplosions, explodesOn);

const sumDice = (accumulator: number, outcome: number) => accumulator + outcome;
const sumPool = Die.pool(sumDice, 0, Repeat(explodingDie, numDice));

const average = stats.average(sumPool);
const median = stats.median(sumPool);

console.log({ outcomes: sumPool.outcomes.toJS(), average, median });
