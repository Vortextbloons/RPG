import { Player, fighting, generate_weapon, generate_enemy, Item, updateDisplay } from '../main.js';

describe('Player class', () => {
    test('should initialize with default values', () => {
        const player = new Player();
        expect(player.gold).toBe(0);
        expect(player.stats.Health).toBe(100);
        expect(player.stats.Defense).toBe(0);
        expect(player.stats.Damage).toBe(0);
        expect(player.stats.Crit_Chance).toBe(0);
        expect(player.stats.Crit_Damage).toBe(0);
        expect(player.stats.AttackSpeed).toBe(1);
        expect(player.stats.Element).toBe('None');
        expect(player.inventory).toEqual([]);
    });

    test('should add item stats correctly', () => {
        const player = new Player();
        const item = {
            stats: {
                Health: 10,
                Defense: 5,
                Damage: 15,
                Crit_Chance: 2,
                Crit_Damage: 1.5,
                AttackSpeed: 0.5,
                Element: 'Fire'
            }
        };
        player.AddItemStats(item);
        expect(player.stats.Health).toBe(110);
        expect(player.stats.Defense).toBe(5);
        expect(player.stats.Damage).toBe(15);
        expect(player.stats.Crit_Chance).toBe(2);
        expect(player.stats.Crit_Damage).toBe(1.5);
        expect(player.stats.AttackSpeed).toBe(1.5);
        expect(player.stats.Element).toBe('Fire');
    });

    test('should handle undefined item stats properties', () => {
        const player = new Player();
        const item = {
            stats: {
                Health: 10,
                Damage: 15,
                Crit_Chance: 2,
                Element: 'Fire'
            }
        };
        player.AddItemStats(item);
        expect(player.stats.Health).toBe(110);
        expect(player.stats.Defense).toBe(0);
        expect(player.stats.Damage).toBe(15);
        expect(player.stats.Crit_Chance).toBe(2);
        expect(player.stats.Crit_Damage).toBe(0);
        expect(player.stats.AttackSpeed).toBe(1);
        expect(player.stats.Element).toBe('Fire');
    });

    test('should add item to inventory and update stats', () => {
        const player = new Player();
        const item = {
            stats: {
                Health: 10,
                Defense: 5,
                Damage: 15,
                Crit_Chance: 2,
                Crit_Damage: 1.5,
                AttackSpeed: 0.5,
                Element: 'Fire'
            }
        };
        player.addInventory(item);
        expect(player.inventory).toContain(item);
        expect(player.stats.Health).toBe(110);
        expect(player.stats.Defense).toBe(5);
        expect(player.stats.Damage).toBe(15);
        expect(player.stats.Crit_Chance).toBe(2);
        expect(player.stats.Crit_Damage).toBe(1.5);
        expect(player.stats.AttackSpeed).toBe(1.5);
        expect(player.stats.Element).toBe('Fire');
    });
});

describe('fighting function', () => {
    test('should correctly update player and enemy health', () => {
        const player = new Player();
        const enemy = {
            name: 'Goblin',
            stats: {
                Health: 50,
                Damage: 10,
                Defense: 5,
                Crit_Chance: 0.1,
                Crit_Damage: 1.5,
                AttackSpeed: 1
            }
        };
        player.stats.Damage = 20;
        player.stats.Crit_Chance = 0.2;
        player.stats.Crit_Damage = 2;
        player.stats.AttackSpeed = 1;

        fighting(player, enemy);

        expect(player.stats.Health).toBeLessThan(100);
        expect(enemy.stats.Health).toBeLessThan(50);
    });
});

describe('generate_weapon function', () => {
    test('should generate a weapon with correct stats', () => {
        const weapon = generate_weapon();
        expect(weapon).toHaveProperty('weapon_name');
        expect(weapon).toHaveProperty('stats');
        expect(weapon.stats).toHaveProperty('Damage');
        expect(weapon.stats).toHaveProperty('Crit_Chance');
        expect(weapon.stats).toHaveProperty('Crit_Damage');
        expect(weapon.stats).toHaveProperty('AttackSpeed');
        expect(weapon.stats).toHaveProperty('Element');
        expect(weapon.stats).toHaveProperty('Status_chance');
    });
});

describe('generate_enemy function', () => {
    test('should generate an enemy with correct stats', () => {
        const enemy = generate_enemy(5);
        expect(enemy).toHaveProperty('name');
        expect(enemy).toHaveProperty('stats');
        expect(enemy.stats).toHaveProperty('Level');
        expect(enemy.stats).toHaveProperty('Health');
        expect(enemy.stats).toHaveProperty('Damage');
        expect(enemy.stats).toHaveProperty('Crit_Chance');
        expect(enemy.stats).toHaveProperty('Crit_Damage');
        expect(enemy.stats).toHaveProperty('Defense');
        expect(enemy.stats).toHaveProperty('AttackSpeed');
        expect(enemy.stats).toHaveProperty('Coin_value');
    });
});

describe('Item class', () => {
    test('should initialize with correct properties', () => {
        const item = new Item('Test Item', 5, 'Fire', { damage: 10 });
        expect(item.name).toBe('Test Item');
        expect(item.weight).toBe(5);
        expect(item.element).toBe('Fire');
        expect(item.stats).toEqual({ damage: 10 });
    });
});

describe('updateDisplay function', () => {
    test('should update single element text content', () => {
        document.body.innerHTML = '<div id="testElement"></div>';
        updateDisplay('testElement', 'New Content');
        expect(document.getElementById('testElement').textContent).toBe('New Content');
    });

    test('should update multiple elements text content', () => {
        document.body.innerHTML = '<div id="testElement1"></div><div id="testElement2"></div>';
        updateDisplay(['testElement1', 'testElement2'], ['Content 1', 'Content 2']);
        expect(document.getElementById('testElement1').textContent).toBe('Content 1');
        expect(document.getElementById('testElement2').textContent).toBe('Content 2');
    });

    test('should update single element HTML content', () => {
        document.body.innerHTML = '<div id="testElement"></div>';
        updateDisplay('testElement', '<span>New Content</span>', 'html');
        expect(document.getElementById('testElement').innerHTML).toBe('<span>New Content</span>');
    });

    test('should update multiple elements HTML content', () => {
        document.body.innerHTML = '<div id="testElement1"></div><div id="testElement2"></div>';
        updateDisplay(['testElement1', 'testElement2'], ['<span>Content 1</span>', '<span>Content 2</span>'], 'html');
        expect(document.getElementById('testElement1').innerHTML).toBe('<span>Content 1</span>');
        expect(document.getElementById('testElement2').innerHTML).toBe('<span>Content 2</span>');
    });
});
