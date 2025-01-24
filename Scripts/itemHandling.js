import { randomPart } from "./Util.js";
// Class to lay out the structure of the weapon parts
class Weapon {
    constructor(prefix, name, ending, rarity) {
        this.prefix = prefix;
        this.name = name;
        this.ending = ending;
        this.rarity = rarity;
        this.calculateStats();
    }

    calculateStats() {
        this.weapon_class_stats = {
            damage: Number(((this.prefix.stats.damage + this.name.stats.damage + this.ending.stats.damage) * this.rarity.stats.statMuti).toFixed(2)),
            critChance: Number(((this.prefix.stats.critChance + this.name.stats.critChance + this.ending.stats.critChance) * (this.rarity.stats.statMuti * 0.95)).toFixed(2)),
            critDamage: Number((((this.prefix.stats.critDamage + this.name.stats.critDamage + this.ending.stats.critDamage) * (this.rarity.stats.statMuti * 1.15))).toFixed(2)),
            attackSpeed: Number((this.name.stats.attackSpeed || 0)),
            statusChance: Number(((this.prefix.stats.statusChance + this.name.stats.statusChance + this.ending.stats.statusChance) * this.rarity.stats.statMuti).toFixed(2))
        };
        return this.weapon_class_stats;
    }
}
// Fetches the weapon parts from the JSON files
async function fetchWeaponData() {
    const preFix = await fetch("./JSON Data/weaponJSON/prefix.json")
    const weaponNames = await fetch("./JSON Data/weaponJSON/weaponName.json");
    const endings = await fetch("./JSON Data/weaponJSON/ending.json");
    const rarities = await fetch("./JSON Data/weaponJSON/rarity.json");
    return {
        prefixes: await preFix.json(),
        weapon_names: await weaponNames.json(),
        endings: await endings.json(),
        rarities: await rarities.json()
    };
}
const weaponData = await fetchWeaponData();
// Generates a weapon with random random parts
export function generateWeapon() {
    const items = weaponData;
    const pre_fix = randomPart(items.prefixes.prefixes, 'stats');
    const name = randomPart(items.weapon_names.weapon_names, 'stats');
    const end = randomPart(items.endings.endings, 'stats');
    const rarity = randomPart(items.rarities.rarities, 'stats');
    const weapon = new Weapon(pre_fix.item_value, name.item_value, end.item_value, rarity.item_value);

    const weaponStats = weapon.calculateStats()
    if (weaponStats.critDamage < 1.1) { weaponStats.critDamage = 1.1 }

    return {
        weaponName: `${rarity.call_value} ${pre_fix.call_value} ${name.call_value} ${end.call_value}`,
        stats: weaponStats,
    };
}

