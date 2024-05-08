import * as gamevaraibles from './game class and values/game varablesjs'

import * as unity from './unity.js'

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
function calculate_crit(Crit_chance, Crit_damage) {

    let cal_crit_tier = () => {
        let crit_tier = 0
        let isCrit = false
        let combined_crit_damage = 1
        if (Crit_chance <= 1) {
            let rad_number = Math.random()

            if (rad_number < Crit_chance) {
                isCrit = true
                crit_tier = 1
                combined_crit_damage = Crit_damage
            }
            else {
                isCrit = false
                combined_crit_damage = 1
            }
        }
        if (Crit_chance > 1) {
            isCrit = true
            let decimal = Crit_chance % 1
            let rad_number = Math.random()

            for (let c = 1; c <= Crit_chance; c++) {
                crit_tier += 1
            }
            if (decimal >= rad_number) {
                crit_tier += 1
            }
            combined_crit_damage = crit_tier * Crit_damage
        }
        const crit_info = {
            isCrit: isCrit,
            crit_tier: crit_tier,
            final_crit_damage: combined_crit_damage
        }
        return crit_info
    }

    return cal_crit_tier()
}
function fighting(player, enemy) {
    const fightingPlayer = {
        stats: {
            health: player.stats.health,
            damage: player.stats.damage,
            defense: player.stats.defense,
            Crit_chance: player.stats.Crit_chance / 100,
            Crit_damage: player.stats.Crit_damage,
            attackSpeed: player.stats.attack_speed,
            element: player.stats.element
        }
    };

    const fightingEnemy = {
        stats: {
            health: enemy.stats.health,
            damage: enemy.stats.damage,
            defense: enemy.stats.defense,
            Crit_chance: enemy.stats.Crit_chance / 100,
            Crit_damage: enemy.stats.Crit_damage,
            attackSpeed: enemy.stats.attack_speed,
            gold: enemy.stats.coin_value,
            name: enemy.stats.name
        }
    };

    const playerAttack = () => {

        const playerCrit = calculate_crit(fightingPlayer.stats.Crit_chance, fightingPlayer.stats.Crit_damage);
        let playerDamageDealt = fightingPlayer.stats.damage * playerCrit.final_crit_damage;
        playerDamageDealt *= calculate_defense(fightingEnemy.stats.defense);
        fightingEnemy.stats.health -= Math.max(0, playerDamageDealt);
        const isCrit = playerDamageDealt > player.stats.damage;
        console.log(fightingEnemy.stats.health)
        console.log(`You hit ${fightingEnemy.stats.name} for ${playerDamageDealt} damage ${isCrit ? `You did a Crit, Tier ${playerCrit.crit_tier}` : ''}. ${fightingEnemy.stats.name}'s health: ${fightingEnemy.stats.health}`);

        if (fightingEnemy.stats.health <= 0) {
            console.log(`You have defeated ${fightingEnemy.stats.name}!`);
            console.log(`You've gained ${fightingEnemy.stats.gold} coins!`);
        } else {
            setTimeout(enemyAttack, fightingEnemy.attackSpeed);
        }
    };

    const enemyAttack = () => {
        const enemyCrit = calculate_crit(fightingEnemy.stats.Crit_chance, fightingEnemy.stats.Crit_damage)

        let enemyDamageDealt = enemyCrit.final_crit_damage * fightingEnemy.stats.damage;
        enemyDamageDealt *= calculate_defense(fightingPlayer.stats.defense);
        fightingPlayer.stats.health -= Math.max(0, enemyDamageDealt);
        const isCrit = enemyDamageDealt > fightingEnemy.stats.damage;
        console.log(`${fightingEnemy.stats.name} hits you for ${enemyDamageDealt} damage ${isCrit ? `Critical Hit! Tier ${enemyCrit.crit_tier}` : ''}. Your health: ${fightingPlayer.stats.health}`);
        if (fightingPlayer.stats.health <= 0) {
            console.log(`${fightingEnemy.stats.name} has defeated you!`);
        } else {
            setTimeout(playerAttack, fightingPlayer.attackSpeed);
        }
    };

    if (fightingPlayer.stats.attackSpeed < fightingEnemy.statsattackSpeed) {
        setTimeout(playerAttack, 0);
    } else if (fightingPlayer.attackSpeed > fightingEnemy.attackSpeed) {
        setTimeout(enemyAttack, 0);
    } else {
        const index = Math.random();
        if (index <= 0.5) {
            setTimeout(playerAttack, fightingPlayer.attackSpeed);
        } else {
            setTimeout(enemyAttack, fightingEnemy.attackSpeed);
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
function generate_weapon() {
    const pre_fix = unity.random_part(gamevaraibles.prefixes, 'stats')
    const name = unity.random_part(gamevaraibles.weapon_name, 'stats')
    const end = unity.random_part(gamevaraibles.ending, 'stats')
    const rarity = unity.random_part(gamevaraibles.rare, 'weight')
    const weapon = new gmaeclass.Weapon(gamevaraibles.pre_fix.item_value, name.item_value, end.item_value, rarity.call_value)


    const weaponStats = {
        Damage: weapon.damage,
        Crit_chance: weapon.critChance,
        Crit_damage: weapon.critDamage.toFixed(2),
        attack_speed: weapon.attackSpeed,
        element: weapon.element,
        Status_chance: weapon.Status_chance,
    };

    const weapon_info = {
        weapon_name: `${rarity.call_value} ${pre_fix.call_value} ${name.call_value} ${end.call_value}`,
        weapon_stats: weaponStats
    }

    return weapon_info
}
function generate_enemy(level) {
    const enemy_main = unity.random_part(enemy_type, 'stats')
    const enemy_elite = roll_enemy_elite()
    const enemy_level = Math.round(level)
    let enemy_health, enemy_damage, enemy_defense, enemy_attack_speed, enemy_coin_value, enemy_crit_chance, enemy_crit_damage;

    if (enemy_elite !== 'None') {
        enemy_health = Math.round((1.5 * enemy_level) * (enemy_main.item_value.stats.health * enemy_elite.item_value.stats.health))
        enemy_damage = Math.round((1 * enemy_level) * (enemy_main.item_value.stats.damage * enemy_elite.item_value.stats.damage))
        enemy_defense = Math.round((1 * enemy_level) * (enemy_main.item_value.stats.defense * enemy_elite.item_value.stats.defense))
        enemy_attack_speed = enemy_main.item_value.stats.attack_speed
        enemy_coin_value = Math.round((1 * enemy_level) * (enemy_main.item_value.stats.coin_value * enemy_elite.item_value.stats.coin_value))
        enemy_crit_chance = (enemy_main.item_value.stats.Crit_chance * enemy_elite.item_value.stats.Crit_chance)
        enemy_crit_damage = (enemy_main.item_value.stats.Crit_damage * enemy_elite.item_value.stats.Crit_damage)
    }
    else {
        enemy_health = Math.round((1.25 * enemy_level) * enemy_main.item_value.stats.health)
        enemy_damage = Math.round((.75 * enemy_level) * enemy_main.item_value.stats.damage)
        enemy_defense = Math.round((.5 * enemy_level) * enemy_main.item_value.stats.defense)
        enemy_attack_speed = enemy_main.item_value.stats.attack_speed
        enemy_coin_value = Math.round((1 * enemy_level) * enemy_main.item_value.stats.coin_value)
        enemy_crit_chance = enemy_main.item_value.stats.Crit_chance
        enemy_crit_damage = enemy_main.item_value.stats.Crit_damage
    }
    const enemy_name = `Level ${enemy_level} ${getEnemyName(enemy_main, enemy_elite)}`
    const enemy = {
        enemy_name: enemy_name,
        stats: {
            level: enemy_level,
            health: enemy_health,
            damage: enemy_damage,
            Crit_chance: enemy_crit_chance,
            Crit_damage: enemy_crit_damage,
            defense: enemy_defense,
            attack_speed: enemy_attack_speed,
            coin_value: enemy_coin_value
        }
    }

    return enemy
}
function player_stats(weapon) {
    let Crit_chance = weapon.weapon_stats.Crit_chance
    let Crit_damage = weapon.weapon_stats.Crit_damage
    let Status_chance = weapon.weapon_stats.Status_chance
    let damage = weapon.weapon_stats.Damage
    let element = weapon.weapon_stats.element
    let attack_speed = weapon.weapon_stats.attack_speed
    let health = 300
    let defense = 0
    const player_stats = {
        stats: {
            element: element,
            damage: damage,
            Crit_chance: Crit_chance,
            Crit_damage: Crit_damage,
            Status_chance: Status_chance,
            attack_speed: attack_speed,
            health: health,
            defense: defense
        }
    }
    return player_stats
}
export default (roll_enemy_elite, getEnemyName, calculate_defense, calculate_crit, fighting, apply_status, generate_weapon, generate_enemy, player_stats) ;