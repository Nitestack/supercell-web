import { Express } from "express";
import { home } from "../Clash of Clans/home";
import { builder } from "../Clash of Clans/builder";
import { townHall } from "../Clash of Clans/Home/townHall";
import { builderHall } from "../Clash of Clans/Builder/builderHall";

export class ClashOfClansConstants {
    public static homeHeroesArray = ["Barbarian King", "Archer Queen", "Grand Warden", "Royal Champion"];
    public static homeArmyArray = ["Barracks", "Army Camp", "Laboratory", "Spell Factory", "Dark Barracks", "Dark Spell Factory", "Workshop", "Pet House"];
    public static homeDefensesArray = ["Cannon", "Archer Tower", "Clan Castle", "Mortar", "Air Defense", "Wizard Tower", "Air Sweeper", "Hidden Tesla", "Bomb Tower", "X-Bow", "Inferno Tower", "Eagle Artillery", "Giga Tesla", "Scattershot", "Giga Inferno 1", "Builder's Hut", "Giga Inferno 2"];
    public static homeTrapsArray = ["Bomb", "Spring Trap", "Air Bomb", "Giant Bomb", "Seeking Air Mine", "Skeleton Trap", "Tornado Trap"];
    public static homePetsArray = ["L.A.S.S.I", "Mighty Yak", "Electro Owl", "Unicorn"];
    public static homeTroopsArray = ["Barbarian", "Archer", "Giant", "Goblin", "Wall Breaker", "Balloon", "Wizard", "Healer", "Dragon", "P.E.K.K.A", "Baby Dragon", "Miner", "Electro Dragon", "Yeti", "Dragon Rider"];
    public static homeDarkTroopsArray = ["Minion", "Hog Rider", "Valkyrie", "Golem", "Witch", "Lava Hound", "Bowler", "Ice Golem", "Headhunter"];
    public static homeSiegeMachinesArray = ["Wall Wrecker", "Battle Blimp", "Stone Slammer", "Siege Barracks", "Log Launcher"];
    public static homeSpellsArray = ["Lightning Spell", "Healing Spell", "Rage Spell", "Jump Spell", "Freeze Spell", "Clone Spell", "Invisibility Spell", "Poison Spell", "Earthquake Spell", "Haste Spell", "Skeleton Spell", "Bat Spell"];
    public static homeResourcesArray = ["Elixir Collector", "Elixir Storage", "Gold Mine", "Gold Storage", "Dark Elixir Drill", "Dark Elixir Storage"];
    public static homeSuperTroopsArray = ["Super Barbarian", "Super Archer", "Super Giant", "Sneaky Goblin", "Super Wall Breaker", "Rocket Balloon", "Super Wizard", "Inferno Dragon"];
    public static homeDarkSuperTroopsArray = ["Super Minion", "Super Valkyrie", "Super Witch", "Ice Hound", "Super Bowler"];

    public static builderTroopsArray = ["Raged Barbarian", "Sneaky Archer", "Boxer Giant", "Beta Minion", "Bomber", "Baby Dragon", "Cannon Cart", "Night Witch", "Drop Ship", "Super P.E.K.K.A", "Hog Glider"];
    public static builderArmyArray = ["Builder Barracks", "Army Camp", "Star Laboratory"];
    public static builderDefensesArray = ["Cannon", "Archer Tower", "Double Cannon", "Firecrackers", "Hidden Tesla", "Crusher", "Guard Post", "Air Bombs", "Multi Mortar", "Roaster", "Giant Cannon", "Mega Tesla", "Lava Launcher"];
    public static builderResourcesArray = ["Elixir Collector", "Gold Mine", "Elixir Storage", "Gold Storage", "Gem Mine", "Clock Tower"];
    public static builderTrapsArray = ["Push Trap", "Spring Trap", "Mine", "Mega Mine"];

    public static laboratoryArray = [...this.homePetsArray, ...this.homeTroopsArray, ...this.homeDarkTroopsArray, ...this.homeSpellsArray, ...this.homeSiegeMachinesArray, ...this.builderTroopsArray];
};

export default class CocConstants {
    public static apply(app: Express) {
        app.locals.home = home;
        app.locals.builder = builder;
        app.locals.townHall = townHall;
        app.locals.builderHall = builderHall;
        app.locals.maxedBuilderHallLevel = builderHall.length;
        app.locals.maxedTownHallLevel = townHall.length;
    };
};