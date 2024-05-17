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
    
    constructor(item) {
        this.base_stats = {
            health: 100,
            defense: 0,
        }
        this.inventory = []
    }
    AddItem(item){
        const item = item
        
        this.base_stats= {
            
        }

    }
    
    }
    addInventory(item) {
        this.inventory.push(item)
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
