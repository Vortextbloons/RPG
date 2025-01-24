export function updateBattleLog(message, type) {
    const battleLog = document.getElementById('battle_log');
    const newLogEntry = document.createElement('p');
    newLogEntry.textContent = message;
    if (type) {
        newLogEntry.classList.add(`${type}-text`);
    }
    battleLog.appendChild(newLogEntry);
}

export function updateGoldDisplay(value) {
    document.getElementById('gold-amount').textContent = value;
}

export function displayStats(player) {
    const statsContainer = document.getElementById('player-stats');
    
    // Generate inventory slots HTML
    const totalSlots = player.maxInventorySize;
    let inventoryHTML = '<div class="inventory-grid">';
    
    // Fill existing items
    for (let i = 0; i < totalSlots; i++) {
        if (i < player.inventory.length) {
            const item = player.inventory[i];
            inventoryHTML += `
                <div class="inventory-item">
                    <span class="item-name">${item.weaponName}</span>
                    <div class="item-actions">
                        <button onclick="window.equipItem(${i})">Equip</button>
                        <button onclick="window.removeItem(${i})">Discard</button>
                    </div>
                </div>
            `;
        } else {
            inventoryHTML += `
                <div class="empty-slot">
                    Empty Slot
                </div>
            `;
        }
    }
    inventoryHTML += '</div>';

    statsContainer.innerHTML = `
        <div class="stats-section">
            <h3>Player Stats</h3>
            <div class="stat-item">Health: ${player.stats.health}</div>
            <div class="stat-item">Damage: ${player.stats.damage}</div>
            <div class="stat-item">Defense: ${player.stats.defense}</div>
            <div class="stat-item">Crit Chance: ${player.stats.critChance}</div>
            <div class="stat-item">Crit Damage: ${player.stats.critDamage}</div>
            <div class="stat-item">Attack Speed: ${player.stats.attackSpeed}</div>
        </div>
        <div class="equipment-section">
            <h3>Current Equipment</h3>
            <div class="equipment-slot">
                <span class="slot-name">Weapon:</span>
                <span class="item-name">${player.equipment.weapon?.weaponName ?? 'None'}</span>
                ${player.equipment.weapon ? '<button onclick="window.unequipItem()">Unequip</button>' : ''}
            </div>
        </div>
        <div class="inventory-section">
            <h3>Inventory (${player.inventory.length}/${player.maxInventorySize})</h3>
            ${inventoryHTML}
        </div>
    `;
}

export function openStatsModal() {
    const modal = document.getElementById('stats-modal');
    modal.style.display = 'block';
}

export function initializeModalHandlers() {
    const modal = document.getElementById('stats-modal');
    const closeButton = modal.querySelector('.close-modal');
    function closeModal() {
        modal.style.display = 'none';
    }
    closeButton.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
}
