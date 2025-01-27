import { addEventListener } from "./Scripts/Util.js";
import { generateWeapon } from "./Scripts/itemHandling.js";
import { Player } from "./Scripts/player.js";
import { enemy } from "./Scripts/enemy.js";
import { battle, isBattleActive } from "./Scripts/fightingLogic.js";
import { updateGoldDisplay, updateBattleLog, displayStats, initializeModalHandlers, openStatsModal } from "./Scripts/displayScripts.js";
import { averageGearStats } from "./Scripts/testLogic.js";

const player = new Player(); 
player.gold = 300;
const WEAPON_COST = 50;

function tryGenerateWeapon() {
    if (player.gold >= WEAPON_COST) {
        const newWeapon = generateWeapon();
        if (player.addInventory(newWeapon)) {
            player.gold -= WEAPON_COST;
            updateGoldDisplay(player.gold);
            updateBattleLog(`Generated weapon: ${newWeapon.weaponName}`);
            displayStats(player);
        } else {
            updateBattleLog('Inventory is full!', 'death');
        }
    } else {
        updateBattleLog(`Not enough gold! Need ${WEAPON_COST} gold.`, 'death');
    }
}

// Add global functions for HTML onclick events
window.equipItem = (index) => {
    const existingTooltip = document.getElementById('item-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    player.equipItem(index);
    displayStats(player);
};

window.unequipItem = () => {
    const existingTooltip = document.getElementById('item-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    if (!player.unequipItem()) {
        updateBattleLog('Inventory is full!', 'death');
    }
    displayStats(player);
};

window.removeItem = (index) => {
    const existingTooltip = document.getElementById('item-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
    player.removeItem(index);
    displayStats(player);
};

addEventListener('generate-weapon', 'click', tryGenerateWeapon);
addEventListener('battle', 'click', async () => {
    if (isBattleActive()) {
        updateBattleLog("Cannot start a new battle while one is in progress!", "death");
        return;
    }
    const Enemy = new enemy(Math.floor(player.gold / 50));
    await battle(player, Enemy);
    updateGoldDisplay(player.gold);
});

addEventListener('show-stats', 'click', () => {
    displayStats(player);
    openStatsModal();
});
console.log(averageGearStats(100000))
initializeModalHandlers();
updateGoldDisplay(player.gold);



