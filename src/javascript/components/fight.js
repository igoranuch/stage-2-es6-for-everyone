import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    const firstFighterHealth = document.querySelector('#left-fighter-indicator');
    const secondFighterHealth = document.querySelector('#right-fighter-indicator');

    const firstFighterInstance = {
      healthPercent: 100 / firstFighter.health,
      health: firstFighter.health,
      crit: true
    };

    const secondFighterInstance = {
      healthPercent: 100 / secondFighter.health,
      health: secondFighter.health,
      crit: true
    };

    let keysPressed = {};
    let isFight = true;

    document.addEventListener('keyup', (event) => {
      delete keysPressed[event.code];
    });

    document.addEventListener('keydown', (event) => {
      keysPressed[event.code] = true;

      if (isFight) {
        if (!keysPressed[controls.PlayerTwoBlock]) {
          if (event.code == controls.PlayerOneAttack && !event.repeat && !keysPressed[controls.PlayerOneBlock]) {
            secondFighterInstance.health -= getDamage(firstFighter, secondFighter);
            secondFighterHealth.style.width = secondFighterInstance.health * secondFighterInstance.healthPercent + '%';
          }
        }

        if (!keysPressed[controls.PlayerOneBlock]) {
          if (event.code == controls.PlayerTwoAttack && !event.repeat && !keysPressed[controls.PlayerTwoBlock]) {
            firstFighterInstance.health -= getDamage(secondFighter, firstFighter);
            firstFighterHealth.style.width = firstFighterInstance.health * firstFighterInstance.healthPercent + '%';
          }
        }

        if (
          controls.PlayerOneCriticalHitCombination.every((key) => keysPressed.hasOwnProperty(key)) &&
          !event.repeat &&
          !keysPressed[controls.PlayerOneBlock] &&
          firstFighterInstance.crit
        ) {
          secondFighterInstance.health -= getCriticalHit(firstFighter);
          secondFighterHealth.style.width = secondFighterInstance.health * secondFighterInstance.healthPercent + '%';
          firstFighterInstance.crit = false;
          setTimeout(() => {
            firstFighterInstance.crit = true;
          }, 10000);
        }

        if (
          controls.PlayerTwoCriticalHitCombination.every((key) => keysPressed.hasOwnProperty(key)) &&
          !event.repeat &&
          !keysPressed[controls.PlayerTwoBlock] &&
          secondFighterInstance.crit
        ) {
          firstFighterInstance.health -= getCriticalHit(secondFighter);
          firstFighterHealth.style.width = firstFighterInstance.health * firstFighterInstance.healthPercent + '%';
          secondFighterInstance.crit = false;
          setTimeout(() => {
            secondFighterInstance.crit = true;
          }, 10000);
        }

        if (firstFighterInstance.health <= 0) {
          firstFighterHealth.style.width = 0 + '%';
          isFight = false;
          resolve(secondFighter);
        }

        if (secondFighterInstance.health <= 0) {
          secondFighterHealth.style.width = 0 + '%';
          isFight = false;
          resolve(firstFighter);
        }
      }
    });
  });
}

export function getDamage(attacker, defender) {
  // return damage
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage > 0 ? damage : 0;
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
  // return critical hit power
  return fighter.attack * 2;
}
