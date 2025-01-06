import { generateWeapon } from "./itemHandling.js";
// Generates lots of weapons and returns the average stats 

export function average_stats(numberOfWeapons) {
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
