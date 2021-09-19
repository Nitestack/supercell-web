//IMPORTANT VALUES (edit in ../Views/Includes/constants.pug too)
export const homeHeroesArray = ["Barbarian King", "Archer Queen", "Grand Warden", "Royal Champion"];
export const homeArmyArray = ["Barracks", "Army Camp", "Laboratory", "Spell Factory", "Dark Barracks", "Dark Spell Factory", "Workshop", "Pet House"];
export const homeDefensesArray = ["Cannon", "Archer Tower", "Clan Castle", "Mortar", "Air Defense", "Wizard Tower", "Air Sweeper", "Hidden Tesla", "Bomb Tower", "X-Bow", "Inferno Tower", "Eagle Artillery", "Giga Tesla", "Scattershot", "Giga Inferno 1", "Builder's Hut", "Giga Inferno 2"];
export const homeTrapsArray = ["Bomb", "Spring Trap", "Air Bomb", "Giant Bomb", "Seeking Air Mine", "Skeleton Trap", "Tornado Trap"];
export const homePetsArray = ["L.A.S.S.I", "Mighty Yak", "Electro Owl", "Unicorn"];
export const homeTroopsArray = ["Barbarian", "Archer", "Giant", "Goblin", "Wall Breaker", "Balloon", "Wizard", "Healer", "Dragon", "P.E.K.K.A", "Baby Dragon", "Miner", "Electro Dragon", "Yeti", "Dragon Rider"];
export const homeDarkTroopsArray = ["Minion", "Hog Rider", "Valkyrie", "Golem", "Witch", "Lava Hound", "Bowler", "Ice Golem", "Headhunter"]; 
export const homeSiegeMachinesArray = ["Wall Wrecker", "Battle Blimp", "Stone Slammer", "Siege Barracks", "Log Launcher"];
export const homeSpellsArray = ["Lightning Spell", "Healing Spell", "Rage Spell", "Jump Spell", "Freeze Spell", "Clone Spell", "Invisibility Spell", "Poison Spell", "Earthquake Spell", "Haste Spell", "Skeleton Spell", "Bat Spell"];
export const homeResourcesArray = ["Elixir Collector", "Elixir Storage", "Gold Mine", "Gold Storage", "Dark Elixir Drill", "Dark Elixir Storage"];

export const builderTroopsArray = ["Raged Barbarian", "Sneaky Archer", "Boxer Giant", "Beta Minion", "Bomber", "Baby Dragon", "Cannon Cart", "Night Witch", "Drop Ship", "Super P.E.K.K.A", "Hog Glider"];
export const builderArmyArray = ["Builder Barracks", "Army Camp", "Star Laboratory"];
export const builderDefensesArray = ["Cannon", "Archer Tower", "Double Cannon", "Firecrackers", "Hidden Tesla", "Crusher", "Guard Post", "Air Bombs", "Multi Mortar", "Roaster", "Giant Cannon", "Mega Tesla", "Lava Launcher"];
export const builderResourcesArray = ["Elixir Collector", "Gold Mine", "Elixir Storage", "Gold Storage", "Gem Mine", "Clock Tower"];
export const builderTrapsArray = ["Push Trap", "Spring Trap", "Mine", "Mega Mine"];

export const laboratoryArray = [...homePetsArray, ...homeTroopsArray, ...homeDarkTroopsArray, ...homeSpellsArray, ...homeSiegeMachinesArray, ...builderTroopsArray];