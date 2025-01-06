import { generateWeapon } from "./itemHandling.js";
export class player {
    constructor(item = "None") {
        this.gold = 0
        this.stats = {
            health: 100,
            defense: 0,
            damage: 0,
            critChance: 0,
            critDamage: 0,
            attackSpeed: 0,
            Element: 'None',
        }

        this.inventory = []
    }

    addItemStats(item) {
        this.stats.damage += item.stats.damage || 0;
        this.stats.critChance += item.stats.crit_chance || 0;
        this.stats.critDamage += item.stats.crit_damage || 0;
        this.stats.attackSpeed += item.stats.attack_speed || 0;
        this.stats.statusChance += item.stats.status_chance || 0;
        this.stats.health += item.stats.health || 0;
        this.stats.defense += item.stats.defense || 0;
        this.stats.Element = item.stats.Element || 'None';

    }

    addInventory(item) {
        if (item === "None") {
            console.error("No item to add")
            return
        }
        this.inventory.push(item);
        this.addItemStats(item);
    }
}