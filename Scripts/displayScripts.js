import { GAME_CONFIG } from './gameConfig.js';


const DOM = {
    battleLog: document.getElementById('battle_log'),
    goldAmount: document.getElementById('gold-amount'),
    playerStats: document.getElementById('player-stats'),
    shopItems: document.getElementById('shop-items'),
    modals: {
        stats: document.getElementById('stats-modal'),
        shop: document.getElementById('shop-modal')
    },
    levelGrid: document.getElementById('level-grid') // Add to DOM cache
};


const tooltipTemplate = document.createElement('div');
tooltipTemplate.className = 'tooltip';
tooltipTemplate.id = 'item-tooltip';

export const updateBattleLog = (() => {
    const maxMessages = GAME_CONFIG.display.maxBattleLogMessages;
    return (message, type) => {
        const entry = document.createElement('p');
        entry.textContent = message;
        type && entry.classList.add(`${type}-text`);
        DOM.battleLog.appendChild(entry);
        DOM.battleLog.scrollTop = DOM.battleLog.scrollHeight;
        
        while (DOM.battleLog.children.length > maxMessages) {
            DOM.battleLog.removeChild(DOM.battleLog.firstChild);
        }
    };
})();

export const updateGoldDisplay = value => 
    DOM.goldAmount.textContent = value;

const createTooltip = (() => {
    const formatStat = ([key, value]) => value ? `
        <div class="stat-line">
            <span>${key.charAt(0).toUpperCase() + key.slice(1)}:</span>
            <span>${key.includes('crit') ? value + (key.includes('Chance') ? '%' : 'x') : value}</span>
        </div>
    ` : '';

    return item => {
        const tooltip = tooltipTemplate.cloneNode(true);
        tooltip.innerHTML = `
            <div class="item-name">${item.name}</div>
            ${Object.entries(item.stats).map(formatStat).join('')}
        `;
        return tooltip;
    };
})();

const tooltipHandler = (() => {
    let currentTooltip = null;

    const updatePosition = (e, tooltip) => {
        const {clientX, clientY} = e;
        const {innerWidth, innerHeight} = window;
        const {width, height} = tooltip.getBoundingClientRect();
        const padding = 10;

        tooltip.style.left = `${clientX + width > innerWidth ? clientX - width - padding : clientX + padding}px`;
        tooltip.style.top = `${clientY + height > innerHeight ? clientY - height - padding : clientY + padding}px`;
    };

    return {
        add: (element, itemData) => {
            const handlers = {
                mouseenter: e => {
                    currentTooltip?.remove();
                    currentTooltip = createTooltip(itemData);
                    document.body.appendChild(currentTooltip);
                    updatePosition(e, currentTooltip);
                },
                mousemove: e => currentTooltip && updatePosition(e, currentTooltip),
                mouseleave: () => {
                    currentTooltip?.remove();
                    currentTooltip = null;
                }
            };

            Object.entries(handlers).forEach(([event, handler]) => 
                element.addEventListener(event, handler));
        }
    };
})();

export function displayStats(player) {
    const statsContainer = DOM.playerStats;

    // Fix inventory mapping to safely handle undefined items
    const inventoryHTML = Array(player.maxInventorySize).fill(null)
        .map((_, i) => {
            const item = player.inventory[i];
            return item ? `
                <div class="inventory-item" data-item-index="${i}">
                    <span class="item-name">${item.name}</span>
                    <div class="item-actions">
                        <button onclick="window.equipItem(${i})">Equip</button>
                        <button onclick="window.removeItem(${i})">Discard</button>
                    </div>
                </div>` : '<div class="empty-slot">Empty Slot</div>';
        }).join('');

    const equipmentSlots = ['weapon', 'helmets', 'chestplates', 'leggings', 'boots'];
    const equipmentHTML = equipmentSlots.map(slot => `
        <div class="equipment-slot" data-slot="${slot}">
            <span class="slot-name">${slot.charAt(0).toUpperCase() + slot.slice(1)}:</span>
            <span class="item-name">${player.equipment[slot]?.name ?? 'None'}</span>
            ${player.equipment[slot] ? `<button onclick="window.unequipItem('${slot}')">Unequip</button>` : ''}
        </div>
    `).join('');


    const stats = ['health', 'damage', 'defense', 'critChance', 'critDamage', 'attackSpeed'];
    const statsHTML = stats.map(stat =>
        `<div class="stat-item">${stat.charAt(0).toUpperCase() + stat.slice(1)}: ${player.stats[stat]}</div>`
    ).join('');

    statsContainer.innerHTML = `
        <div class="stats-section">
            <h3>Player Stats</h3>
            ${statsHTML}
        </div>
        <div class="equipment-section">
            <h3>Current Equipment</h3>
            ${equipmentHTML}
        </div>
        <div class="inventory-section">
            <h3>Inventory (${player.inventory.length}/${player.maxInventorySize})</h3>
            <div class="inventory-grid">${inventoryHTML}</div>
        </div>
    `;

    setTimeout(() => {
        // Add tooltip listeners for inventory items
        document.querySelectorAll('.inventory-item').forEach(item => {
            const itemData = player.inventory[item.dataset.itemIndex];
            if (itemData) { // Only add listener if item exists
                tooltipHandler.add(item, itemData);
            }
        });

        // Add tooltip listeners for equipped items
        equipmentSlots.forEach(slot => {
            const element = document.querySelector(`.equipment-slot[data-slot="${slot}"]`);
            const equippedItem = player.equipment[slot];
            if (equippedItem) {
                tooltipHandler.add(element, equippedItem);
            }
        });
    });
}

