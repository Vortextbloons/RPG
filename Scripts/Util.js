export function averageGearStats (numberOfItems, itemType="weapon") {
    const itemList = []
    if(itemType === "weapon") {
        for (let i = 0; i < numberOfWeapons; i++) {
            const weapon = generateWeapon();
            itemList.push(weapon)
        }
    }
    else if(itemType === "armor") {
        for (let i = 0; i < numberOfItems; i++) {
            const armor = generateArmor();
            itemList.push(armor)
        }
    }
    else {
        console.error("Invalid item type")
    }

    const averageWeaponStats = {
        averageHealth: (itemList.reduce((p, c) =>{
            return p + c.stats.health
        }, 0)/itemList.length).toFixed(2),
        averageDefense: (itemList.reduce((p, c) =>{
            return p + c.stats.defense
        }, 0)/itemList.length).toFixed(2),

        averageDamage: (itemList.reduce((p, c) =>{
            return p + c.stats.damage
        }, 0)/itemList.length).toFixed(2),
        averageCritChance: (itemList.reduce((p, c) =>{
            return p + c.stats.critChance
        }, 0)/itemList.length).toFixed(2),
        averageCritDamage: (itemList.reduce((p, c) =>{
            return p + c.stats.critDamage
        }, 0)/itemList.length).toFixed(2),
        averageAttackSpeed: (itemList.reduce((p, c) =>{
            return p + c.stats.attackSpeed
        }, 0)/itemList.length).toFixed(2),
        averageStatusChance: (itemList.reduce((p, c) =>{
            return p + c.stats.statusChance
        }, 0)/itemList.length).toFixed(2),
    }
    console.log(itemList)
    return averageWeaponStats
}

export function averageEnemyStats(numberOfEnemies, level) {
    const enemyList = [];
    for (let i = 0; i < numberOfEnemies; i++) {
        const temptEnemy = new enemy(level);
        enemyList.push(temptEnemy);
    }
    const averageEnemyStats = {
        averageHealth: (enemyList.reduce((p, c) => p + c.stats.health, 0) / enemyList.length).toFixed(2),
        averageDefense: (enemyList.reduce((p, c) => p + c.stats.defense, 0) / enemyList.length).toFixed(2),
        averageDamage: (enemyList.reduce((p, c) => p + c.stats.damage, 0) / enemyList.length).toFixed(2),
        averageCritChance: (enemyList.reduce((p, c) => p + c.stats.critChance, 0) / enemyList.length).toFixed(2),
        averageCritDamage: (enemyList.reduce((p, c) => p + c.stats.critDamage, 0) / enemyList.length).toFixed(2),
        averaecoineValue: (enemyList.reduce((p, c) => p + c.coinValue, 0) / enemyList.length).toFixed(2),
        averagePercentElite: (enemyList.filter(e => e.isElite).length / enemyList.length).toFixed(2),
        enemyLevel: level,

    };
    return averageEnemyStats;
}
export function random_array(array) {
    let index = Math.floor(Math.random() * array.length);
    return array[index];
}
export function update_display(id, value, type = "text") {
    const element = document.getElementById(id)
    if (type === "text") {
        element.textContent = value
    }
    else if (type === "html") {
        element.innerHTML = value
    }
    else {
        console.error("Invalid type")
    }
}
export function update_display_muti(id_arry, value_arry, type = "text") {
    if (id_arry.length !== value_arry.length) {
        console.error("Array length does not match")
    }
    else if (id_arry.length == 0 || value_arry.length == 0) {
        console.error("Array is empty")
    }
    else {
        for (let i = 0; i < id_arry.length; i++) {
            const element = document.getElementById(id_arry[i])
            if (type === "text") {
                element.textContent = value_arry[i]
            }
            else if (type === "html") {
                element.innerHTML = value_arry[i]
            }
            else {
                console.error("Invalid type")
            }
        }
    }

}
export function addEventListener(id, event, func) {
    const element = document.getElementById(id)
    element.addEventListener(event, func)
}

export function random_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomPart(object, callValue) {
    const item_value = pickWeightedItem(Object.values(object));
    const index_value = item_value[callValue];
    const call_value = getValueFromObject(object, callValue, index_value);
    return { item_value, call_value };
}

export function pickWeightedItem(items) {
    if (!Array.isArray(items)) {
        throw new TypeError("Expected an array of items");
    }
    const totalWeight = items.reduce((sum, item) => sum + item.weight, 0);
    const randomValue = Math.random() * totalWeight;
    let currentWeight = 0;
    for (const item of items) {
        currentWeight += item.weight;
        if (currentWeight >= randomValue) {
            return item;
        }
    }
    return items[0];
}

export function getValueFromObject(object, property, value) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            if (object[key][property] === value) {
                return key;
            }
        }
    }
}
