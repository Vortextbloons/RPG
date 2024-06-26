import * as gameclass from "./game class.js"
export const prefixes = {
    Blazing: new gameclass.Prefix('Blazing', 5, 'Fire', { damage: 20, Crit_damage: 0.15, Crit_chance: 5, Status_chance: 5 }),
    Frozen: new gameclass.Prefix('Frozen', 5, 'Ice', { damage: 10, Crit_damage: 0.45, Crit_chance: 20, Status_chance: 5 }),
    Terra: new gameclass.Prefix('Terra', 5, 'Earth', { damage: 15, Crit_damage: 0.25, Crit_chance: 15, Status_chance: 5 }),
    Shadow: new gameclass.Prefix('Shadow', 3, 'Dark', { damage: 20, Crit_damage: .75, Crit_chance: 40, Status_chance: 10 })
}
export const weapon_name = {
    Astra_Blade: new gameclass.WeaponName('Astra_Blade', 5, { damage: 15, Crit_damage: 0.75, Crit_chance: 15, attack_speed: 0.85, Status_chance: 5 }),
    Expazt_Blade: new gameclass.WeaponName('Expazt_Blade', 3, { damage: 45, Crit_damage: 0.4, Crit_chance: 35, attack_speed: 1, Status_chance: 5 }),
    Xata_Blade: new gameclass.WeaponName('Xata_Blade', 5, { damage: 20, Crit_damage: 0.35, Crit_chance: 25, attack_speed: 1.1, Status_chance: 5 }),
    Uazt_Blade: new gameclass.WeaponName('Uazt_Blade', 5, { damage: 10, Crit_damage: 0.75, Crit_chance: 40, attack_speed: 1.15, Status_chance: 5 }),
    Quick_Blade: new gameclass.WeaponName('Quick_Blade', 5, { damage: 10, Crit_damage: .3, Crit_chance: 30, attack_speed: .5, Status_chance: 15 })
}

export const ending = {
    Of_Might: new gameclass.Ending('Of Might', 5, { damage: 50, Crit_damage: 0.2, Crit_chance: 15, Status_chance: 5 }),
    Of_Shadow: new gameclass.Ending('Of Shadow', 3, { damage: 25, Crit_damage: 0.85, Crit_chance: 15, Status_chance: 5 }),
    Of_Reckoning: new gameclass.Ending('Of Reckoning', 5, { damage: 25, Crit_damage: 0.35, Crit_chance: 20, Status_chance: 5 }),
    Of_Strike: new gameclass.Ending('Of Strike', 5, { damage: 30, Crit_damage: .2, Crit_chance: 25, Status_chance: 5 }),
    OF_Stars: new gameclass.Ending('Of Stars', 1, { damage: 80, Crit_damage: .8, Crit_chance: 40, Status_chance: 25 })
}

export const rare = {
    Common: new gameclass.Rarity('Common', 50, { stat_muti: 1 }),
    Uncomman: new gameclass.Rarity('Uncomman', 35, { stat_muti: 1.25 }),
    Rare: new gameclass.Rarity('Rare', 20, { stat_muti: 1.5 }),
    Epic: new gameclass.Rarity('Epic', 10, { stat_muti: 2 }),
    Legendary: new gameclass.Rarity('Legendary', 3, { stat_muti: 3 }),
    Mythic: new gameclass.Rarity('Mythic', 1, { stat_muti: 4 }),

}

export const Status = [{ Burning: new gameclass.BurningEffect() }]

export const enemy_type = {
    Goblin: new gameclass.EnemyType('Goblin', 5, { damage: 7, Crit_chance: 10, Crit_damage: 1.25, health: 50, defense: 5, attack_speed: 1, coin_value: 7 }),
    Skeleton: new gameclass.EnemyType('Skeleton', 5, { damage: 15, Crit_chance: 25, Crit_damage: 1.5, health: 25, defense: 5, attack_speed: 0.8, coin_value: 7 }),
    Spider: new gameclass.EnemyType('Spider', 4, { damage: 12, Crit_chance: 15, Crit_damage: 1.35, health: 35, defense: 8, attack_speed: 1.1, coin_value: 7 }),
    Titan: new gameclass.EnemyType('Titan', 3, { damage: 10, Crit_chance: 15, Crit_damage: 1.75, health: 75, defense: 30, attack_speed: 1.5, coin_value: 15, }),
};

export const enemy_mod = {
    Strong: new gameclass.EnemyMod('Strong', 5, { damage: 2.125, Crit_chance: 1.75, Crit_damage: 1.5, health: 1.5, defense: 1.5, coin_value: 5 }),
    Buff: new gameclass.EnemyMod('Buff', 5, { damage: 1.5, Crit_chance: 1.25, Crit_damage: 1.5, health: 2.5, defense: 2.5, coin_value: 5 }),
    Assassin: new gameclass.EnemyMod('Assassin', 3, { damage: 2, Crit_chance: 3, Crit_damage: 3, health: 2, defense: 2, coin_value: 7.5 }),
};

