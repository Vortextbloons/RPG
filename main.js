export class Item {
    constructor(name, weight, element = null, stats = {}) {
        this.name = name;
        this.weight = weight;
        this.element = element;
        this.stats = stats;
    }
}

<<<<<<< HEAD


export class Player {
    constructor(item = "None") {
        this.gold = 0
=======
const testweapon = {
    weapon_name: 'Epic Blazing Astra_Blade OF_Stars',
    weapon_stats: {
        damage: 160,
        Crit_damage: 1.6,
        Crit_chance: 80,
        attack_speed: 0.85,
        Status_chance: 30,
        element: 'Fire'
    }
}

export class Player {
    constructor(item = "None") {
        this.gold = 0;
>>>>>>> 2bd1de3e8f67b10e74e9586077539304e5f35c41
        this.stats = {
            Health: 100,
            Defense: 0,
            Damage: 0,
            Crit_Chance: 0,
            Crit_Damage: 0,
            AttackSpeed: 1,
            Element: 'None',
<<<<<<< HEAD
        }

        this.inventory = []
=======
        };
        this.inventory = [];
>>>>>>> 2bd1de3e8f67b10e74e9586077539304e5f35c41
    }

    AddItemStats(item) {
        if (item === "None") {
            console.error("No item to add");
            return;
        }
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
<<<<<<< HEAD
            console.error("No item to add")
            return
=======
            console.error("No item to add");
            return;
>>>>>>> 2bd1de3e8f67b10e74e9586077539304e5f35c41
        }
        this.inventory.push(item);
        this.AddItemStats(item);
    }
}

