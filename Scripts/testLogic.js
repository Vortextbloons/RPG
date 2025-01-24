import { generateWeapon } from "./itemHandling.js";
import { enemy } from "./enemy.js";
// Generates lots of weapons and returns the average stats 

export function averageGearStats (numberOfWeapons) {
    const weaponList = []
    for (let i = 0; i < numberOfWeapons; i++) {
        const weapon = generateWeapon();
        weaponList.push(weapon)
    }
    const averageWeaponStats = {
        averageDamage: (weaponList.reduce((p, c) =>{
            return p + c.stats.damage
        }, 0)/weaponList.length).toFixed(2),
        averageCritChance: (weaponList.reduce((p, c) =>{
            return p + c.stats.crit_chance
        }, 0)/weaponList.length).toFixed(2),
        averageCritDamage: (weaponList.reduce((p, c) =>{
            return p + c.stats.crit_damage
        }, 0)/weaponList.length).toFixed(2),
        averageAttackSpeed: (weaponList.reduce((p, c) =>{
            return p + c.stats.attack_speed
        }, 0)/weaponList.length).toFixed(2),
        averageStatusChance: (weaponList.reduce((p, c) =>{
            return p + c.stats.status_chance
        }, 0)/weaponList.length).toFixed(2),
    }
    console.log(weaponList)
    return averageWeaponStats
}

export function averageEnemyStats(numberOfEnemies, level) {
    const enemyList = [];
    for (let i = 0; i < numberOfEnemies; i++) {
        const temptEnemy = new enemy(level);
        enemyList.push(temptEnemy);
    }
    const averageEnemyStats = {
        averageHealth: (enemyList.reduce((p, c) => p + c.stats.health, 0) / enemyList.length).toFixed(2),
        averageDefense: (enemyList.reduce((p, c) => p + c.stats.defense, 0) / enemyList.length).toFixed(2),
        averageDamage: (enemyList.reduce((p, c) => p + c.stats.damage, 0) / enemyList.length).toFixed(2),
        averageCritChance: (enemyList.reduce((p, c) => p + c.stats.critChance, 0) / enemyList.length).toFixed(2),
        averageCritDamage: (enemyList.reduce((p, c) => p + c.stats.critDamage, 0) / enemyList.length).toFixed(2),
        averaecoineValue: (enemyList.reduce((p, c) => p + c.coinValue, 0) / enemyList.length).toFixed(2),
        averagePercentElite: (enemyList.filter(e => e.isElite).length / enemyList.length).toFixed(2),
        enemyLevel: level,

    };
    return averageEnemyStats;
}
