import { randomPart } from "./Util.js";
const BASE_PATH = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1"
    ? "."
    : "/RPG";

async function fetchAmrorData() {
    const preFix = await fetch(`${BASE_PATH}/JSON Data/ItemJSON/ArmorJSON/amorSetPrefix.json`);
    const endings = await fetch(`${BASE_PATH}/JSON Data/ItemJSON/ArmorJSON/amorSetEnding.json`);
    const rarities = await fetch(`${BASE_PATH}/JSON Data/ItemJSON/rarity.json`);
    const helmet = await fetch(`${BASE_PATH}/JSON Data/ItemJSON/ArmorJSON/helmets.json`);
    const chestplate = await fetch(`${BASE_PATH}/JSON Data/ItemJSON/ArmorJSON/chestplates.json`);
    const leggings = await fetch(`${BASE_PATH}/JSON Data/ItemJSON/ArmorJSON/leggings.json`);
    const boots = await fetch(`${BASE_PATH}/JSON Data/ItemJSON/ArmorJSON/boots.json`);
    return {
        prefixes: await preFix.json(),
        endings: await endings.json(),
        rarities: await rarities.json(),
        typesOfArmor: {
            helmets: await helmet.json(),
            chestplates: await chestplate.json(),
            leggings: await leggings.json(),
            boots: await boots.json()
        }

    };
}
const amrorData = await fetchAmrorData();

class Armor {
    
    constructor(amrorPrefix, amrorEnding, main, rarity) {
     
        if(main === "none"){
            throw new Error("Armor type not specified");
        }

        this.amrorPrefix = amrorPrefix;
        this.armorMain = main;
        this.amrorEnding = amrorEnding;
        this.rarity = rarity;
        this.calculateStats();
       
    }
    
    calculateStats(){
        this.armorStats = {
            health: Number((this.armorMain.stats.health * (this.amrorPrefix.stats.health * this.amrorEnding.stats.health) * this.rarity.stats.statMuti).toFixed(2)) || 0,
            defense: Number((this.armorMain.stats.defense * (this.amrorPrefix.stats.defense * this.amrorEnding.stats.defense) * this.rarity.stats.statMuti).toFixed(2)) || 0,
            damage: Number((this.armorMain.stats.damage * (this.amrorPrefix.stats.damage * this.amrorEnding.stats.damage) * this.rarity.stats.statMuti).toFixed(2)) || 0,
            critChance: Number((this.armorMain.stats.critChance * (this.amrorPrefix.stats.critChance * this.amrorEnding.stats.critChance) * this.rarity.stats.statMuti).toFixed(2)) || 0,
            critDamage: Number((this.armorMain.stats.critDamage * (this.amrorPrefix.stats.critDamage * this.amrorEnding.stats.critDamage) * this.rarity.stats.statMuti).toFixed(2)) || 0,
            statusChance: Number((this.armorMain.stats.statusChance * (this.amrorPrefix.stats.statusChance * this.amrorEnding.stats.statusChance) * this.rarity.stats.statMuti).toFixed(2)) || 0
        };
        return this.armorStats;
    }
}
export function generateArmor(){
    const items = amrorData
    let type = "none"
    const randomPiece = Math.floor(Math.random() * 4) + 1
    if(randomPiece === 1){
         type = "helmets";
    }
    else if(randomPiece === 2){
        type = "chestplates";
    }
    else if(randomPiece === 3){
         type = "leggings";
    }
    else if(randomPiece === 4){
        type = "boots";
    }
    else{
        console.error("Armor piece not found");
    }
    console.log(type)
    const prefix = randomPart(items.prefixes.prefixes, 'stats');
    const ending = randomPart(items.endings.endings, 'stats');
    const rarity = randomPart(items.rarities.rarities, 'stats');
    const armorType = items.typesOfArmor[type];
    console.log(type)
    const armorName = randomPart(armorType[type], 'stats');
    console.log(armorName)
    const armor = new Armor(prefix.item_value, ending.item_value, armorName.item_value, rarity.item_value);
  
    return {
        armorType: String(type),
        name: `${rarity.call_value} ${prefix.call_value} ${armorName.call_value} ${ending.call_value}`,
        stats: armor.armorStats
    };

}

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
            health: Number((this.name.stats.health * (this.prefix.stats.health * this.ending.stats.health) * this.rarity.stats.statMuti).toFixed(2)),
            defense: Number((this.name.stats.defense * (this.prefix.stats.defense * this.ending.stats.defense) * this.rarity.stats.statMuti).toFixed(2)),
            damage: Number((this.name.stats.damage * (this.prefix.stats.damage * this.ending.stats.damage) * this.rarity.stats.statMuti).toFixed(2)),
            critChance: Number((this.name.stats.critChance * (this.prefix.stats.critChance * this.ending.stats.critChance) * (this.rarity.stats.statMuti)).toFixed(2)),
            critDamage: Number((this.name.stats.critDamage * (this.prefix.stats.critDamage * this.ending.stats.critDamage) * (this.rarity.stats.statMuti * .8)).toFixed(2)),
            attackSpeed: Number((this.name.stats.attackSpeed || 0)),
            statusChance: Number((this.name.stats.statusChance * (this.prefix.stats.statusChance * this.ending.stats.statusChance) * this.rarity.stats.statMuti).toFixed(2))
        };
  
        return this.weapon_class_stats;
    }
}

async function fetchWeaponData() {
    const preFix = await fetch(`${BASE_PATH}/JSON Data/itemJSON/weaponJSON/prefix.json`);
    const weaponNames = await fetch(`${BASE_PATH}/JSON Data/itemJSON/weaponJSON/weaponName.json`);
    const endings = await fetch(`${BASE_PATH}/JSON Data/itemJSON/weaponJSON/ending.json`);
    const rarities = await fetch(`${BASE_PATH}/JSON Data/itemJSON/rarity.json`);
    return {
        prefixes: await preFix.json(),
        weapon_names: await weaponNames.json(),
        endings: await endings.json(),
        rarities: await rarities.json()
    };
}
const weaponData = await fetchWeaponData();
export function generateWeapon() {
    const items = weaponData;
    const pre_fix = randomPart(items.prefixes.prefixes, 'stats');
    const name = randomPart(items.weapon_names.weapon_names, 'stats');
    const end = randomPart(items.endings.endings, 'stats');
    const rarity = randomPart(items.rarities.rarities, 'stats');
    const weapon = new Weapon(pre_fix.item_value, name.item_value, end.item_value, rarity.item_value);

    if (weapon.weapon_class_stats.critDamage < 1.1) {
        weapon.weapon_class_stats.critDamage = 1.1;
    }

    return {
        name: `${rarity.call_value} ${pre_fix.call_value} ${name.call_value} ${end.call_value}`,
        stats: weapon.weapon_class_stats,
    };
}

