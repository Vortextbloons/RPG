import { generateWeapon } from "./itemHandling.js";
export class player {
    constructor(item = "None") {
        this.gold = 0
        this.stats = {
            health: 200,
            defense: 0,
            damage: 25,
            critChance: 5,
            critDamage: 0,
            attackSpeed: 0,
            Element: 'None',
        }
        this.equipment = {
            weapon: null,
            armor: null,
            helmet: null,
            boots: null,
          
        }
        this.inventory = [];
        this.maxInventorySize = 10;
    }

    addItemStats(item) {
        if (!item || !item.stats) return;
        this.stats.damage += Number(item.stats.damage || 0);
        this.stats.critChance += Number(item.stats.critChance || 0);
        this.stats.critDamage += Number(item.stats.critDamage || 0);
        this.stats.attackSpeed += Number(item.stats.attackSpeed || 0);
        this.stats.statusChance = Number(item.stats.statusChance || 0);
        this.stats.health += Number(item.stats.health || 0);
        this.stats.defense += Number(item.stats.defense || 0);
    }

    removeItemStats(item) {
        if (!item || !item.stats) return;
        this.stats.damage -= Number(item.stats.damage || 0);
        this.stats.critChance -= Number(item.stats.critChance || 0);
        this.stats.critDamage -= Number(item.stats.critDamage || 0);
        this.stats.attackSpeed -= Number(item.stats.attackSpeed || 0);
        this.stats.statusChance = 0;
        this.stats.health -= Number(item.stats.health || 0);
        this.stats.defense -= Number(item.stats.defense || 0);
    }

    addInventory(item) {
        if (item === "None") {
            console.error("No item to add");
            return false;
        }
        if (this.inventory.length >= this.maxInventorySize) {
            console.error("Inventory full");
            return false;
        }
        this.inventory.push(item);
        return true;
    }

    equipItem(inventoryIndex, slot = 'weapon') {
        if (inventoryIndex >= this.inventory.length) return false;
        
        const item = this.inventory[inventoryIndex];
        // Unequip current item if exists
        if (this.equipment[slot]) {
            this.removeItemStats(this.equipment[slot]);
        }
        
        // Equip new item
        this.equipment[slot] = item;
        this.addItemStats(item);
        
        // Remove from inventory
        this.inventory.splice(inventoryIndex, 1);
        return true;
    }

    unequipItem(slot = 'weapon') {
        if (!this.equipment[slot]) return false;
        if (this.inventory.length >= this.maxInventorySize) return false;
        
        // Remove stats
        this.removeItemStats(this.equipment[slot]);
        
        // Move to inventory
        this.inventory.push(this.equipment[slot]);
        this.equipment[slot] = null;
        return true;
    }

    removeItem(inventoryIndex) {
        if (inventoryIndex >= this.inventory.length) return false;
        this.inventory.splice(inventoryIndex, 1);
        return true;
    }
}