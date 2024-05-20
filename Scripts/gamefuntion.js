import { Weapon } from './game class and values/game class.js';
import * as gamevaraibles from './game class and values/game varables.js'

export function Sava_data(data_array) {
    const data = JSON.stringify(data_array)
    localStorage.setItem('Gamedata', data)

}

import * as unity from "./unity.js"

function roll_enemy_elite() {
    const number = Math.random();
    if (number > .9) {
        return unity.random_part(gamevaraibles.enemy_mod, 'stats');
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
        console.log(`You hit ${enemy.name} for ${PlayerDamageDealt} damage ${IsCrit ? `You did a Crit, Tier ${PlayerCrit.Crit_Tier}` : ''}. ${FightingEnemy.stats.name}'s health: ${FightingEnemy.stats.Health}`);

        if (FightingEnemy.stats.health <= 0) {
            console.log(`You have defeated ${FightingEnemy.stats.name}!`);
            console.log(`You've gained ${FightingEnemy.stats.gold} coins!`)
                ;
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
        console.log(`${enemy.name} hits you for ${EnemyDamageDealt} damage ${IsCrit ? `Critical Hit! Tier ${EnemyCrit.Crit_Tier}` : ''}. Your health: ${FightingPlayer.stats.Health.toFixed(2)}`);

        if (FightingPlayer.stats.Health <= 0) {en
            console.log(`${FightingEnemy.stats.name} has defeated you!`);
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
    const pre_fix = unity.random_part(gamevaraibles.prefixes, 'stats')
    const name = unity.random_part(gamevaraibles.weapon_name, 'stats')
    const end = unity.random_part(gamevaraibles.ending, 'stats')
    const rarity = unity.random_part(gamevaraibles.rare, 'weight')
    const weapon = new Weapon(pre_fix.item_value, name.item_value, end.item_value, rarity.call_value)
    const weaponStats = {
        Health: 0,
        defense: 0,
        Damage: (weapon.weapon_class_stats.damage * gamevaraibles.rare[rarity.call_value].stats.stat_muti).toFixed(2),
        Crit_Chance: (weapon.weapon_class_stats.critChance * gamevaraibles.rare[rarity.call_value].stats.stat_muti).toFixed(2),
        Crit_Damage: (weapon.weapon_class_stats.critDamage * gamevaraibles.rare[rarity.call_value].stats.stat_muti).toFixed(2),
        AttackSpeed: weapon.weapon_class_stats.AttackSpeed,
        Element: weapon.weapon_class_stats.element,
        Status_chance: (weapon.weapon_class_stats.Status_chance * gamevaraibles.rare[rarity.call_value].stats.stat_muti).toFixed(2),
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
    const enemy_main = unity.random_part(gamevaraibles.enemy_type, 'stats')
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


