import { enemy } from "./enemy.js";

import { updateBattleLog, updateGoldDisplay, updateHealthDisplay, showBattlePanel } from "./displayScripts.js";

let isBattleInProgress = false;

function hyperbolicFunction(x, rate = 80) {
    return (1 - (rate / (x + rate))).toFixed(4);
}

function calculateDefense(damage, defense) {
    if (typeof damage !== 'number' || typeof defense !== 'number') {
        console.error('Invalid input: damage and defense must be numbers');
        return 0;
    }
    return damage * (1 - Number(hyperbolicFunction(defense)));
}

export function calculateCrits(critChance, critDamage) {
    if (typeof critChance !== 'number' || typeof critDamage !== 'number') {
        console.error('Invalid input: critChance and critDamage must be numbers');
        return { isCrit: false, critTier: 1, critDamage: 0 };
    }

    const chanceToCrit = Math.random() * 100;
    const critTier = Math.floor(critChance / 100) || 1;
    const overFlowCritChance = critChance % 100;

    const critResult = {
        isCrit: false,
        critTier: critTier,
        critDamage: (critDamage * critTier).toFixed(2),
        critInfo: { critChance, critDamage }
    };

    if (critChance > 100) {
        critResult.isCrit = true;
        if (chanceToCrit >= overFlowCritChance) {
            critResult.critTier += 1;
            critResult.critDamage = (critDamage * critResult.critTier).toFixed(2);
        }
    } else if (chanceToCrit <= critChance) {
        critResult.isCrit = true;
    } else {
        critResult.critDamage = (critDamage * (critTier - 1)).toFixed(2);
    }

    return critResult;
}

function fight(attacker, defender, isPlayer) {
 
    let baseDamage = attacker.stats.damage;
    let damage = calculateDefense(baseDamage, defender.stats.defense);
    
    let critInfo = calculateCrits(attacker.stats.critChance, attacker.stats.critDamage);
    if (critInfo.isCrit) {
        damage *= Math.max(1, critInfo.critDamage);
    }

    damage = Number(damage.toFixed(2));
    damage.toFixed(1)
    defender.stats.health -= damage.toFixed(2);
    defender.stats.health.toFixed(2);

    const message = critInfo.isCrit
        ? `${isPlayer ? 'You' : `${attacker.name}`} did ${damage} damage with a crit! (CritTier: ${critInfo.critTier}, CritMultiplier: ${critInfo.critDamage})`
        : `${isPlayer ? 'You' : `${attacker.name}`} did ${damage} damage`;

    updateBattleLog(message);
  


    console.log(message);
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export async function battle(player, enemy) {
    if (isBattleInProgress) {
        updateBattleLog("A battle is already in progress!", "death");
        return false;
    }
    
    isBattleInProgress = true;
    let playerSpeed = player.stats.attackSpeed || 0;
    let enemySpeed = enemy.stats.attackSpeed || 0;
    let startingHealth = player.stats.health;
    
    showBattlePanel(true);
    updateHealthDisplay(player, enemy);
    updateBattleLog(`Battle started! Player Health: ${player.stats.health.toFixed(1)} | Enemy Health: ${enemy.stats.health.toFixed(1)}`);
    
    while (player.stats.health > 0 && enemy.stats.health > 0) {
        await delay(500); // 1 second delay between rounds
        
        if (playerSpeed >= enemySpeed) {
            fight(player, enemy, true);
            updateHealthDisplay(player, enemy);
            if (enemy.stats.health <= 0) break;
            await delay(500); // 0.5 second delay between attacks
            fight(enemy, player, false);
            updateHealthDisplay(player, enemy);
        } else {
            fight(enemy, player, false);
            updateHealthDisplay(player, enemy);
            if (player.stats.health <= 0) break;
            await delay(500); // 0.5 second delay between attacks
            fight(player, enemy, true);
            updateHealthDisplay(player, enemy);
        }
    }

    if (player.stats.health <= 0) {
        const goldLost = Math.floor(player.gold * 0.75);
        player.gold -= goldLost;
        player.stats.health = startingHealth;
        updateBattleLog(`Player has died to ${enemy.name}! Lost ${goldLost} gold!`, 'death');
    } else {
        updateBattleLog(`${enemy.name} has been defeated! Gained ${enemy.coinValue} gold`, 'victory');
        player.gold += enemy.coinValue;
    }
    updateGoldDisplay(player.gold);
    player.stats.health = startingHealth;
    showBattlePanel(false);
    isBattleInProgress = false;
    return true;
}

export function isBattleActive() {
    return isBattleInProgress;
}