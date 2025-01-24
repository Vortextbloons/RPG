import { randomPart, pickWeightedItem} from "./Util.js";
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

export class enemy {
    constructor(level = 1) {
        this.level = Number(level);
        this.enemyType = randomPart(enemyTypeData, 'stats').item_value
        this.eliteType = randomPart(eliteData, 'stats').item_value;
        this.name = this.enemyType.name;
        this.stats = {
            health: Number((this.enemyType.stats.health * (this.level * 1.25)).toFixed(2)),
            defense: Number((this.enemyType.stats.defense * (this.level * 1.05)).toFixed(2)),
            damage: Number((this.enemyType.stats.damage * (this.level * 1.1)).toFixed(2)),
            critChance: Number((this.enemyType.stats.critChance + (this.level)).toFixed(2)),
            critDamage: Number(((this.enemyType.stats.critDamage * .90) + (this.level * .05)).toFixed(2)),
            attackSpeed: this.enemyType.stats.attackSpeed
        }
        this.isElite = false;
        this.coinValue = this.enemyType.stats.coinValue * (this.level * 1.5);
        const randomNum = Math.random();
        if(randomNum >= .85){
            this.stats.health += Number((this.eliteType.stats.health * (this.level)));
            this.stats.defense += Number((this.eliteType.stats.defense * (this.level )));
            this.stats.damage += Number((this.eliteType.stats.damage * (this.level)));
            this.stats.critChance += Number((this.eliteType.stats.critChance + (this.level )));
            this.stats.critDamage = Number(((this.stats.critDamage * this.eliteType.stats.critDamage) + ((this.level * .05))).toFixed(2));
            this.coinValue += (this.eliteType.weight * 2) * (this.level * 3);
            this.isElite = true;
            this.name = (`${this.eliteType.name} ${this.enemyType.name}`);
        }
    }
  
}
console.log(new enemy(1))