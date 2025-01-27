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
