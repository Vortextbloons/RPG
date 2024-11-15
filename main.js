class Item {
    constructor(name, weight, element = null, stats = {}) {
        this.name = name;
        this.weight = weight;
        this.element = element;
        this.stats = stats;
    }
}



export class Player {
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

class Weapon {
    constructor(prefix, name, ending, rarity) {
        this.prefix = prefix;
        this.name = name;
        this.ending = ending;
        this.rarity = rarity;
        this.calculateStats();
    }

    calculateStats() {
        this.weapon_class_stats = {};
        const statKeys = ['damage', 'Crit_chance', 'Crit_damage', 'attack_speed', 'Status_chance'];
        for (const key of statKeys) {
            this.weapon_class_stats[key] = (this.prefix.stats[key] || 0) + (this.name.stats[key] || 0) + (this.ending.stats[key] || 0);
        }
        this.weapon_class_stats.element = this.prefix.element;
        return this.weapon_class_stats;
    }
}

const items = {
    endings: {
        Of_Might: { name: "Of Might", weight: 5, stats: { damage: 50, Crit_damage: 0.2, Crit_chance: 15, Status_chance: 5 } },
        Of_Shadow: { name: "Of Shadow", weight: 3, stats: { damage: 25, Crit_damage: 0.85, Crit_chance: 15, Status_chance: 5 } },
        Of_Reckoning: { name: "Of Reckoning", weight: 5, stats: { damage: 25, Crit_damage: 0.35, Crit_chance: 20, Status_chance: 5 } },
        Of_Strike: { name: "Of Strike", weight: 5, stats: { damage: 30, Crit_damage: 0.2, Crit_chance: 25, Status_chance: 5 } },
        OF_Stars: { name: "Of Stars", weight: 1, stats: { damage: 80, Crit_damage: 0.8, Crit_chance: 40, Status_chance: 25 } }
    },
    prefixes: {
        Blazing: { name: "Blazing", weight: 5, element: "Fire", stats: { damage: 20, Crit_damage: 0.15, Crit_chance: 5, Status_chance: 5 } },
        Frozen: { name: "Frozen", weight: 5, element: "Ice", stats: { damage: 10, Crit_damage: 0.45, Crit_chance: 20, Status_chance: 5 } },
        Terra: { name: "Terra", weight: 5, element: "Earth", stats: { damage: 15, Crit_damage: 0.25, Crit_chance: 15, Status_chance: 5 } },
        Shadow: { name: "Shadow", weight: 3, element: "Dark", stats: { damage: 20, Crit_damage: 0.75, Crit_chance: 40, Status_chance: 10 } }
    },
    rarities: {
        Common: { name: "Common", weight: 50, stats: { stat_muti: 1 } },
        Uncomman: { name: "Uncomman", weight: 35, stats: { stat_muti: 1.25 } },
        Rare: { name: "Rare", weight: 20, stats: { stat_muti: 1.5 } },
        Epic: { name: "Epic", weight: 10, stats: { stat_muti: 2 } },
        Legendary: { name: "Legendary", weight: 3, stats: { stat_muti: 3 } },
        Mythic: { name: "Mythic", weight: 1, stats: { stat_muti: 4 } }
    },
    weapon_names: {
        Astra_Blade: { name: "Astra_Blade", weight: 5, stats: { damage: 15, Crit_damage: 0.75, Crit_chance: 15, attack_speed: 0.85, Status_chance: 5 } },
        Expazt_Blade: { name: "Expazt_Blade", weight: 3, stats: { damage: 45, Crit_damage: 0.4, Crit_chance: 35, attack_speed: 1, Status_chance: 5 } },
        Xata_Blade: { name: "Xata_Blade", weight: 5, stats: { damage: 20, Crit_damage: 0.35, Crit_chance: 25, attack_speed: 1.1, Status_chance: 5 } },
        Uazt_Blade: { name: "Uazt_Blade", weight: 5, stats: { damage: 10, Crit_damage: 0.75, Crit_chance: 40, attack_speed: 1.15, Status_chance: 5 } },
        Quick_Blade: { name: "Quick_Blade", weight: 5, stats: { damage: 10, Crit_damage: 0.3, Crit_chance: 30, attack_speed: 0.5, Status_chance: 15 } }
    }
};

function randomPart(object, c_value) {
    const item_value = pickWeightedItem(Object.values(object));
    const index_value = item_value[c_value];
    const call_value = getValueFromObject(object, c_value, index_value);
    return { item_value, call_value };
}

function pickWeightedItem(items) {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const randomValue = Math.random() * totalWeight;
    let currentWeight = 0;
    for (const item of items) {
        currentWeight += item.weight;
        if (currentWeight >= randomValue) {
            return item;
        }
    }
    return items[0];
}

function getValueFromObject(object, property, value) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            if (object[key][property] === value) {
                return key;
            }
        }
    }
}

