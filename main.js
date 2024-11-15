export class Prefix {
    constructor(name, weight, element, stats) {
        this.name = name
        this.weight = weight
        this.element = element
        this.stats = stats
    }
}


const testweapon = {
    
weapon_name: 'Epic Blazing Astra_Blade OF_Stars', 
weapon_stats: { 
    damage: 160, 
    Crit_damage: 1.6,
     Crit_chance: 80, 
     attack_speed: 0.85, 
     Status_chance: 30, 
     element: 'Fire' },
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
    AddItemStats(item) {
        if (item === "None") {
            console.error("No item to add");
            return;
        }
        this.stats = {
            Health: this.stats.Health + item.stats.Health,
            Defense: this.stats.Defense + item.stats.Defense,
            Damage: this.stats.Damage + item.stats.Damage,
            Crit_Chance: this.stats.Crit_Chance + item.stats.Crit_Chance,
            Crit_Damage: this.stats.Crit_Damage + item.stats.Crit_Damage,
            AttackSpeed: this.stats.AttackSpeed + item.stats.AttackSpeed,
            Element: this.stats.Element + item.stats.Element,
        };
    }
    addInventory(item) {
        if(item === "None"){
            console.error("No item to add")
            return
        }
        this.inventory.push(item)
        this.AddItemStats(item)
    }
}

export class WeaponName {
    constructor(name, weight, stats) {
        this.name = name
        this.weight = weight
        this.stats = stats
    }
}

export class Ending {
    constructor(name, weight, stats) {
        this.name = name
        this.weight = weight
        this.stats = stats
    }
}

export class Rarity {
    constructor(name, weight, stats) {
        this.name = name
        this.weight = weight
        this.stats = stats
    }
}

export class StatusEffect {
    constructor(name, duration, description) {
        this.name = name
        this.duration = duration
        this.description = description
    }
}

export class BurningEffect extends StatusEffect {
    constructor() {
        super('Burning', 3, 'Deals Damage Over TIme')
    }
    apply(target, attacker) {
        // ... rest of the method
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
        this.weapon_class_stats = {
            damage: this.prefix.stats.damage + this.name.stats.damage + this.ending.stats.damage,
            critChance: this.prefix.stats.Crit_chance + this.name.stats.Crit_chance + this.ending.stats.Crit_chance,
            critDamage: this.prefix.stats.Crit_damage + this.name.stats.Crit_damage + this.ending.stats.Crit_damage,
            attackSpeed: this.name.stats.attack_speed,
            element: this.prefix.element,
            Status_chance: this.name.stats.Status_chance
        }
        return this.weapon_class_stats
    }
}

export class EnemyType {
    constructor(name, weight, stats) {
        this.name = name;
        this.weight = weight;
        this.stats = stats;
    }
}

export class EnemyMod {
    constructor(name, weight, stats) {
        this.name = name;
        this.weight = weight;
        this.stats = stats;
    }
}

export const prefixes = {
    Blazing: new Prefix('Blazing', 5, 'Fire', { damage: 20, Crit_damage: 0.15, Crit_chance: 5, Status_chance: 5 }),
    Frozen: new Prefix('Frozen', 5, 'Ice', { damage: 10, Crit_damage: 0.45, Crit_chance: 20, Status_chance: 5 }),
    Terra: new Prefix('Terra', 5, 'Earth', { damage: 15, Crit_damage: 0.25, Crit_chance: 15, Status_chance: 5 }),
    Shadow: new Prefix('Shadow', 3, 'Dark', { damage: 20, Crit_damage: .75, Crit_chance: 40, Status_chance: 10 })
}
export const weapon_name = {
    Astra_Blade: new WeaponName('Astra_Blade', 5, { damage: 15, Crit_damage: 0.75, Crit_chance: 15, attack_speed: 0.85, Status_chance: 5 }),
    Expazt_Blade: new WeaponName('Expazt_Blade', 3, { damage: 45, Crit_damage: 0.4, Crit_chance: 35, attack_speed: 1, Status_chance: 5 }),
    Xata_Blade: new WeaponName('Xata_Blade', 5, { damage: 20, Crit_damage: 0.35, Crit_chance: 25, attack_speed: 1.1, Status_chance: 5 }),
    Uazt_Blade: new WeaponName('Uazt_Blade', 5, { damage: 10, Crit_damage: 0.75, Crit_chance: 40, attack_speed: 1.15, Status_chance: 5 }),
    Quick_Blade: new WeaponName('Quick_Blade', 5, { damage: 10, Crit_damage: .3, Crit_chance: 30, attack_speed: .5, Status_chance: 15 })
}

