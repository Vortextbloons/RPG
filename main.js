import { randomPart, update_display, update_display_muti, add_event_listener, pick_Weighted_Item } from "./Scripts/Util.js";
console.log("Main loaded");
class Item {
    constructor(name, weight, element = null, stats = {}) {
        this.name = name;
        this.weight = weight;
        this.element = element;
        this.stats = stats;
    }
}

class player {
    constructor(item = "None") {
        this.gold = 0
        this.stats = {
            Health: 100,
            Defense: 0,
            Damage: 0,
            Crit_Chance: 0,
            Crit_Damage: 0,
            AttackSpeed: 1,
            Element: 'None',
        }

        this.inventory = []
    }

    addItemStats(item) {
        this.stats = {
            Health: this.stats.Health + (item.stats.Health || 0),
            Defense: this.stats.Defense + (item.stats.Defense || 0),
            Damage: this.stats.Damage + (item.stats.Damage || 0),
            Crit_Chance: this.stats.Crit_Chance + (item.stats.Crit_Chance || 0),
            Crit_Damage: this.stats.Crit_Damage + (item.stats.Crit_Damage || 0),
            AttackSpeed: this.stats.AttackSpeed + (item.stats.AttackSpeed || 0),
            Element: this.stats.Element + (item.stats.Element || 'None'),
        };
    }

    addInventory(item) {
        if (item === "None") {
            console.error("No item to add")
            return
        }
        this.inventory.push(item);
        this.addItemStats(item);
    }

    addGold(amount) {
        this.gold += amount;
        this.updateGoldDisplay();
    }

    deductGold(amount) {
        if (this.gold >= amount) {
            this.gold -= amount;
            this.updateGoldDisplay();
            return true;
        } else {
            console.error("Not enough gold");
            return false;
        }
    }

    updateGoldDisplay() {
        const goldDisplay = document.getElementById('gold_display');
        goldDisplay.textContent = `Gold: ${this.gold}`;
    }
}

const Player = new player();
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
            damage: parseFloat(((this.prefix.stats.damage + this.name.stats.damage + this.ending.stats.damage) * this.rarity.stats.stat_muti).toFixed(2)),
            crit_chance: parseFloat(((this.prefix.stats.Crit_chance + this.name.stats.Crit_chance + this.ending.stats.Crit_chance) * this.rarity.stats.stat_muti + 1).toFixed(2)),
            crit_damage: parseFloat((((this.prefix.stats.Crit_damage + this.name.stats.Crit_damage + this.ending.stats.Crit_damage) * this.rarity.stats.stat_muti)).toFixed(2)),
            attack_speed: parseFloat((this.name.stats.attack_speed).toFixed(2)),
            status_chance: parseFloat(((this.prefix.stats.Status_chance + this.name.stats.Status_chance + this.ending.stats.Status_chance) * this.rarity.stats.stat_muti).toFixed(2)),
        };
        return this.weapon_class_stats;
    }
}
// Fetching weapon Data
async function fetchWeaponData() {
    const preFix = await fetch("./JSON Data/Prefix.json");
    const weaponNames = await fetch("./JSON Data/Weapon Names.json");
    const endings = await fetch("./JSON Data/Endings.json");
    const rarities = await fetch("./JSON Data/Rarity.json");
    return {
        prefixes: await preFix.json(),
        weapon_names: await weaponNames.json(),
        endings: await endings.json(),
        rarities: await rarities.json()
    };
}

