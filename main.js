import * as fun from "./Scripts/funtions.js"
  class Prefix {
    constructor(name, weight, element, stats) {
      this.name = name
      this.weight = weight
      this.element = element
      this.stats = stats
  
    }
  }
  
  class WeaponName {
    constructor(name, weight, stats) {
      this.name = name
      this.weight = weight
      this.stats = stats
  
    }
  }
  
  const prefixes = {
    Blazing: new Prefix('Blazing', 5, 'Fire', { damage: 20, Crit_damage: 0.15, Crit_chance: 5, Status_chance: 5 }),
    Frozen: new Prefix('Frozen', 5, 'Ice', { damage: 10, Crit_damage: 0.45, Crit_chance: 20, Status_chance: 5 }),
    Terra: new Prefix('Terra', 5, 'Earth', { damage: 15, Crit_damage: 0.25, Crit_chance: 15, Status_chance: 5 }),
    Shadow: new Prefix('Shadow', 3, 'Dark', { damage: 20, Crit_damage: .75, Crit_chance: 40, Status_chance: 10 })
  }
  const weapon_name = {
    Astra_Blade: new WeaponName('Astra_Blade', 5, { damage: 15, Crit_damage: 0.75, Crit_chance: 15, attack_speed: 0.85, Status_chance: 5 }),
    Expazt_Blade: new WeaponName('Expazt_Blade', 3, { damage: 45, Crit_damage: 0.4, Crit_chance: 35, attack_speed: 1, Status_chance: 5 }),
    Xata_Blade: new WeaponName('Xata_Blade', 5, { damage: 20, Crit_damage: 0.35, Crit_chance: 25, attack_speed: 1.1, Status_chance: 5 }),
    Uazt_Blade: new WeaponName('Uazt_Blade', 5, { damage: 10, Crit_damage: 0.75, Crit_chance: 40, attack_speed: 1.15, Status_chance: 5 }),
    Quick_Blade: new WeaponName('Quick_Blade', 5, { damage: 10, Crit_damage: .3, Crit_chance: 30, attack_speed: .5, Status_chance: 15 })
  }
  class Ending {
    constructor(name, weight, stats) {
      this.name = name
      this.weight = weight
      this.stats = stats
    }
  }
  
  const ending = {
    Of_Might: new Ending('Of Might', 5, { damage: 50, Crit_damage: 0.2, Crit_chance: 15, Status_chance: 5 }),
    Of_Shadow: new Ending('Of Shadow', 3, { damage: 25, Crit_damage: 0.85, Crit_chance: 15, Status_chance: 5 }),
    Of_Reckoning: new Ending('Of Reckoning', 5, { damage: 25, Crit_damage: 0.35, Crit_chance: 20, Status_chance: 5 }),
    Of_Strike: new Ending('Of Strike', 5, { damage: 30, Crit_damage: .2, Crit_chance: 25, Status_chance: 5 }),
    OF_Stars: new Ending('Of Stars', 1, { damage: 80, Crit_damage: .8, Crit_chance: 40, Status_chance: 25 })
  }
  
  class Weapon {
    constructor(prefix, name, ending, rarity) {
      this.prefix = prefix;
      this.name = name;
      this.ending = ending;
      this.rarity = rare[rarity];
  
      this.calculateStats();
    }
  
    calculateStats() {
      this.element = this.prefix.element;
      this.damage = Math.round((this.prefix.stats.damage + this.name.stats.damage + this.ending.stats.damage) * this.rarity.stats.stat_muti);
      this.critChance = Math.round((this.prefix.stats.Crit_chance + this.name.stats.Crit_chance + this.ending.stats.Crit_chance) * this.rarity.stats.stat_muti * 1);
      this.critDamage = (this.prefix.stats.Crit_damage + this.name.stats.Crit_damage + this.ending.stats.Crit_damage) * this.rarity.stats.stat_muti;
      this.attackSpeed = this.name.stats.attack_speed;
      this.Status_chance = (this.prefix.stats.Status_chance + this.name.stats.Status_chance + this.ending.stats.Status_chance) * this.rarity.stats.stat_muti
      if (this.critDamage <= 1.1) {
        this.critDamage = 1.1;
      }
    }
  }
  
  class Rarity {
    constructor(name, weight, stats) {
      this.name = name
      this.weight = weight
      this.stats = stats
    }
  }
  
  const rare = {
    Common: new Rarity('Common', 50, { stat_muti: 1 }),
    Uncomman: new Rarity('Uncomman', 35, { stat_muti: 1.25 }),
    Rare: new Rarity('Rare', 20, { stat_muti: 1.5 }),
    Epic: new Rarity('Epic', 10, { stat_muti: 2 }),
    Legendary: new Rarity('Legendary', 3, { stat_muti: 3 }),
    Mythic: new Rarity('Mythic', 1, { stat_muti: 4 }),
  
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
  
  
  class StatusEffect {
    constructor(name, duration, description) {
      this.name = name
      this.duration = duration
      this.description = description
    }
  }
  
  class BurningEffect extends StatusEffect {
    constructor() {
      super('Burning', 3, 'Deals Damage Over TIme')}
    apply(target, attacker) {
      let health = target.stats.health
      let damage = attacker.stats.damage
      
      const burn_damage_interval = setInterval(() => {
        if (health <= 0) {
          clearInterval(burn_damage_interval)
          return
        }
        else{
          const burn_damage = damage * .5
          health -= burn_damage
          console.log(health)
          console.log(`You Applyed Burn For ${burn_damage} damage`)
          return target.stats.health -= health
        }
      }, 1000);
      setTimeout(() => {
        clearInterval(burn_damage_interval)
      }, this.duration * 1000)
    }
  }
  
  const Status = [{Burning: new BurningEffect()}]
  
  class EnemyType {
    constructor(name, weight, stats) {
      this.name = name;
      this.weight = weight;
      this.stats = stats;
    }
  }
  
  const enemy_type = {
    Goblin: new EnemyType('Goblin', 5, { damage: 7, Crit_chance: 10, Crit_damage: 1.25, health: 50, defense: 5, attack_speed: 1, coin_value: 7 }),
    Skeleton: new EnemyType('Skeleton', 5, { damage: 15, Crit_chance: 25, Crit_damage: 1.5, health: 25, defense: 5, attack_speed: 0.8, coin_value: 7 }),
    Spider: new EnemyType('Spider', 4, { damage: 12, Crit_chance: 15, Crit_damage: 1.35, health: 35, defense: 8, attack_speed: 1.1, coin_value: 7 }),
    Titan: new EnemyType('Titan', 3, { damage: 10, Crit_chance: 15, Crit_damage: 1.75, health: 75, defense: 30, attack_speed: 1.5, coin_value: 15, }),
  };
  
  class EnemyMod {
    constructor(name, weight, stats) {
      this.name = name;
      this.weight = weight;
      this.stats = stats;
    }
  }
  
  const enemy_mod = {
    Strong: new EnemyMod('Strong', 5, { damage: 2.125, Crit_chance: 1.75, Crit_damage: 1.5, health: 1.5, defense: 1.5, coin_value: 5 }),
    Buff: new EnemyMod('Buff', 5, { damage: 1.5, Crit_chance: 1.25, Crit_damage: 1.5, health: 2.5, defense: 2.5, coin_value: 5 }),
    Assassin: new EnemyMod('Assassin', 3, { damage: 2, Crit_chance: 3, Crit_damage: 3, health: 2, defense: 2, coin_value: 7.5 }),
  };
  function generate_weapon() {
    const pre_fix = random_part(prefixes, 'stats')
    const name = random_part(weapon_name, 'stats')
    const end = random_part(ending, 'stats')
    const rarity = random_part(rare, 'weight')
    const weapon = new Weapon(pre_fix.item_value, name.item_value, end.item_value, rarity.call_value)
  
  
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
    const enemy_main = random_part(enemy_type, 'stats')
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
  const foe = generate_enemy(5)
  
  console.log(foe)
  const weapon = generate_weapon()
  console.log(weapon)
  
  const player_test = fun.player_stats(weapon)
  console.log(player_test)
  console.log(fun.fighting(player_test, foe))
  
