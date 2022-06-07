import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
  });
}

export function getDamage(attacker, defender) {
  // return damage
  if (getHitPower(attacker) <= getBlockPower(defender)) {
    return 0;
  } else return getHitPower(attacker) - getBlockPower(defender);
}

export function getHitPower(fighter) {
  // return hit power
  return fighter.attack;
}

export function getBlockPower(fighter) {
  // return block power
  return fighter.defense;
}
