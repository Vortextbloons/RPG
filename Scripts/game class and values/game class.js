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

 class Ending {
    constructor(name, weight, stats) {
        this.name = name
        this.weight = weight
        this.stats = stats
    }
}

 class Rarity {
    constructor(name, weight, stats) {
        this.name = name
        this.weight = weight
        this.stats = stats
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
        super('Burning', 3, 'Deals Damage Over TIme')
    }
    apply(target, attacker) {
        // ... rest of the method
    }
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
        // ... rest of the method
    }
}

 class EnemyType {
    constructor(name, weight, stats) {
        this.name = name;
        this.weight = weight;
        this.stats = stats;
    }
}

 class EnemyMod {
    constructor(name, weight, stats) {
        this.name = name;
        this.weight = weight;
        this.stats = stats;
    }
}
export default {
    Prefix,
    WeaponName,
    Ending,
    Rarity,
    StatusEffect,
    BurningEffect,
    Weapon,
    EnemyType,
    EnemyMod
}