function generateWeapon() {
    const pre_fix = randomPart(items.prefixes, 'stats');
    const name = randomPart(items.weapon_names, 'stats');
    const end = randomPart(items.endings, 'stats');
    const rarity = randomPart(items.rarities, 'weight');
    const weapon = new Weapon(pre_fix.item_value, name.item_value, end.item_value, rarity.call_value);
    const weaponStats = {
        Health: 0,
        defense: 0,
        Damage: (weapon.weapon_class_stats.damage * items.rarities[rarity.call_value].stats.stat_muti).toFixed(2),
        Crit_Chance: (weapon.weapon_class_stats.Crit_chance * items.rarities[rarity.call_value].stats.stat_muti).toFixed(2),
        Crit_Damage: (weapon.weapon_class_stats.Crit_damage * items.rarities[rarity.call_value].stats.stat_muti).toFixed(2),
        AttackSpeed: weapon.weapon_class_stats.attack_speed,
        Element: weapon.weapon_class_stats.element,
        Status_chance: (weapon.weapon_class_stats.Status_chance * items.rarities[rarity.call_value].stats.stat_muti).toFixed(2),
    };
    if (weaponStats.Crit_Damage <= 1.1) {
        weaponStats.Crit_Damage = 1.1;
    }

    return {
        weapon_name: `${rarity.call_value} ${pre_fix.call_value} ${name.call_value} ${end.call_value}`,
        stats: weaponStats,
        cost: Math.round(weaponStats.Damage * 10)
    };
}

export function generate_enemy(level) {
    const enemy_main = random_part(items.enemy_types, 'stats');
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

export function random_part(object, c_value) {
    const item_value = pick_Weighted_Item(Object.values(object));
    const index_value = item_value[c_value];
    const call_value = get_value_from_object(object, c_value, index_value);
    const new_item = {
        item_value: item_value,
        call_value: call_value
    };
    return new_item;
}

function pick_Weighted_Item(items) {
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const randomValue = Math.random() * totalWeight;
    let currentWeight = 0;
    for (const item of items) {
        currentWeight += item.weight;
        if (currentWeight >= randomValue) {
            return item;
        }
    }
    return items[0];
}

function get_value_from_object(object, property, value) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            if (object[key][property] === value) {
                return key;
            }
        }
    }
}

function random_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function random_array(array) {
    let index = Math.floor(Math.random() * array.length);
    const random_array = array[index];
    console.log(index);
    return random_array;
}
export function update_display(id, value, type = "text") {
    const element = document.getElementById(id)
    if (type === "text") {
        element.textContent = value
    }
    else if (type === "html") {
        element.innerHTML = value
    }
    else {
        console.error("Invalid type")
    }
}
export function update_display_muti(id_arry, value_arry, type = "text") {
    if (id_arry.length !== value_arry.length) {
        console.error("Array length does not match")
    }
    else if (id_arry.length == 0 || value_arry.length == 0) {
        console.error("Array is empty")
    }
    else {
        for (let i = 0; i < id_arry.length; i++) {
            const element = document.getElementById(id_arry[i])
            if (type === "text") {
                element.textContent = value_arry[i]
            }
            else if (type === "html") {
                element.innerHTML = value_arry[i]
            }
            else {
                console.error("Invalid type")
            }
        }
    }

}
export function add_event_listener(id, event, func) {
    const element = document.getElementById(id)
    element.addEventListener(event, func)
}


const player = new Player();

add_event_listener("generate_item", "click", () => {
    const weapon = generate_weapon()
    Player_test.addInventory(weapon)
    console.log(Player_test)
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
            `Health: ${Player_test.stats.Health}`,
            `Defense: ${Player_test.stats.Defense}`,
            `Damage: ${Player_test.stats.Damage}`,
            `Crit Chance: ${Player_test.stats.Crit_Chance}`,
            `Crit Damage: ${Player_test.stats.Crit_Damage}`,
            `Attack Speed: ${Player_test.stats.AttackSpeed}`,
            `Status Chance: ${Player_test.stats.Status_chance}`,
            `Element: ${Player_test.stats.Element}`
        ]
    }
    update_display_muti(game_stats_ids.id_list, game_stats_ids.value_list)
    console.log(fighting(Player_test, foe))
    console.log(Player_test)
    console.log(weapon)
})

addEventListener("open_inventory", "click", () => {
    const inventoryDisplay = document.getElementById('items_display');
    inventoryDisplay.innerHTML = '';
    player.inventory.forEach((item, index) => {
        const itemElement = document.createElement('li');
        itemElement.textContent = `${index + 1}. ${item.weapon_name}`;
        inventoryDisplay.appendChild(itemElement);
    });
});
