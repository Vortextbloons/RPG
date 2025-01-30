export const GAME_CONFIG = {
    player: {
        startingGold: 300,
        baseHealth: 125,
        baseDamage: 25,
        baseDefense: 0,
        baseCritChance: 0,
        baseCritDamage: 0,
        baseAttackSpeed: 3,
        maxInventorySize: 10
    },

    shop: {
        items: {
            basicWeapon: {
                name: "Basic Weapon Pack",
                price: 75,
                type: "weapon",
                description: "A random basic weapon"
            },
            premiumWeapon: {
                name: "Premium Weapon Pack",
                price: 800,
                type: "weapon",
                description: "Better chance for rare weapons"
            },
            basicArmor: {
                name: "Basic Armor Pack",
                price: 50,
                type: "armor",
                description: "A random piece of basic armor"
            },
            premiumArmor: {
                name: "Premium Armor Pack",
                price: 760,
                type: "armor",
                description: "Better chance for rare armor"
            }
        }
    },

    battle: {
        enemyScaling: {
            healthMultiplier: 1.15,
            defenseMultiplier: 1,
            damageMultiplier: 1,
            critMultiplier: 1,
            goldLossOnDeath: 0.75
        },
        animations: {
            attackDelay: 500
        }
    },

    display: {
        maxBattleLogMessages: 100
    },

    levels: {
        levelScaling: {
            health: 1.25,
            damage: 1.15,
            defense: 1.1,
            goldReward: 1.5
        }
    }
};
