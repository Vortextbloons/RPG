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
export function pick_Weighted_Item(items) {

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

export function get_value_from_object(object, property, value) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            if (object[key][property] === value) {
                return key
            }

        }

    }
}
export function random_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
export function random_array(array) {
    let index = Math.floor(Math.random() * array.length)
    const random_array = array[index]
    console.log(index)
    return random_array
}
export function roll_enemy_elite() {
    const number = Math.random();
    if (number > .9) {
        return random_part(enemy_mod, 'stats');
    } else {
        return "None";
    }
}
export function getEnemyName(main_name, elite) {
    if (elite === 'None') {
        const name = main_name.call_value;
        return name;
    } else {
        const name = `${elite.call_value} ${main_name.call_value}`;
        return name;
    }
}
export function calculate_defense(defense_value) {
    const baseChance = 0.005;

    const hyperbolicFactor = 1 / (baseChance * defense_value + 1);
    let effectiveChance = (1 - hyperbolicFactor) * 100;
    effectiveChance /= 100
    effectiveChance = (effectiveChance - 1) * -1
    return effectiveChance.toFixed(10);
}
export function calculate_crit(Crit_chance, Crit_damage) {

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
export function fighting(player, enemy) {
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