export const ending = {
    Of_Might: new Ending('Of Might', 5, { damage: 50, Crit_damage: 0.2, Crit_chance: 15, Status_chance: 5 }),
    Of_Shadow: new Ending('Of Shadow', 3, { damage: 25, Crit_damage: 0.85, Crit_chance: 15, Status_chance: 5 }),
    Of_Reckoning: new Ending('Of Reckoning', 5, { damage: 25, Crit_damage: 0.35, Crit_chance: 20, Status_chance: 5 }),
    Of_Strike: new Ending('Of Strike', 5, { damage: 30, Crit_damage: .2, Crit_chance: 25, Status_chance: 5 }),
    OF_Stars: new Ending('Of Stars', 1, { damage: 80, Crit_damage: .8, Crit_chance: 40, Status_chance: 25 })
}

export const rare = {
    Common: new Rarity('Common', 50, { stat_muti: 1 }),
    Uncomman: new Rarity('Uncomman', 35, { stat_muti: 1.25 }),
    Rare: new Rarity('Rare', 20, { stat_muti: 1.5 }),
    Epic: new Rarity('Epic', 10, { stat_muti: 2 }),
    Legendary: new Rarity('Legendary', 3, { stat_muti: 3 }),
    Mythic: new Rarity('Mythic', 1, { stat_muti: 4 }),

}

export const Status = [{ Burning: new BurningEffect() }]

export const enemy_type = {
    Goblin: new EnemyType('Goblin', 5, { damage: 7, Crit_chance: 10, Crit_damage: 1.25, health: 50, defense: 5, attack_speed: 1, coin_value: 7 }),
    Skeleton: new EnemyType('Skeleton', 5, { damage: 15, Crit_chance: 25, Crit_damage: 1.5, health: 25, defense: 5, attack_speed: 0.8, coin_value: 7 }),
    Spider: new EnemyType('Spider', 4, { damage: 12, Crit_chance: 15, Crit_damage: 1.35, health: 35, defense: 8, attack_speed: 1.1, coin_value: 7 }),
    Titan: new EnemyType('Titan', 3, { damage: 10, Crit_chance: 15, Crit_damage: 1.75, health: 75, defense: 30, attack_speed: 1.5, coin_value: 15, }),
};

export const enemy_mod = {
    Strong: new EnemyMod('Strong', 5, { damage: 2.125, Crit_chance: 1.75, Crit_damage: 1.5, health: 1.5, defense: 1.5, coin_value: 5 }),
    Buff: new EnemyMod('Buff', 5, { damage: 1.5, Crit_chance: 1.25, Crit_damage: 1.5, health: 2.5, defense: 2.5, coin_value: 5 }),
    Assassin: new EnemyMod('Assassin', 3, { damage: 2, Crit_chance: 3, Crit_damage: 3, health: 2, defense: 2, coin_value: 7.5 }),
};

export function Sava_data(data_array) {
    const data = JSON.stringify(data_array)
    localStorage.setItem('Gamedata', data)

}

