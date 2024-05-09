export function random_part(object, c_value) {
    const item_value = pick_Weighted_Item(Object.values(object))
    const index_value = item_value[c_value]
    const call_value = get_value_from_object(object, c_value, index_value)
    const new_itme = {
        item_value: item_value,
        call_value: call_value
    }
    return new_itme
}
function pick_Weighted_Item(items) {

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

function get_value_from_object(object, property, value) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            if (object[key][property] === value) {
                return key
            }

        }

    }
}
function random_number(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
function random_array(array) {
    let index = Math.floor(Math.random() * array.length)
    const random_array = array[index]
    console.log(index)
    return random_array
}



