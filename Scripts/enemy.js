import { pickWeightedItem } from "./Util.js";
const enemyTypes  = async () => {
    const response = await fetch("/RPG/JSON Data/enemyJSON/enemyType.json")
    return response
}
const enemyElite = async () => {
    const enemyElite = await fetch("/RPG/JSON Data/enemyJSON/enemyElite.json")
    return enemyElite
}
console.log(enemyTypes())
export class enemy {
    async rollEnemy(){
        const enemy = pickWeightedItem(await (await enemyTypes()).json())
        return enemy
    }
    
    constructor(level = 1) {
        this.enemy = this.rollEnemy()
        this.stats = {
            health: this.enemy.stats.health,
            defense: this.enemy.stats.defense,
            damage: this.enemy.stats.damage,
            critChance: this.enemy.stats.critChance,
            critDamage: this.enemy.stats.critDamage,
            coinValue: this.enemy.stats.coinValue,
            attackSpeed: this.enemy.stats.attackSpeed,

        }

        this.level = level;
        this.rollElite();
        this.calculateLevel(this.level);
    }

    async rollElite() {
        const randomNum = Math.random()
        let elite = false
        if(randomNum > .85){
            elite = true
        }
        else{
            elite = false
        }
        if(elite == true){
            let elite = pickWeightedItem(await (await enemyElite()).json())
            this.stats.health += elite.stats.health
            this.stats.defense += elite.stats.defense
            this.stats.damage += elite.stats.damage
            this.stats.critChance += elite.stats.crit_chance
            this.stats.critDamage += elite.stats.crit_damage
            this.stats.coinValue *= 1.5
        }
    }

    calculateLevel(level) {
        this.stats.health += level * 1.3
        this.stats.defense += level * 1.25
        this.stats.damage += level * 1.15
        this.stats.critChance += level * 1.05
        this.stats.critDamage += level * 1.1
        this.stats.coinValue += level * 1.45
    }
}