export function openStatsModal() {
    const modal = DOM.modals.stats;
    modal.style.display = 'block';
}

export function initializeModalHandlers() {
    const modalTypes = ['stats', 'shop'];
    const handlers = {};
    
    modalTypes.forEach(type => {
        const modal = DOM.modals[type];
        const closeModal = () => modal.style.display = 'none';
        
        modal.querySelector('.close-modal').addEventListener('click', closeModal);
        handlers[type] = { modal, close: closeModal };
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            event.target.style.display = 'none';
        }
    });
}

// Optimize shop display by removing redundant HTML string concatenation
export function displayShop(player, category = 'weapons') {
    const shopItems = DOM.shopItems;
    const shopConfig = {
        weapons: [
            GAME_CONFIG.shop.items.basicWeapon,
            GAME_CONFIG.shop.items.premiumWeapon
        ],
        armor: [
            GAME_CONFIG.shop.items.basicArmor,
            GAME_CONFIG.shop.items.premiumArmor
        ]
    };

    // Remove createShopItem and clone from template instead
    function updateShopDisplay(selectedCategory) {
        shopItems.innerHTML = '';
        const template = document.getElementById('shop-item-template');
        shopConfig[selectedCategory].forEach(item => {
            const clone = template.content.cloneNode(true);
            const shopItem = clone.querySelector('.shop-item');
            shopItem.dataset.price = item.price;
            shopItem.dataset.type = item.type;
            
            clone.querySelector('.item-name').textContent = item.name;
            clone.querySelector('.item-description').textContent = item.description;
            clone.querySelector('.shop-item-price').textContent = item.price + ' Gold';

            const button = clone.querySelector('button');
            const canAfford = player.gold >= item.price;
            
            // Add visual feedback for affordability
            if (!canAfford) {
                button.classList.add('cant-afford');
                shopItem.classList.add('unaffordable');
            }
            
            button.textContent = canAfford ? 'Buy Now' : 'Not Enough Gold';
            button.disabled = !canAfford;
            button.setAttribute('onclick', `window.buyItem('${item.type}', ${item.price})`);

            shopItems.appendChild(clone);
        });
    }

    // Initialize shop tabs
    document.querySelectorAll('.shop-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            updateShopDisplay(tab.dataset.category);
        });
    });

    // Show initial category
    updateShopDisplay(category);
}

// Add purchase animation handler
export function animatePurchase(type, price) {
    const items = document.querySelectorAll('.shop-item');
    items.forEach(item => {
        if (item.dataset.type === type && Number(item.dataset.price) === price) {
            item.classList.add('purchase-animation');
            setTimeout(() => item.classList.remove('purchase-animation'), 300);
        }
    });
}

export function openShopModal(player) {  // Add player parameter
    const modal = DOM.modals.shop;
    modal.style.display = 'block';
    
    // Reset to weapons tab when opening shop
    const weaponsTab = document.querySelector('.shop-tab[data-category="weapons"]');
    const armorTab = document.querySelector('.shop-tab[data-category="armor"]');
    
    if (weaponsTab && armorTab) {
        weaponsTab.classList.add('active');
        armorTab.classList.remove('active');
        displayShop(player, 'weapons'); // Use passed player parameter
    }
}

// Add export to the function
export function initializeLevelSelector(currentSelectedLevel, player) {
    console.log(player.unlockedData.unlockedLevel)
    const unlockedLevel = player.unlockedData.unlockedLevel;
    console.log(unlockedLevel)
    const visibleLevels = 10;
    let currentStartLevel = Math.max(1, currentSelectedLevel - Math.floor(visibleLevels/2));
    
    const renderLevelButtons = (startLevel) => {
        return Array.from({ length: visibleLevels }, (_, i) => {
            const level = startLevel + i;
            const isUnlocked = level <= unlockedLevel;
            const isCurrent = level === currentSelectedLevel;
            
            return `
                <button 
                    class="level-btn ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}"
                    onclick="window.selectLevel(${level})"
                    ${!isUnlocked ? 'disabled' : ''}
                >
                    ${level}
                </button>
            `;
        }).join('');
    };

    const updateDisplay = () => {
        DOM.levelGrid.innerHTML = `
            <button class="level-nav prev-levels" ${currentStartLevel <= 1 ? 'disabled' : ''}>←</button>
            <div class="level-numbers">
                ${renderLevelButtons(currentStartLevel)}
            </div>
            <button class="level-nav next-levels">→</button>
        `;

        // Add navigation handlers
        DOM.levelGrid.querySelector('.prev-levels').addEventListener('click', () => {
            if (currentStartLevel > 1) {
                currentStartLevel = Math.max(1, currentStartLevel - visibleLevels);
                updateDisplay();
            }
        });

        DOM.levelGrid.querySelector('.next-levels').addEventListener('click', () => {
            currentStartLevel += visibleLevels;
            updateDisplay();
        });
    };

    updateDisplay();
}
