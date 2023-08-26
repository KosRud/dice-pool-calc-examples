import * as stats from "dice-pool-calc/stats";
import { Die } from "dice-pool-calc";

/*
  Each player rolls d20+mod
  the attacker must exceed the defender's roll to land a hit
*/

const attackerMod = 3;
const defenderMod = 5;

const d20 = Die.d(20);
const attackerRoll = d20.interpret((outcome) => outcome + attackerMod);
const defenderRoll = d20.interpret((outcome) => outcome + defenderMod);

const combineOpposed = (att: number, def: number) => (att > def ? 1 : 0);
const opposed = Die.pair(combineOpposed, attackerRoll, defenderRoll);

const average = stats.average(opposed);

console.log({ outcomes: opposed.outcomes.toJS(), average });