function roll_enemy_elite() {
    const number = Math.random();
    if (number > .9) {
        return random_part(enemy_mod, 'stats');
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
    effectiveChance /= 100
    effectiveChance = (effectiveChance - 1) * -1
    return effectiveChance.toFixed(10);
}
function calculate_crit(Crit_Chance, Crit_Damage) {

    let cal_Crit_Tier = () => {
        let Crit_Tier = 0
        let IsCrit = false
        let combined_Crit_Damage = 1
        if (Crit_Chance <= 1) {
            let rad_number = Math.random()

            if (rad_number < Crit_Chance) {
                IsCrit = true
                Crit_Tier = 1
                combined_Crit_Damage = Crit_Damage
            }
            else {
                IsCrit = false
                combined_Crit_Damage = 1
            }
        }
        if (Crit_Chance > 1) {
            IsCrit = true
            let decimal = Crit_Chance % 1
            let rad_number = Math.random()

            for (let c = 1; c <= Crit_Chance; c++) {
                Crit_Tier += 1
            }
            if (decimal >= rad_number) {
                Crit_Tier += 1
            }
            combined_Crit_Damage = Crit_Tier * Crit_Damage
        }
        const crit_info = {
            IsCrit: IsCrit,
            Crit_Tier: Crit_Tier,
            FInal_Crit_Damage: combined_Crit_Damage
        }
        return crit_info
    }

    return cal_Crit_Tier()
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

    const PlayerAttack = () => {

        const PlayerCrit = calculate_crit(FightingPlayer.stats.Crit_Chance, FightingPlayer.stats.Crit_Damage);
        let PlayerDamageDealt = FightingPlayer.stats.Damage * PlayerCrit.FInal_Crit_Damage;
        PlayerDamageDealt *= calculate_defense(FightingEnemy.stats.Defense);
        Math.round(PlayerDamageDealt)
        FightingEnemy.stats.Health -= Math.max(0, PlayerDamageDealt);
        const IsCrit = PlayerDamageDealt > player.stats.Damage;
        const playerAttackMessage = `You hit ${enemy.name} for ${PlayerDamageDealt} damage ${IsCrit ? `You did a Crit, Tier ${PlayerCrit.Crit_Tier}` : ''}. ${FightingEnemy.stats.name}'s health: ${FightingEnemy.stats.Health}`;
        console.log(playerAttackMessage);
        updateBattleLog(playerAttackMessage);

        if (FightingEnemy.stats.health <= 0) {
            const victoryMessage = `You have defeated ${FightingEnemy.stats.name}! You've gained ${FightingEnemy.stats.gold} coins!`;
            console.log(victoryMessage);
            updateBattleLog(victoryMessage);
        } else {
            setTimeout(EnemyAttack, FightingEnemy.AttackSpeed);
        }
    }

    const EnemyAttack = () => {
        const EnemyCrit = calculate_crit(FightingEnemy.stats.Crit_Chance, FightingEnemy.stats.Crit_Damage)
        let EnemyDamageDealt = EnemyCrit.FInal_Crit_Damage * FightingEnemy.stats.Damage;
        EnemyDamageDealt *= (calculate_defense(FightingPlayer.stats.Defense))
        FightingPlayer.stats.Health -= Math.max(0, EnemyDamageDealt);
        Math.round(EnemyDamageDealt)
        const IsCrit = EnemyDamageDealt > FightingEnemy.stats.amage;
        const enemyAttackMessage = `${enemy.name} hits you for ${EnemyDamageDealt} damage ${IsCrit ? `Critical Hit! Tier ${EnemyCrit.Crit_Tier}` : ''}. Your health: ${FightingPlayer.stats.Health.toFixed(2)}`;
        console.log(enemyAttackMessage);
        updateBattleLog(enemyAttackMessage);

        if (FightingPlayer.stats.Health <= 0) {
            const defeatMessage = `${FightingEnemy.stats.name} has defeated you!`;
            console.log(defeatMessage);
            updateBattleLog(defeatMessage);
        } else {
            setTimeout(PlayerAttack, FightingPlayer.AttackSpeed);
        }
    };

    if (FightingPlayer.stats.AttackSpeed < FightingEnemy.stats.AttackSpeed) {
        setTimeout(PlayerAttack, 0);
    } else if (FightingPlayer.AttackSpeed > FightingEnemy.stats.AttackSpeed) {
        setTimeout(EnemyAttack, 0);
    } else {
        const index = Math.random();
        if (index <= 0.5) {
            setTimeout(PlayerAttack, FightingPlayer.AttackSpeed);
        } else {
            setTimeout(EnemyAttack, FightingEnemy.AttackSpeed);
        }
    }
}
function apply_status(target, attacker) {
    let element = ''
    if (attacker.stats.element === 'Fire') {
        element = Status[0]
        element.Burning.apply(target, attacker)

    }
    else {
        return `You Have Appled No Status`
    }
}
export function generate_weapon() {
    const pre_fix = random_part(prefixes, 'stats')
    const name = random_part(weapon_name, 'stats')
    const end = random_part(ending, 'stats')
    const rarity = random_part(rare, 'weight')
    const weapon = new Weapon(pre_fix.item_value, name.item_value, end.item_value, rarity.call_value)
    const weaponStats = {
        Health: 0,
        defense: 0,
        Damage: (weapon.weapon_class_stats.damage * rare[rarity.call_value].stats.stat_muti).toFixed(2),
        Crit_Chance: (weapon.weapon_class_stats.critChance * rare[rarity.call_value].stats.stat_muti).toFixed(2),
        Crit_Damage: (weapon.weapon_class_stats.critDamage * rare[rarity.call_value].stats.stat_muti).toFixed(2),
        AttackSpeed: weapon.weapon_class_stats.AttackSpeed,
        Element: weapon.weapon_class_stats.element,
        Status_chance: (weapon.weapon_class_stats.Status_chance * rare[rarity.call_value].stats.stat_muti).toFixed(2),
    };
    if (weaponStats.Crit_Damage <= 1.1) {
        weaponStats.Crit_Damage = 1.1
    }

    const weapon_info = {
        weapon_name: `${rarity.call_value} ${pre_fix.call_value} ${name.call_value} ${end.call_value}`,
        stats: weaponStats
    }

    return weapon_info
}
export function generate_enemy(level) {
    const enemy_main = random_part(enemy_type, 'stats')
    const enemy_elite = roll_enemy_elite()
    const enemy_level = Math.round(level)
    let enemy_health, enemy_damage, enemy_defense, enemy_AttackSpeed, enemy_coin_value, enemy_Crit_Chance, enemy_Crit_Damage;

    if (enemy_elite !== 'None') {
        enemy_health = Math.round((1.5 * enemy_level) * (enemy_main.item_value.stats.health * enemy_elite.item_value.stats.health))
        enemy_damage = Math.round((1 * enemy_level) * (enemy_main.item_value.stats.damage * enemy_elite.item_value.stats.damage))
        enemy_defense = Math.round((1 * enemy_level) * (enemy_main.item_value.stats.defense * enemy_elite.item_value.stats.defense))
        enemy_AttackSpeed = enemy_main.item_value.stats.AttackSpeed
        enemy_coin_value = Math.round((1 * enemy_level) * (enemy_main.item_value.stats.coin_value * enemy_elite.item_value.stats.coin_value))
        enemy_Crit_Chance = (enemy_main.item_value.stats.Crit_Chance * enemy_elite.item_value.stats.Crit_Chance)
        enemy_Crit_Damage = (enemy_main.item_value.stats.Crit_Damage * enemy_elite.item_value.stats.Crit_Damage)
    }
    else {
        enemy_health = Math.round((1.25 * enemy_level) * enemy_main.item_value.stats.health)
        enemy_damage = Math.round((.75 * enemy_level) * enemy_main.item_value.stats.damage)
        enemy_defense = Math.round((.5 * enemy_level) * enemy_main.item_value.stats.defense)
        enemy_AttackSpeed = enemy_main.item_value.stats.AttackSpeed
        enemy_coin_value = Math.round((1 * enemy_level) * enemy_main.item_value.stats.coin_value)
        enemy_Crit_Chance = enemy_main.item_value.stats.Crit_Chance
        enemy_Crit_Damage = enemy_main.item_value.stats.Crit_Damage
    }
    const enemy_name = `Level ${enemy_level} ${getEnemyName(enemy_main, enemy_elite)}`
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
    }

    return enemy
}

