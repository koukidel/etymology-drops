export type LootTier = 'STANDARD' | 'RARE' | 'LEGENDARY';

export interface LootResult {
    tier: LootTier;
    reward: string;
    xp: number;
}

export function calculateLootDrop(): LootResult {
    const roll = Math.floor(Math.random() * 100) + 1;

    if (roll > 95) {
        return {
            tier: 'LEGENDARY',
            reward: 'Forbidden Fact',
            xp: 500
        };
    } else if (roll > 70) {
        return {
            tier: 'RARE',
            reward: 'Golden Card',
            xp: 200
        };
    } else {
        return {
            tier: 'STANDARD',
            reward: 'Tree Growth',
            xp: 100
        };
    }
}
