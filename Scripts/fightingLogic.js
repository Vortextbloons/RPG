import { updateBattleLog, updateGoldDisplay } from "./displayScripts.js";
import { GAME_CONFIG } from './gameConfig.js';
import { initializeLevelSelector } from "./displayScripts.js";


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
    // Process turn start effects
    let messages = [];
    attacker.activeEffects?.forEach(effect => {
        const msg = effect.onTurnStart(attacker);
        if (msg) messages.push(msg);
    });

    let baseDamage = attacker.stats.damage;
    
    // Pre-damage effects
    attacker.activeEffects?.forEach(effect => {
        baseDamage = effect.onPreDamage(attacker, defender, baseDamage);
    });

    let damage = calculateDefense(baseDamage, defender.stats.defense);
    
    let critInfo = calculateCrits(attacker.stats.critChance, attacker.stats.critDamage);
    if (critInfo.isCrit) {
        damage *= Math.max(1, critInfo.critDamage);
    }

    damage = Number(damage.toFixed(2));
    defender.stats.health = Math.max(0, defender.stats.health - damage);

    // Post-damage effects
    defender.activeEffects?.forEach(effect => {
        const msg = effect.onPostDamage(attacker, defender, damage);
        if (msg) messages.push(msg);
    });

    // Process turn end effects
    attacker.activeEffects?.forEach(effect => {
        const msg = effect.onTurnEnd(attacker);
        if (msg) messages.push(msg);
    });

    // Update effect durations
    attacker.updateEffects?.();
    defender.updateEffects?.();

    const damageMessage = critInfo.isCrit
        ? `${isPlayer ? 'You' : `${attacker.name}`} did ${damage} damage with a crit! (CritTier: ${critInfo.critTier}, CritMultiplier: ${critInfo.critDamage})`
        : `${isPlayer ? 'You' : `${attacker.name}`} did ${damage} damage`;

    updateBattleLog(damageMessage);
    messages.forEach(msg => updateBattleLog(msg));
}

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateHealthDisplay(attacker, defender, isPlayer) {
    const playerHealth = document.querySelector('.player-health');
    const enemyHealth = document.querySelector('.enemy-health');
    const playerText = document.querySelector('.player-stats .health-text');
    const enemyText = document.querySelector('.enemy-stats .health-text');

    // Calculate health percentages
    const playerPercent = Math.max(0, (attacker.stats.health / attacker.stats.maxHealth) * 100);
    const enemyPercent = Math.max(0, (defender.stats.health / defender.stats.maxHealth) * 100);

    // Update health bars
    playerHealth.style.width = `${playerPercent}%`;
    enemyHealth.style.width = `${enemyPercent}%`;

    // Update health text with non-negative values
    playerText.textContent = `${Math.max(0, Math.ceil(attacker.stats.health))} / ${attacker.stats.maxHealth}`;
    enemyText.textContent = `${Math.max(0, Math.ceil(defender.stats.health))} / ${defender.stats.maxHealth}`;

    // Add color transitions based on health percentage
    playerHealth.style.background = `linear-gradient(90deg, 
        ${playerPercent > 50 ? '#2ecc71' : '#e67e22'}, 
        ${playerPercent > 50 ? '#27ae60' : '#d35400'})`;
    
    enemyHealth.style.background = `linear-gradient(90deg, 
        ${enemyPercent > 50 ? '#e74c3c' : '#c0392b'}, 
        ${enemyPercent > 50 ? '#c0392b' : '#962b22'})`;

    // Add animation when health changes
    playerHealth.parentElement.classList.add('health-changed');
    enemyHealth.parentElement.classList.add('health-changed');
    
    setTimeout(() => {
        playerHealth.parentElement.classList.remove('health-changed');
        enemyHealth.parentElement.classList.remove('health-changed');
    }, 300);
}

export async function battle(player, enemy) {

    let battlePlayer = {
        ...player,
        stats: { ...player.stats }
    };
    let battleEnemy = {
        ...enemy,
        stats: { ...enemy.stats }
    };
    if (isBattleInProgress) {
        updateBattleLog("A battle is already in progress!", "death");
        return false;
    }
    
    isBattleInProgress = true;
    let playerSpeed = battlePlayer.stats.attackSpeed || 0;
    let enemySpeed = battleEnemy.stats.attackSpeed || 0;
   
    
    updateBattleLog(`Battle started! Player Health: ${player.stats.health.toFixed(1)} | Enemy Health: ${enemy.stats.health.toFixed(1)}`);
    
    const config = GAME_CONFIG.battle;
    await delay(config.animations.attackDelay);
    
    // Show health bars at battle start
    const battleStats = document.querySelector('.battle-stats');
    battleStats.classList.remove('hidden');
    battleStats.classList.add('visible');
    
    // Store initial max health
    battlePlayer.stats.maxHealth = battlePlayer.stats.health;
    battleEnemy.stats.maxHealth = battleEnemy.stats.health;
    
    // Initial health display
    updateHealthDisplay(battlePlayer, battleEnemy);

    while (battlePlayer.stats.health > 0 && battleEnemy.stats.health > 0) {
        await delay(500);
        
        if (playerSpeed <= enemySpeed) {
            fight(battlePlayer, battleEnemy, true);
            if (battleEnemy.stats.health <= 0) break;
            await delay(500);
            fight(battleEnemy, battlePlayer, false);
        } else {
            fight(battleEnemy, battlePlayer, false);
            if (battlePlayer.stats.health <= 0) break;
            await delay(500);
            fight(battlePlayer, battleEnemy, true);
        }
        updateHealthDisplay(battlePlayer, battleEnemy);
    }

    if (battlePlayer.stats.health <= 0) {
        const goldLost = Math.floor(player.gold * config.enemyScaling.goldLossOnDeath);
        player.gold -= goldLost
        player.gold.toFixed(2)
        updateBattleLog(`Player has died to ${enemy.name}! Lost ${goldLost} gold!`, 'death');
        
    } else {
        player.unlockedData.unlockedLevel = Math.max(player.unlockedData.unlockedLevel, enemy.level + 1);
        updateBattleLog(`${enemy.name} has been defeated! Gained ${enemy.coinValue} gold`, 'victory');
        player.gold += enemy.coinValue;
        initializeLevelSelector(enemy.level, player)
    }
    
    updateGoldDisplay(player.gold);
    
    setTimeout(() => {
        battleStats.classList.remove('visible');
        battleStats.classList.add('hidden');
    }, 300);
    
    isBattleInProgress = false;
    return true;
}

export function isBattleActive() {
    return isBattleInProgress;
}

