import { addEventListener } from "./Scripts/Util.js";
import { generateWeapon, generateArmor } from "./Scripts/itemHandling.js";
import { Player, Enemy } from "./Scripts/player&enemy.js";
import { battle, isBattleActive } from "./Scripts/fightingLogic.js";
import {
    updateGoldDisplay,
    updateBattleLog,
    displayStats,
    initializeModalHandlers,
    openStatsModal,
    displayShop,
    openShopModal,
    initializeLevelSelector  // Add this import
} from "./Scripts/displayScripts.js";
import { GAME_CONFIG } from './Scripts/gameConfig.js';

// Initialize player and load game
const player = new Player();
let selectedLevel = 1;

// Move displayStats after loading game data


// Initialize game
loadGame(player);
initializeModalHandlers();
initializeLevelSelector(selectedLevel, player);
displayStats(player); // Move this after loading game data
updateGoldDisplay(player.gold);


function handleTooltipAndAction(action) {
    document.getElementById('item-tooltip')?.remove();
    action();
}

window.equipItem = index => handleTooltipAndAction(() => {
    const item = player.inventory[index];
    const slot = item.armorType || 'weapon';

    if (player.equipment[slot]) {
        updateBattleLog(`Cannot equip item. ${slot} slot is occupied. Unequip first.`, 'death');
        return;
    }

    player.equipItem(index, slot);
    displayStats(player);
});

window.unequipItem = slot => handleTooltipAndAction(() => {
    if (!player.unequipItem(slot)) {
        updateBattleLog('Inventory is full!', 'death');
    }
    displayStats(player);
});

window.removeItem = index => handleTooltipAndAction(() => {
    player.removeItem(index);
    displayStats(player);
});

window.buyItem = (type, price) => {
    if (player.gold < price) {
        updateBattleLog('Not enough gold!', 'death');
        return;
    }

    if (player.inventory.length >= player.maxInventorySize) {
        updateBattleLog('Inventory is full!', 'death');
        return;
    }

    player.gold -= price;
    updateGoldDisplay(player.gold);

    const item = type === 'weapon' ? generateWeapon() : generateArmor();
    if (player.addInventory(item)) {
        updateBattleLog(`Bought ${type}: ${item.name}`, 'victory');
        displayStats(player);
        
        // Keep current shop tab active
        const activeTab = document.querySelector('.shop-tab.active');
        const currentCategory = activeTab ? activeTab.dataset.category : 'weapons';
        displayShop(player, currentCategory); 
    }
};

addEventListener('start-battle', 'click', async () => {
    if (isBattleActive()) {
        updateBattleLog("Cannot start a new battle while one is in progress!", "death");
        return;
    }
    const enemy = new Enemy(selectedLevel);
    const battleResult = await battle(player, enemy);
    
    // Handle victory and level unlocking - fixed logic
    if (battleResult && enemy.stats.health <= 0) {
        // If current selected level is completed, unlock next level
        if (selectedLevel >= GAME_CONFIG.levels.unlockedLevel) {
            GAME_CONFIG.levels.unlockedLevel = selectedLevel + 1;
            updateBattleLog(`Level ${selectedLevel + 1} unlocked!`, 'victory');
            initializeLevelSelector(); // Refresh level display
        }
        saveGame(player); // Save progress when level is unlocked
    }
    
    updateGoldDisplay(player.gold);
});

addEventListener('show-stats', 'click', () => {
    displayStats(player);
    openStatsModal();
});

addEventListener('show-shop', 'click', () => {
    displayShop(player);
    openShopModal(player);  // Pass player object here
});
console.log(player.unlockedData)
window.selectLevel = (level) => {
    const { unlockedLevel } = player.unlockedData.unlockedLevel
    if (level > unlockedLevel) return;
    selectedLevel = level;
    initializeLevelSelector(selectedLevel, player); // Pass selectedLevel
    // Remove the manual button updates since initializeLevelSelector will handle it
};

setInterval(() => saveGame(player), 5000);

// admin menu 
window.addEventListener('keypress', (e) => {
    if (e.key !== "@") return;
    const command = prompt("Enter command");
    if (command === "clear") {
        clearStorage();
         
    }
}
);
function saveGame(player) {
    const saveData = {
        gold: player.gold,
        stats: player.stats,
        equipment: player.equipment,
        inventory: player.inventory,
        unlockedData: player.unlockedData
    };

    localStorage.setItem('rpgSaveData', JSON.stringify(saveData));
}
function loadGame(player) {
    const saveData = localStorage.getItem('rpgSaveData');
    if (!saveData) return false;
    
    const data = JSON.parse(saveData);
    Object.assign(player, {
        gold: data.gold || 300,
        stats: data.stats || player.stats,
        equipment: data.equipment || player.equipment,
        inventory: Array.isArray(data.inventory) ? data.inventory : [],
        unlockedData: data.unlockedData || player.unlockedData
        
    });
    return true;
}

function clearStorage(){
    localStorage.clear();
    location.reload()
    console.log(localStorage)
    console.log("Cleared local storage");
}
console.log(player)
displayStats(player);

initializeModalHandlers(player);
initializeLevelSelector(selectedLevel, player); // Update initial call to pass selectedLevel
updateGoldDisplay(player.gold);