export class Weapon {
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

export async function loadJSON(file) {
    const response = await fetch(file);
    const data = await response.json();
    return data;
}

export let items = {};

async function loadComponents() {
    items = await loadJSON('items.json');
}

loadComponents();

export function Sava_data(data_array) {
    const data = JSON.stringify(data_array);
    localStorage.setItem('Gamedata', data);
}

function roll_enemy_elite() {
    const number = Math.random();
    if (number > .9) {
        return random_part(items.enemy_mods, 'stats');
    } else {
        return "None";
    }
}

function getEnemyName(main_name, elite) {
    if (elite === 'None') {
        const name = main_name.call_value;
        return name;
    } else {
        const name = `${elite.call_value} ${main_name.call_value}`;
        return name;
    }
}

function calculate_defense(defense_value) {
    const baseChance = 0.005;
    const hyperbolicFactor = 1 / (baseChance * defense_value + 1);
    let effectiveChance = (1 - hyperbolicFactor) * 100;
    effectiveChance /= 100;
    effectiveChance = (effectiveChance - 1) * -1;
    return effectiveChance.toFixed(10);
}

function calculate_crit(Crit_Chance, Crit_Damage) {
    let cal_Crit_Tier = () => {
        let Crit_Tier = 0;
        let IsCrit = false;
        let combined_Crit_Damage = 1;
        if (Crit_Chance <= 1) {
            let rad_number = Math.random();
            if (rad_number < Crit_Chance) {
                IsCrit = true;
                Crit_Tier = 1;
                combined_Crit_Damage = Crit_Damage;
            } else {
                IsCrit = false;
                combined_Crit_Damage = 1;
            }
        }
        if (Crit_Chance > 1) {
            IsCrit = true;
            let decimal = Crit_Chance % 1;
            let rad_number = Math.random();
            for (let c = 1; c <= Crit_Chance; c++) {
                Crit_Tier += 1;
            }
            if (decimal >= rad_number) {
                Crit_Tier += 1;
            }
            combined_Crit_Damage = Crit_Tier * Crit_Damage;
        }
        const crit_info = {
            IsCrit: IsCrit,
            Crit_Tier: Crit_Tier,
            FInal_Crit_Damage: combined_Crit_Damage
        };
        return crit_info;
    }
    return cal_Crit_Tier();
}

export function fighting(player, enemy) {
    const FightingPlayer = {
        stats: {
            Health: player.stats.Health,
            Damage: player.stats.Damage,
            Defense: player.stats.Defense,
            Crit_Chance: player.stats.Crit_Chance / 100,
            Crit_Damage: player.stats.Crit_Damage,
            AttackSpeed: player.stats.AttackSpeed,
            Element: player.stats.Element
        }
    };

    const FightingEnemy = {
        stats: {
            Health: enemy.stats.Health,
            Damage: enemy.stats.Damage,
            Defense: enemy.stats.Defense,
            Crit_Chance: enemy.stats.Crit_Chance / 100,
            Crit_Damage: enemy.stats.Crit_Damage,
            AttackSpeed: enemy.stats.AttackSpeed,
        }
    };

    const attack = (attacker, defender, attackerName, defenderName) => {
        const Crit = calculate_crit(attacker.stats.Crit_Chance, attacker.stats.Crit_Damage);
        let DamageDealt = attacker.stats.Damage * Crit.FInal_Crit_Damage;
        DamageDealt *= calculate_defense(defender.stats.Defense);
        Math.round(DamageDealt);
        defender.stats.Health -= Math.max(0, DamageDealt);
        const IsCrit = DamageDealt > attacker.stats.Damage;
        const attackMessage = `${attackerName} hits ${defenderName} for ${DamageDealt} damage ${IsCrit ? `Critical Hit! Tier ${Crit.Crit_Tier}` : ''}. ${defenderName}'s health: ${defender.stats.Health.toFixed(2)}`;
        console.log(attackMessage);
        updateBattleLog(attackMessage);

        if (defender.stats.Health <= 0) {
            const victoryMessage = `${attackerName} has defeated ${defenderName}!`;
            console.log(victoryMessage);
            updateBattleLog(victoryMessage);
            return true;
        }
        return false;
    };

    const PlayerAttack = () => {
        if (!attack(FightingPlayer, FightingEnemy, 'You', enemy.name)) {
            setTimeout(EnemyAttack, FightingEnemy.stats.AttackSpeed);
        }
    };

    const EnemyAttack = () => {
        if (!attack(FightingEnemy, FightingPlayer, enemy.name, 'You')) {
            setTimeout(PlayerAttack, FightingPlayer.stats.AttackSpeed);
        }
    };

    if (FightingPlayer.stats.AttackSpeed < FightingEnemy.stats.AttackSpeed) {
        setTimeout(PlayerAttack, 0);
    } else if (FightingPlayer.stats.AttackSpeed > FightingEnemy.stats.AttackSpeed) {
        setTimeout(EnemyAttack, 0);
    } else {
        const index = Math.random();
        if (index <= 0.5) {
            setTimeout(PlayerAttack, FightingPlayer.stats.AttackSpeed);
        } else {
            setTimeout(EnemyAttack, FightingEnemy.stats.AttackSpeed);
        }
    }
}

function apply_status(target, attacker) {
    let element = '';
    if (attacker.stats.element === 'Fire') {
        element = items.status_effects[0];
        element.Burning.apply(target, attacker);
    } else {
        return `You Have Applied No Status`;
    }
}

export function generate_weapon() {
    const pre_fix = random_part(items.prefixes, 'stats');
    const name = random_part(items.weapon_names, 'stats');
    const end = random_part(items.endings, 'stats');
    const rarity = random_part(items.rarities, 'weight');
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

    const weapon_info = {
        weapon_name: `${rarity.call_value} ${pre_fix.call_value} ${name.call_value} ${end.call_value}`,
        stats: weaponStats
    };

    return weapon_info;
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
<<<<<<< HEAD
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
=======

export function updateDisplay(ids, values, type = "text") {
    if (!Array.isArray(ids)) {
        ids = [ids];
        values = [values];
    }
    if (ids.length !== values.length) {
        console.error("Array length does not match");
        return;
    }
    for (let i = 0; i < ids.length; i++) {
        const element = document.getElementById(ids[i]);
        if (type === "text") {
            element.textContent = values[i];
        } else if (type === "html") {
            element.innerHTML = values[i];
        } else {
            console.error("Invalid type");
        }
    }
>>>>>>> 2bd1de3e8f67b10e74e9586077539304e5f35c41
}

export function add_event_listener(id, event, func) {
    const element = document.getElementById(id);
    element.addEventListener(event, func);
}

const foe = generate_enemy(5);
const weapon = generate_weapon();
const Player_test = new Player();

add_event_listener("generate_item", "click", () => {
<<<<<<< HEAD
    const weapon = generate_weapon()
    Player_test.addInventory(weapon)
    console.log(Player_test)
=======
    const weapon = generate_weapon();
    Player_test.addInventory(weapon);
    console.log(Player_test);
>>>>>>> 2bd1de3e8f67b10e74e9586077539304e5f35c41
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
<<<<<<< HEAD
    }
    update_display_muti(game_stats_ids.id_list, game_stats_ids.value_list)
    console.log(fighting(Player_test, foe))
    console.log(Player_test)
    console.log(weapon)
})
=======
    };
    updateDisplay(game_stats_ids.id_list, game_stats_ids.value_list);
    console.log(fighting(Player_test, foe));
    console.log(Player_test);
    console.log(weapon);
});
>>>>>>> 2bd1de3e8f67b10e74e9586077539304e5f35c41

add_event_listener("start_battle", "click", () => {
    updateBattleLog("Battle started!");
    fighting(Player_test, foe);
});
