import { GAME_CONFIG } from './gameConfig.js';
import { randomPart } from './Util.js';

class CombatEntity {
    constructor() {
        this.activeEffects = new Set();
    }

    addEffect(effect) {
        effect.onApply(this);
        this.activeEffects.add(effect);
    }

    removeEffect(effect) {
        effect.onRemove(this);
        this.activeEffects.delete(effect);
    }

    updateEffects() {
        for (const effect of this.activeEffects) {
            if (effect.update()) {
                this.removeEffect(effect);
            }
        }
    }
}
export class StatusEffect {
    constructor(name, duration = Infinity) {
        this.name = name;
        this.duration = duration;
        this.currentTurn = 0;
    }

    onApply(target) { }
    onRemove(target) { }
    onPreDamage(attacker, defender, damage) { return damage; }
    onPostDamage(attacker, defender, damageDealt) { }
    onTurnStart(entity) { }
    onTurnEnd(entity) { }

    update() {
        if (this.duration !== Infinity) {
            this.currentTurn++;
            return this.currentTurn >= this.duration;
        }
        return false;
    }
}

export class Player extends CombatEntity {
    constructor(item = "None") {
        super();
        const config = GAME_CONFIG.player;
        this.gold = config.startingGold;
        this.stats = {
            health: config.baseHealth,
            defense: config.baseDefense,
            damage: config.baseDamage,
            critChance: config.baseCritChance,
            critDamage: config.baseCritDamage,
            attackSpeed: config.baseAttackSpeed,
            statusChance: 0,
            element: 'None',
        }
        this.equipment = {
            weapon: null,
            helmets: null,
            chestplates: null,
            leggings: null,
            boots: null
        }
        this.unlockedData = {
            unlockedLevel: 1
        }
        this.inventory = [];
        this.maxInventorySize = config.maxInventorySize;
    }

    applyItemStats(item, sign = 1) {
        if (!item?.stats) return;
        else if (item.element){
            if(sign >= 1){
                this.stats.Element = item.element;
            }
            else{
                this.stats.Element = 'None';
            }
        }
        Object.entries(item.stats).forEach(([key, value]) => {
            if (value) {

                if (key === 'attackSpeed') {
                    this.stats[key] = sign <= -1 ? 3 : value * sign;
                } else {
                    this.stats[key] = ((this.stats[key] || 0) + Number(value) * sign);
                    this.stats[key] = Number(this.stats[key].toFixed(2));
                }
            }
            
        });

        this.stats.statusChance = sign > 0 ? Number(item.stats.statusChance || 0) : 0;
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

        // Validate slot based on item type
        if (item.armorType && item.armorType !== slot) {
            console.error("Wrong slot for item type");
            return false;
        }

        // Check if slot is already occupied
        if (this.equipment[slot]) {
            console.error("Slot is occupied");
            return false;
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
const getEliteData = async () => {
    const response = await fetch("./JSON Data/enemyJSON/enemyElite.json");
    const data = await response.json();
    return data.enemyElite;
}
const getEnemyData = async () => {
    const response = await fetch("./JSON Data/enemyJSON/enemyType.json");
    const data = await response.json();
    return data.enemyTypes;
}

const enemyTypeData = await getEnemyData();

const eliteData = await getEliteData();

export class Enemy extends CombatEntity {
    constructor(level = 1) {
        super();
        this.level = Number(level) || 1;
        this.enemyType = randomPart(enemyTypeData, 'stats').item_value
        this.eliteType = randomPart(eliteData, 'stats').item_value;
        this.name = `Level ${this.level} ${this.enemyType.name}`;

        // Update scaling based on level config
        const scaling = GAME_CONFIG.levels.levelScaling;
        this.stats = {
            health: Number((this.enemyType.stats.health * Math.pow(scaling.health, this.level)).toFixed(2)),
            defense: Number((this.enemyType.stats.defense * Math.pow(scaling.defense, this.level)).toFixed(2)),
            damage: Number((this.enemyType.stats.damage * Math.pow(scaling.damage, this.level)).toFixed(2)),
            critChance: Number((this.enemyType.stats.critChance + (this.level)).toFixed(2)),
            critDamage: Number(((this.enemyType.stats.critDamage * .90) + (this.level * .05)).toFixed(2)),
            attackSpeed: this.enemyType.stats.attackSpeed
        }

        this.isElite = false;

        // Scale coin rewards with level
        this.coinValue = this.enemyType.stats.coinValue * Math.pow(scaling.goldReward, this.level);

        const randomNum = Math.random();
        if (randomNum >= .85) {
            this.stats.health += Number((this.eliteType.stats.health * (this.level)));
            this.stats.defense += Number((this.eliteType.stats.defense * (this.level)));
            this.stats.damage += Number((this.eliteType.stats.damage * (this.level)));
            this.stats.critChance += Number((this.eliteType.stats.critChance + (this.level)));
            this.stats.critDamage = Number(((this.stats.critDamage * this.eliteType.stats.critDamage) + ((this.level * .05))).toFixed(2));
            this.coinValue += (this.eliteType.weight * 2) * (this.level * 3);
            this.isElite = true;
            this.name = (`Level ${this.level} ${this.eliteType.name} ${this.enemyType.name}`);
        }
    }

}