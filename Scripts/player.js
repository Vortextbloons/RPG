import { generateWeapon } from "./itemHandling.js";
export class Player {
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

    applyItemStats(item, sign = 1) {
        if (!item || !item.stats) return;
        this.stats.damage     += Number(item.stats.damage || 0)     * sign;
        this.stats.critChance += Number(item.stats.critChance || 0) * sign;
        this.stats.critDamage += Number(item.stats.critDamage || 0) * sign;
        this.stats.attackSpeed += Number(item.stats.attackSpeed || 0) * sign;
        this.stats.statusChance = sign > 0 ? Number(item.stats.statusChance || 0) : 0;
        this.stats.health     += Number(item.stats.health || 0)     * sign;
        this.stats.defense    += Number(item.stats.defense || 0)    * sign;
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
            this.applyItemStats(this.equipment[slot], -1);
        }
        
        // Equip new item
        this.equipment[slot] = item;
        this.applyItemStats(item, 1);
        
        // Remove from inventory
        this.inventory.splice(inventoryIndex, 1);
        return true;
    }

    unequipItem(slot = 'weapon') {
        if (!this.equipment[slot]) return false;
        if (this.inventory.length >= this.maxInventorySize) return false;
        
        // Remove stats
        this.applyItemStats(this.equipment[slot], -1);
        
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