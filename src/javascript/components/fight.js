import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    const firstFighterHealth = document.querySelector('#left-fighter-indicator');
    const secondFighterHealth = document.querySelector('#right-fighter-indicator');
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
  const criticalHitChance = Math.random() + 1;
  const power = fighter.attack * criticalHitChance;
  return power;
}

export function getBlockPower(fighter) {
  // return block power
  const dodgeChance = Math.random() + 1;
  const block = fighter.defense * dodgeChance;
  return block;
}

export function getCriticalHit(fighter) {
  return fighter.attack * 2;
}
