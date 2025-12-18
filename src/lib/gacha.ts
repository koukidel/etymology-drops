export type GachaRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface GachaItem {
    id: string;
    type: 'shield' | 'part' | 'story';
    name: string;
    description: string;
    rarity: GachaRarity;
    icon: string;
}

const DROP_RATES = {
    common: 0.60,
    rare: 0.30,
    epic: 0.09,
    legendary: 0.01
};

const ITEMS: GachaItem[] = [
    // Shields
    { id: 'shield_1', type: 'shield', name: 'Streak Shield', description: 'Protects your streak for one day.', rarity: 'common', icon: '🛡️' },

    // Custom Parts (Prefixes)
    { id: 'part_pre', type: 'part', name: 'Ancient "Pre-"', description: 'A glowing prefix from the old world.', rarity: 'rare', icon: '🧩' },
    { id: 'part_re', type: 'part', name: 'Golden "Re-"', description: 'Shines with the power of repetition.', rarity: 'rare', icon: '✨' },
    { id: 'part_con', type: 'part', name: 'Void "Con-"', description: 'Absorbs all meaning.', rarity: 'epic', icon: '🌌' },

    // Stories
    { id: 'story_pie', type: 'story', name: 'The First Word', description: 'The legend of the Proto-Indo-Europeans.', rarity: 'legendary', icon: '📜' },
    { id: 'story_latin', type: 'story', name: 'Rome\'s Legacy', description: 'How Latin conquered the world.', rarity: 'epic', icon: '🏛️' },
];

export function rollGacha(): GachaItem {
    const rand = Math.random();
    let rarity: GachaRarity = 'common';

    if (rand > 0.99) rarity = 'legendary';
    else if (rand > 0.90) rarity = 'epic';
    else if (rand > 0.60) rarity = 'rare';

    const pool = ITEMS.filter(item => item.rarity === rarity);

    // Fallback if pool is empty (shouldn't happen with good config)
    if (pool.length === 0) return ITEMS[0];

    return pool[Math.floor(Math.random() * pool.length)];
}