const weaponData = await fetchWeaponData();
function generateWeapon() {
    const items = weaponData;
    const pre_fix = randomPart(items.prefixes.prefixes, 'stats');
    const name = randomPart(items.weapon_names.weapon_names, 'stats');
    const end = randomPart(items.endings.endings, 'stats');
    const rarity = randomPart(items.rarities.rarities, 'stats');
    const weapon = new Weapon(pre_fix.item_value, name.item_value, end.item_value, rarity.item_value);

    const weaponStats = weapon.calculateStats()
    if (weaponStats.crit_damage < 1.1) {
        weaponStats.crit_damage = 1.1
    }

    return {
        weapon_name: `${rarity.call_value} ${pre_fix.call_value} ${name.call_value} ${end.call_value}`,
        stats: weaponStats,
    };
}
function generate_enemy(level) {
    const enemy_main = randomPart(items.enemy_types, 'stats');
    const enemy_elite = roll_enemy_elite();
    const enemy_level = Math.round(level);
    let enemy_health, enemy_damage, enemy_defense, enemy_AttackSpeed, enemy_coin_value, enemy_Crit_Chance, enemy_Crit_Damage;

    if (enemy_elite !== 'None') {
        enemy_health = Math.round((1.5 * enemy_level) * (enemy_main.item_value.stats.health * enemy_elite.item_value.stats.health));
        enemy_damage = Math.round((1 * enemy_level) * (enemy_main.item_value.stats.damage * enemy_elite.item_value.stats.damage));
        enemy_defense = Math.round((1 * enemy_level) * (enemy_main.item_value.stats.defense * enemy_elite.item_value.stats.defense));
        enemy_AttackSpeed = enemy_main.item_value.stats.attack_speed;
        enemy_coin_value = Math.round((1 * enemy_level) * (enemy_main.item_value.stats.coin_value * enemy_elite.item_value.stats.coin_value));
        enemy_Crit_Chance = (enemy_main.item_value.stats.Crit_chance * enemy_elite.item_value.stats.Crit_chance);
        enemy_Crit_Damage = (enemy_main.item_value.stats.Crit_damage * enemy_elite.item_value.stats.Crit_damage);
    } else {
        enemy_health = Math.round((1.25 * enemy_level) * enemy_main.item_value.stats.health);
        enemy_damage = Math.round((.75 * enemy_level) * enemy_main.item_value.stats.damage);
        enemy_defense = Math.round((.5 * enemy_level) * enemy_main.item_value.stats.defense);
        enemy_AttackSpeed = enemy_main.item_value.stats.attack_speed;
        enemy_coin_value = Math.round((1 * enemy_level) * enemy_main.item_value.stats.coin_value);
        enemy_Crit_Chance = enemy_main.item_value.stats.Crit_chance;
        enemy_Crit_Damage = enemy_main.item_value.stats.Crit_damage;
    }
    const enemy_name = `Level ${enemy_level} ${getEnemyName(enemy_main, enemy_elite)}`;
    const enemy = {
        name: enemy_name,
        stats: {
            Level: enemy_level,
            Health: enemy_health,
            Damage: enemy_damage,
            Crit_Chance: enemy_Crit_Chance,
            Crit_Damage: enemy_Crit_Damage,
            Defense: enemy_defense,
            AttackSpeed: enemy_AttackSpeed,
            Coin_value: enemy_coin_value
        }
    };

    return enemy;
}

function updateBattleLog(message) {
    const battleLog = document.getElementById('battle_log');
    const newLogEntry = document.createElement('p');
    newLogEntry.textContent = message;
    battleLog.appendChild(newLogEntry);
}
function handleGenerateItem() {
    // see if player alread has an item
    if (Player.inventory.length < 1) {
        const weapon = generateWeapon();

        Player.addInventory(weapon);

        let game_stats_ids = {
            id_list: [
                "player_display_health",
                "player_display_defense",
                "player_display_damage",
                "player_display_crit_chance",
                "player_display_crit_damage",
                "player_display_attack_speed",
                "player_display_status_chance",
                "player_display_element",
            ],
            value_list: [
                `Health: ${Player.stats.Health}`,
                `Defense: ${Player.stats.Defense}`,
                `Damage: ${Player.stats.Damage}`,
                `Crit Chance: ${Player.stats.Crit_Chance}`,
                `Crit Damage: ${Player.stats.Crit_Damage}`,
                `Attack Speed: ${Player.stats.AttackSpeed}`,
                `Status Chance: ${Player.stats.Status_chance}`,
                `Element: ${Player.stats.Element}`
            ]
        };
        update_display_muti(game_stats_ids.id_list, game_stats_ids.value_list);
        console.log(Player)
        console.log(weapon);

    }
    else {
        return console.error("Player already has an item")
    }
}
// battle funtions
function handleCrit(chance, damage) { }
// test average stats
function average_stats(numberOfWeapons) {
    const weaponList = []
    for (let i = 0; i < numberOfWeapons; i++) {
        const weapon = generateWeapon();
        weaponList.push(weapon)
    }
    console.log(weaponList)
    return weaponList
}

print(average_stats(100))

add_event_listener("generate_item", "click", handleGenerateItem)