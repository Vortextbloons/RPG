import { addEventListener } from "./Scripts/Util.js";
import { generateWeapon } from "./Scripts/itemHandling.js";
import { player } from "./Scripts/player.js";
import { enemy } from "./Scripts/enemy.js";
import { battle } from "./Scripts/fightingLogic.js";
import { updateGoldDisplay, updateBattleLog, displayStats, initializeModalHandlers, openStatsModal } from "./Scripts/displayScripts.js";

const Player = new player();
Player.gold = 300
const WEAPON_COST = 50;

function tryGenerateWeapon() {
    if (Player.gold >= WEAPON_COST) {
        const newWeapon = generateWeapon();
        if (Player.addInventory(newWeapon)) {
            Player.gold -= WEAPON_COST;
            updateGoldDisplay(Player.gold);
            updateBattleLog(`Generated weapon: ${newWeapon.weaponName}`);
            displayStats(Player);
        } else {
            updateBattleLog('Inventory is full!', 'death');
        }
    } else {
        updateBattleLog(`Not enough gold! Need ${WEAPON_COST} gold.`, 'death');
    }
}

// Add global functions for HTML onclick events
window.equipItem = (index) => {
    Player.equipItem(index);
    displayStats(Player);
};

window.unequipItem = () => {
    if (!Player.unequipItem()) {
        updateBattleLog('Inventory is full!', 'death');
    }
    displayStats(Player);
};

window.removeItem = (index) => {
    Player.removeItem(index);
    displayStats(Player);
};

addEventListener('generate-weapon', 'click', tryGenerateWeapon);
addEventListener('battle', 'click', () => {
    const Enemy = new enemy(1);
    console.log(Enemy);
    battle(Player, Enemy);
    updateGoldDisplay(Player.gold);
});

addEventListener('show-stats', 'click', () => {
    displayStats(Player);
    openStatsModal();
});

initializeModalHandlers();
updateGoldDisplay(Player.gold);



