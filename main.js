import { randomPart, add_event_listener, } from "./Scripts/Util.js";
import { average_stats } from  "./Scripts/testLogic.js"
import { generateWeapon, } from "./Scripts/itemHandling.js";
import { player } from "./Scripts/player.js";
import { enemy } from "./Scripts/enemy.js";

console.log("Main loaded");
const Enemy = new enemy(4);
console.log(Enemy)

const Player = new player();
function handleItemAdding (item){
    
    Player.addInventory(item)
    
}
console.log(average_stats(10000))
handleItemAdding(generateWeapon())
console.log(Player)
console.log(Player.inventory[0])