function updateBattleLog(message) {
    const battleLog = document.getElementById('battle_log');
    const newLogEntry = document.createElement('p');
    newLogEntry.textContent = message;
    battleLog.appendChild(newLogEntry);
}

export function random_part(object, c_value) {
    const item_value = pick_Weighted_Item(Object.values(object))
    const index_value = item_value[c_value]
    const call_value = get_value_from_object(object, c_value, index_value)
    const new_itme = {
        item_value: item_value,
        call_value: call_value
    }
    return new_itme
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
                return key
            }

        }

    }
}
function random_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function random_array(array) {
    let index = Math.floor(Math.random() * array.length)
    const random_array = array[index]
    console.log(index)
    return random_array
}
export function update_display(id, value, type="text") {
    const element = document.getElementById(id)
    if(type === "text"){
        element.textContent = value
    }
    else if(type === "html"){
        element.innerHTML = value
    }
    else{
        console.error("Invalid type")
    }
}
export function update_display_muti(id_arry, value_arry, type="text") {
    if(id_arry.length !== value_arry.length){
        console.error("Array length does not match")
    }
    else if(id_arry.length == 0 || value_arry.length == 0){
        console.error("Array is empty")
    }
    else{
        for(let i = 0; i < id_arry.length; i++){
            const element = document.getElementById(id_arry[i])
            if(type === "text"){
                element.textContent = value_arry[i]
            }
            else if(type === "html"){
                element.innerHTML = value_arry[i]
            }
            else{
                console.error("Invalid type")
            }
        }
    }
    
}
export function add_event_listener(id, event, func){
    const element = document.getElementById(id)
    element.addEventListener(event, func)
}

const foe = generate_enemy(5)

const weapon = generate_weapon()

const Player_test = new Player

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

add_event_listener("start_battle", "click", () => {
  updateBattleLog("Battle started!");
  fighting(Player_test, foe);
});
