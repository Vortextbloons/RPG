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

function createTooltip(item) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.id = 'item-tooltip';
    tooltip.innerHTML = `
        <div class="item-name">${item.weaponName}</div>
        <div class="stat-line">
            <span>Damage:</span>
            <span>${item.stats.damage}</span>
        </div>
        <div class="stat-line">
            <span>Crit Chance:</span>
            <span>${item.stats.critChance}%</span>
        </div>
        <div class="stat-line">
            <span>Crit Damage:</span>
            <span>${item.stats.critDamage}x</span>
        </div>
        <div class="stat-line">
            <span>Attack Speed:</span>
            <span>${item.stats.attackSpeed}</span>
        </div>
    `;
    return tooltip;
}

function updateTooltipPosition(e, tooltip) {
    const x = e.pageX + 10;
    const y = e.pageY + 10;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

function removeExistingTooltips() {
    const existingTooltip = document.getElementById('item-tooltip');
    if (existingTooltip) {
        existingTooltip.remove();
    }
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
                <div class="inventory-item" data-item-index="${i}">
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

    // Add event listeners for tooltips after rendering
    setTimeout(() => {
        const inventoryItems = document.querySelectorAll('.inventory-item');
        inventoryItems.forEach(item => {
            const itemIndex = item.dataset.itemIndex;
            const itemData = player.inventory[itemIndex];
            
            item.addEventListener('mouseenter', (e) => {
                removeExistingTooltips();
                const tooltip = createTooltip(itemData);
                document.body.appendChild(tooltip);
                updateTooltipPosition(e, tooltip);
                
                const moveHandler = (e) => updateTooltipPosition(e, tooltip);
                
                item.addEventListener('mousemove', moveHandler);
                item.addEventListener('mouseleave', () => {
                    removeExistingTooltips();
                });
            });
        });

        // Add tooltip for equipped weapon if it exists
        const equippedWeapon = document.querySelector('.equipment-slot');
        if (player.equipment.weapon) {
            equippedWeapon.addEventListener('mouseenter', (e) => {
                removeExistingTooltips();
                const tooltip = createTooltip(player.equipment.weapon);
                document.body.appendChild(tooltip);
                updateTooltipPosition(e, tooltip);
                
                const moveHandler = (e) => updateTooltipPosition(e, tooltip);
                equippedWeapon.addEventListener('mousemove', moveHandler);
                equippedWeapon.addEventListener('mouseleave', () => {
                    removeExistingTooltips();
                });
            });
        }
    }, 0);
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

export function updateHealthDisplay(player, enemy) {
    const playerHealthValue = document.getElementById('player-health-value');
    const enemyHealthValue = document.getElementById('enemy-health-value');
    const playerHealthBar = document.getElementById('player-health-bar');
    const enemyHealthBar = document.getElementById('enemy-health-bar');
    
    playerHealthValue.textContent = player.stats.health
    enemyHealthValue.textContent = enemy.stats.health
    
    
    // Update health bars
    const playerHealthPercent = (player.stats.health / 200) * 100;
    const enemyHealthPercent = (enemy.stats.health / enemy.stats.maxHealth) * 100;
    
    playerHealthBar.style.width = `${playerHealthPercent}%`;
    enemyHealthBar.style.width = `${enemyHealthPercent}%`;
}

export function showBattlePanel(show = true) {
    const panel = document.getElementById('battle-health-panel');
    panel.style.display = show ? 'block' : 'none';
}
