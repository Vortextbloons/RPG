import { enemy } from "./enemy.js";
import { player } from "./player.js";
import { updateBattleLog, updateGoldDisplay } from "./displayScripts.js";

function hyperbolicFunction(x, rate = 80) {
    return (1 - (rate / (x + rate))).toFixed(4);
}

function calculateDefense(damage, defense) {

    return damage * (1 - Number(hyperbolicFunction(defense) ));
    
}


export function calculateCrits(critChance, critDamage) {
    let critTier = 1
    const chanceToCrit = Math.random() * 100
    if (critChance > 100) {

        let overFlowCritChance = critChance % 100
        critTier = Number((critChance / 100).toFixed(0))
        if (chanceToCrit >= overFlowCritChance) {
            critTier += 1
            return {
                isCrit: true,
                critTier: critTier,
                critDamage: critDamage * critTier,
                critInfo: {
                    critChance: critChance,
                    critDamage: critDamage
                }
            }
        }
        else if (chanceToCrit < overFlowCritChance) {
            return {
                isCrit: true,
                critTier: critTier,
                critDamage: critDamage * critTier,
                critInfo: {
                    critChance: critChance,
                    critDamage: critDamage
                }
            }
        }

    }
    else if (chanceToCrit <= critChance) {
        return {
            isCrit: true,
            critTier: critTier,
            critDamage: critDamage * critTier,
            critInfo: {
                critChance: critChance,
                critDamage: critDamage
            }
        }
    }
    else if (chanceToCrit > critChance) {
        return {
            isCrit: false,
            critTier: critTier,
            critDamage: critDamage * (critTier - 1),
            critInfo: {
                critChance: critChance,
                critDamage: critDamage
            }
        }
    }
    else {
        console.error("Crit Chance not a number")
    }

}

function fight(attacker, defender, isPlayer) {
  
    let baseDamage = attacker.stats.damage;
    let damage = calculateDefense(baseDamage, defender.stats.defense);
    
    let critInfo = calculateCrits(attacker.stats.critChance, attacker.stats.critDamage);
    if (critInfo.isCrit) {
        damage *= critInfo.critDamage;
    }

    damage = Number(damage.toFixed(2));
    defender.stats.health = Number((defender.stats.health - damage).toFixed(2));

    const message = critInfo.isCrit
        ? `${isPlayer ? 'You' : `${attacker.name}`} did ${damage} damage with a crit of ${critInfo.critTier} with a base `
        : `${isPlayer ? 'You' : `${attacker.name}`} did ${damage} damage`;

    updateBattleLog(message);
    console.log(message);
}

export function battle(player, enemy) {
    let playerSpeed = player.stats.attackSpeed || 0;
    let enemySpeed = enemy.stats.attackSpeed || 0;
    let startingHealth = player.stats.health;
    
    while (player.stats.health > 0 && enemy.stats.health > 0) {
        if (playerSpeed >= enemySpeed) {
            fight(player, enemy, true);
            if (enemy.stats.health <= 0) break;
            fight(enemy, player, false);
        } else {
            fight(enemy, player, false);
            if (player.stats.health <= 0) break;
            fight(player, enemy, true);
        }
    }

    if (player.stats.health <= 0) {
        const goldLost = Math.floor(player.gold * 0.75); // Lose 75% of gold
        player.gold -= goldLost;
        player.stats.health = startingHealth; // Restore health
        updateBattleLog(`Player has died to ${enemy.name}! Lost ${goldLost} gold!`, 'death');
    } else {
        updateBattleLog(`${enemy.name} has been defeated! Gained ${enemy.coinValue} gold`, 'victory');
        player.gold += enemy.coinValue;
    }
    updateGoldDisplay(player.gold);
    return true; // Always return true since game continues
}