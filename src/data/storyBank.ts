export interface Story {
    id: string;
    title: string;
    content: string;
    levelId: string;
    keywords: string[]; // Words to highlight that exist in our wordBank
}

export const storyBank: Story[] = [
    {
        id: "story_lvl_1",
        title: "The First Rule of the Order",
        levelId: "lvl_1",
        keywords: ["precept", "concept", "accept"],
        content: `The Grand Master laid down the first **precept** of the Order: "To understand the world, one must first **accept** it as it is."
        
The novice struggled with this **concept**. He wanted to change the world, not just watch it. But as he grasped the staff, he realized that true power comes not from force, but from taking in knowledge before acting.`
    },
    {
        id: "story_lvl_2",
        title: " The Prisoner's Dilemma",
        levelId: "lvl_2",
        keywords: ["detain", "contain", "maintain"],
        content: `The guards tried to **detain** the rogue mage, but his magic was hard to **contain**. 
        
"You cannot hold wind in a box!" he laughed.

"We do not need to hold the wind," the Captain replied, struggling to **maintain** his grip on the shield. "We only need to weather the storm until it passes."`
    },
    {
        id: "story_lvl_3",
        title: "The Signal Fire",
        levelId: "lvl_3",
        keywords: ["transmit", "submit", "intermittent"],
        content: `The beacon was **intermittent**, flickering in the storm. The scout knew he had to **transmit** the warning before the enemy arrived.
        
He refused to **submit** to the cold. With trembling hands, he added the last of his oil to the fire. The flame roared up, sending a clear message across the valley: "We stand ready."`
    },
    {
        id: "story_lvl_4",
        title: "The Timekeeper's Watch",
        levelId: "lvl_4",
        keywords: ["chronicle", "synchronize", "temporary"],
        content: `The old clockmaker had a **temporary** solution for the town's broken tower clock. He would **synchronize** his own pocket watch with the sun every morning.
        
"Why bother?" asked the mayor.
        
"Because a town without time has no history," the clockmaker said. "I do not just keep the hour; I keep the **chronicle** of our lives ticking forward."`
    },
    {
        id: "story_lvl_5",
        title: "The Silent Symphony",
        levelId: "lvl_5",
        keywords: ["symphony", "audience", "phone"],
        content: `The conductor raised his baton, but the orchestra played no sound. The **symphony** was silence.
        
The **audience** was confused at first, then they began to hear the sounds of the world outside—the wind, the birds, a distant bell.
        
"Sometimes," the conductor said, speaking into a **microphone** (or rather, a rudimentary megaphone), "we must stop making noise to truly hear the music of life."`
    },
    {
        id: "story_lvl_6",
        title: "The Forgotten Script",
        levelId: "lvl_6",
        keywords: ["describe", "script", "scribble"],
        content: `In the dusty ruins, an explorer found a stone with a strange **script**. She tried to **describe** it in her journal, but the shapes defied words.
        
It wasn't just a random **scribble**. As she traced the lines, she realized it was a map. Not of land, but of stars. The ancients hadn't just looked up; they had written the sky down.`
    }
];
