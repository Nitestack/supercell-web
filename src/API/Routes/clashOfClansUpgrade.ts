import { Router } from "express";
import { API } from "../../index";
import { Player } from "clashofclans.js";
import { townHall } from "../../Configuration/Database/Clash of Clans/Home/townHall";
import { builderHall } from "../../Configuration/Database/Clash of Clans/Builder/builderHall";
import { ClashOfClansVillage } from "../../Configuration/Database/Models/clashofclans";
import { home } from "../../Configuration/Database/Clash of Clans/home";
import { builder } from "../../Configuration/Database/Clash of Clans/builder";
import Util from "../../Configuration/Util";
import Constants from "../../Configuration/Database/Constants/index";
import Database from "../../Configuration/Database/Models/index";

const Coc = Constants.ClashOfClans;

/**
 * Checks for an hash and adds it if it is not included
 * @param {string} tag The player tag 
 */
function checkForHash(tag: string) {
    return tag.includes("#") ? tag.toUpperCase() : `#${tag.toUpperCase()}`;
};

class CocUpgradeRouter {
    constructor() {
        this.router = Router();
        /**
         * Upgrade Tracker
         */
        this.router.get("/upgrade-tracker/clashofclans", (req, res) => res.render("Upgrade/Clash of Clans/Authentication/index", {
            subTitle: "Upgrade Tracker"
        }));

        /**
         * Switch village
         */
        this.router.get("/upgrade-tracker/clashofclans/:playerTag", async (req, res) => {
            //Searches for a player in the database
            const playerSchema = await Database.ClashOfClansVillage.findOne({
                playerTag: checkForHash(req.params.playerTag)
            });
            //If the player doesn't exists
            if (!playerSchema) return res.redirect("/upgrade-tracker/clashofclans");
            return res.render("Upgrade/Clash of Clans/switchVillage", {
                player: playerSchema.player
            });
        });

        /**
         * Home Village
         */
        this.router.get("/upgrade-tracker/clashofclans/:playerTag/home", async (req, res) => {
            try {
                //Searches for a player in the database
                const playerSchema = await Database.ClashOfClansVillage.findOne({
                    playerTag: checkForHash(req.params.playerTag)
                });
                //If a player exists in the database
                if (playerSchema) {
                    const { player } = playerSchema;
                    await updateLevels(playerSchema, "home");
                    res.render("Upgrade/Clash of Clans/index", {
                        player: player,
                        village: "home",
                        database: playerSchema,
                        statsTotal: getTotalCostsAndTimes(playerSchema, "home")
                    });
                } else res.redirect("/upgrade-tracker/clashofclans");
            } catch (err) {
                console.log(err);
            };
        });

        /**
         * Builder Base
         */
        this.router.get("/upgrade-tracker/clashofclans/:playerTag/builder", async (req, res) => {
            try {
                const playerSchema = await Database.ClashOfClansVillage.findOne({
                    playerTag: checkForHash(req.params.playerTag)
                });
                if (playerSchema) {
                    const { player } = playerSchema;
                    await updateLevels(playerSchema, "builder");
                    res.render("Upgrade/Clash of Clans/index", {
                        player: player,
                        village: "builder",
                        database: playerSchema,
                        statsTotal: getTotalCostsAndTimes(playerSchema, "builder")
                    });
                };
            } catch (err) {
                console.log(err);
            };
        });

        /**
         * Redirects to a page to choose village
         */
        this.router.post("/upgrade-tracker/clashofclans/chooseVillage", (req, res) => {
            const player: Player = JSON.parse(req.body.player);
            res.render("Upgrade/Clash of Clans/switchVillage", {
                player: player
            });
        });

        /**
         * Manages the player after the user clicked the "PROCEED" button
         */
        this.router.post("/upgrade-tracker/clashofclans/managePlayer", async (req, res) => {
            try {
                const player: Player = JSON.parse(req.body.player);
                /*REDIRECT TO SET UP HOME STRUCTURES*/
                res.render("redirect", {
                    action: "/upgrade-tracker/clashofclans/home/new",
                    name: "player",
                    value: player
                });
            } catch (err) {
                console.log(err);
                res.render("Errors/404");
            };
        });

        /**
         * Redirects to the page to set the home village structures
         */
        this.router.post("/upgrade-tracker/clashofclans/home/new", async (req, res) => {
            const player: Player = JSON.parse(req.body.player);
            res.render("Upgrade/Clash of Clans/editHomeStructures", {
                player: player,
                village: "home"
            });
        });

        /**
         * Redirects to the page to set the builder base structures
         */
        this.router.post("/upgrade-tracker/clashofclans/builder/new", async (req, res) => {
            const player: Player = JSON.parse(req.body.player);
            res.render("Upgrade/Clash of Clans/editBuilderStructures", {
                player: player,
                village: "builder"
            });
        });

        /**
         * Sets the home village structures
         */
        this.router.post("/upgrade-tracker/clashofclans/home/structures/set", async (req, res) => {
            try {
                const player: Player = JSON.parse(req.body.player);
                const object = prepareObject(req.body, player, "home", true);
                //@ts-ignore
                const playerSchema = await Database.ClashOfClansVillage.findOne({ playerTag: checkForHash(player.tag) });
                await Database.ClashOfClansVillage.findOneAndUpdate({
                    playerTag: checkForHash(player.tag)
                }, {
                    playerTag: checkForHash(player.tag),
                    player: player,
                    homeVillage: object,
                    builderSeasonBoost: playerSchema?.builderSeasonBoost || 0,
                    researchSeasonBoost: playerSchema?.researchSeasonBoost || 0,
                    homeVillageBuilder: playerSchema?.homeVillageBuilder || [],
                    homeLab: playerSchema?.homeLab || [],
                    petHouse: playerSchema?.petHouse || [],
                    otto: playerSchema?.otto || {
                        unlocked: false,
                        builder: [],
                        currentVillage: "builder"
                    }
                }, {
                    upsert: true
                });
                if (player.builderHallLevel && !playerSchema?.builderBase) {
                    res.render("redirect", {
                        action: "/upgrade-tracker/clashofclans/builder/new",
                        name: "player",
                        value: player
                    });
                } else res.redirect("/upgrade-tracker/clashofclans/" + player.tag.replace(/#/g, "") + "/home");
            } catch (err) {
                console.log(err);
            };
        });

        /**
         * Sets the builder base structures
         */
        this.router.post("/upgrade-tracker/clashofclans/builder/structures/set", async (req, res) => {
            try {
                const player: Player = JSON.parse(req.body.player);
                const object = prepareObject(req.body, player, "builder", true);
                object["Builder"] = 1;
                const playerSchema = await Database.ClashOfClansVillage.findOne({ playerTag: checkForHash(player.tag) });
                await Database.ClashOfClansVillage.findOneAndUpdate({
                    playerTag: checkForHash(player.tag)
                }, {
                    playerTag: checkForHash(player.tag),
                    player: player,
                    builderBase: object,
                    builderSeasonBoost: playerSchema?.builderSeasonBoost || 0,
                    researchSeasonBoost: playerSchema?.researchSeasonBoost || 0,
                    builderBaseBuilder: playerSchema?.builderBaseBuilder || [],
                    builderLab: playerSchema?.builderLab || [],
                    otto: playerSchema?.otto || {
                        unlocked: false,
                        builder: [],
                        currentVillage: "builder"
                    }
                }, {
                    upsert: true
                });
                if (player.townHallLevel && !playerSchema?.homeVillage) {
                    res.render("redirect", {
                        action: "/upgrade-tracker/clashofclans/home/new",
                        name: "player",
                        value: player
                    });
                } else res.redirect("/upgrade-tracker/clashofclans/" + player.tag.replace(/#/g, "") + "/builder");
            } catch (err) {
                console.log(err);
            };
        });

        /**
         * Redirects to the other opposite village
         */
        this.router.post("/upgrade-tracker/clashofclans/redirectToOtherVillage", (req, res) => {
            const { playerTag, village } = req.body;
            res.redirect("/upgrade-tracker/clashofclans/" + playerTag.replace(/#/g, "") + "/" + (village == "home" ? "builder" : "home"));
        });

        /**
         * Updates the player via API
         */
        this.router.post("/upgrade-tracker/clashofclans/apiUpdate", async (req, res) => {
            const { playerTag, village } = req.body;
            try {
                const player = await API.player(checkForHash(playerTag));
                const playerSchema = await Database.ClashOfClansVillage.findOne({ playerTag: checkForHash(playerTag) });
                await Database.ClashOfClansVillage.findOneAndUpdate({
                    playerTag: checkForHash(playerTag),
                }, {
                    player: player,
                    homeVillage: prepareObject(playerSchema?.homeVillage, player, "home"),
                    builderBase: prepareObject(playerSchema?.builderBase, player, "builder")
                }, {
                    upsert: false
                });
                res.redirect("/upgrade-tracker/clashofclans/" + player.tag.replace(/#/g, "") + "/" + village);
            } catch (err) {
                console.log(err);
                res.redirect("/upgrade-tracker/clashofclans/" + playerTag.replace(/#/g, "") + "/" + village);
            };
        });

        /**
         * Set's the season boost
         */
        this.router.post("/upgrade-tracker/clashofclans/seasonBoosts", async (req, res) => {
            const { builderSeasonBoost, researchSeasonBoost, info } = req.body;
            const { playerTag, village } = JSON.parse(info);
            const builderBoost = parseInt(builderSeasonBoost.replace(/%/g, "")) as 0 | 10 | 15 | 20;
            const researchBoost = parseInt(researchSeasonBoost.replace(/%/g, "")) as 0 | 10 | 15 | 20;
            await Database.ClashOfClansVillage.findOneAndUpdate({
                playerTag: checkForHash(playerTag)
            }, {
                builderSeasonBoost: builderBoost,
                researchSeasonBoost: researchBoost
            }, {
                upsert: false
            });
            return res.redirect("/upgrade-tracker/clashofclans/" + playerTag.replace(/#/g, "") + "/" + village);
        });
    };
    public router: Router;
};

/**
 * Prepares an object
 * @param {object} structures The structures
 * @param {Player} player The player
 * @param {"home" | "builder"} village The village
 * @param {boolean?} wall If it is the first time setting structures
 */
export function prepareObject(structures: object, player: Player, village: "home" | "builder", wall?: boolean) {
    if (structures["player"]) delete structures["player"];
    if (village == "home") {
        let spellFactoryLevel: number = 0;
        if (player.townHallLevel >= 5) {
            if (player.spells) {
                if (player.spells.find(spell => spell.name == "Invisibility Spell")) spellFactoryLevel = 6;
                else if (player.spells.find(spell => spell.name == "Clone Spell")) spellFactoryLevel = 5;
                else if (player.spells.find(spell => spell.name == "Jump Spell") || player.spells.find(spell => spell.name == "freeze spell")) spellFactoryLevel = 4;
                else if (player.spells.find(spell => spell.name == "Rage Spell")) spellFactoryLevel = 3;
                else if (player.spells.find(spell => spell.name == "Healing Spell")) spellFactoryLevel = 2;
                else if (player.spells.find(spell => spell.name == "Lightning Spell")) spellFactoryLevel = 1;
            };
            structures["SpellFactory1"] = `${spellFactoryLevel}`;
        };
        let darkSpellFactoryLevel: number = 0;
        if (player.townHallLevel >= 8) {
            if (player.spells.find(spell => spell.name == "Bat Spell")) darkSpellFactoryLevel = 5;
            else if (player.spells.find(spell => spell.name == "Skeleton Spell")) darkSpellFactoryLevel = 4;
            else if (player.spells.find(spell => spell.name == "Haste Spell")) darkSpellFactoryLevel = 3;
            else if (player.spells.find(spell => spell.name == "Earthquake Spell")) darkSpellFactoryLevel = 2;
            else if (player.spells.find(spell => spell.name == "Poison Spell")) darkSpellFactoryLevel = 1;
            structures["DarkSpellFactory1"] = `${darkSpellFactoryLevel}`;
        };
        let workshopLevel: number = 0;
        if (player.townHallLevel >= 12) {
            if (player.troops.find(siegeMachine => siegeMachine.name == "Log Launcher")) workshopLevel = 5;
            else if (player.troops.find(siegeMachine => siegeMachine.name == "Siege Barracks")) workshopLevel = 4;
            else if (player.troops.find(siegeMachine => siegeMachine.name == "Stone Slammer")) workshopLevel = 3;
            else if (player.troops.find(siegeMachine => siegeMachine.name == "Battle Blimp")) workshopLevel = 2;
            else if (player.troops.find(siegeMachine => siegeMachine.name == "Wall Wrecker")) workshopLevel = 1;
            structures["Workshop1"] = `${workshopLevel}`;
        };
        let petHouseLevel: number = 0;
        if (player.townHallLevel >= 14) {
            if (player.troops.find(pet => pet.name == "Unicorn")) petHouseLevel = 4;
            else if (player.troops.find(pet => pet.name == "Electro Owl")) petHouseLevel = 3;
            else if (player.troops.find(pet => pet.name == "Mighty Yak")) petHouseLevel = 2;
            else if (player.troops.find(pet => pet.name == "L.A.S.S.I")) petHouseLevel = 1;
            structures["PetHouse1"] = `${petHouseLevel}`;
        };
        if (wall) {
            if (structures["Builder"] < 5 && player.townHallLevel >= 14) {
                structures["BuildersHut5"] = "0";
                if (structures["Builder"] < 4) {
                    structures["BuildersHut4"] = "0";
                    if (structures["Builder"] < 3) {
                        structures["BuildersHut3"] = "0";
                    };
                };
            };
            const wallObject: {} = {};
            for (const wallKey of Object.keys(structures)) {
                if (!wallKey.includes("Wall")) continue;
                else if (structures[wallKey] == "0" && parseInt(wallKey) != townHall[player.townHallLevel - 1].wall.maxLevel) {
                    delete structures[wallKey]
                    continue;
                };
                wallObject[wallKey.replace(/Wall/g, "")] = structures[wallKey];
                delete structures[wallKey];
            };
            let wallPieces: number = 0;
            for (const val of Object.values(wallObject)) wallPieces += parseInt(val as string);
            if (wallPieces < townHall[player.townHallLevel - 1].wall.amount) wallObject["0"] = `${townHall[player.townHallLevel - 1].wall.amount - wallPieces}`;
            structures["Walls"] = wallObject;
        };
    } else {
        let builderBarracksLevel: number = 1;
        if (player.troops.find(troop => troop.name == "Hog Glider")) builderBarracksLevel = 11;
        else if (player.troops.find(troop => troop.name == "Super P.E.K.K.A")) builderBarracksLevel = 10;
        else if (player.troops.find(troop => troop.name == "Drop Ship")) builderBarracksLevel = 9;
        else if (player.troops.find(troop => troop.name == "Night Witch")) builderBarracksLevel = 8;
        else if (player.troops.find(troop => troop.name == "Cannon Cart")) builderBarracksLevel = 7;
        else if (player.troops.find(troop => troop.name == "Baby Dragon" && troop.village == "builderBase")) builderBarracksLevel = 6;
        else if (player.troops.find(troop => troop.name == "Bomber")) builderBarracksLevel = 5;
        else if (player.troops.find(troop => troop.name == "Beta Minion")) builderBarracksLevel = 4;
        else if (player.troops.find(troop => troop.name == "Boxer Giant")) builderBarracksLevel = 3;
        else if (player.troops.find(troop => troop.name == "Sneaky Archer")) builderBarracksLevel = 2;
        structures["BuilderBarracks1"] = `${builderBarracksLevel}`;
        if (wall) {
            const wallObject: {} = {};
            for (const wallKey of Object.keys(structures)) {
                if (!wallKey.includes("Wall")) continue;
                //@ts-ignore
                else if (structures[wallKey] == "0" && parseInt(wallKey) != builderHall[player.builderHallLevel - 1].wall.maxLevel ? builderHall[player.builderHallLevel - 1].wall.maxLevel : player.builderHallLevel) {
                    delete structures[wallKey]
                    continue;
                };
                wallObject[wallKey.replace(/Wall/g, "")] = structures[wallKey];
                delete structures[wallKey];
            };
            let wallPieces: number = 0;
            for (const val of Object.values(wallObject)) wallPieces += parseInt(val as string);
            //@ts-ignore
            if (wallPieces < builderHall[player.builderHallLevel - 1].wall) wallObject["0"] = `${builderHall[player.builderHallLevel - 1].wall.amount ? builderHall[player.builderHallLevel - 1].wall.amount : builderHall[player.builderHallLevel - 1].wall - wallPieces}`;
            structures["Walls"] = wallObject;
        };
    };
    return structures;
};

/**
 * Updates the level when an element has finished upgrading
 * @param {ClashOfClansVillage} playerSchema The player of the database 
 * @param {"home" | "builder"} village The village
 */
export async function updateLevels(playerSchema: ClashOfClansVillage, village: "home" | "builder") {
    let updateDatabase = false;
    const { player } = playerSchema;
    //Check if an builder has finished
    const builder = playerSchema[village == "home" ? "homeVillageBuilder" : "builderBaseBuilder"];
    if (playerSchema.otto.unlocked && playerSchema.otto.currentVillage == village && playerSchema.otto.builder[0]) {
        const building = playerSchema.otto.builder[0];
        if (Date.now() >= building.start.getTime() + building.durationInMilliseconds) {
            if ([...Coc.homeHeroesArray, "Battle Machine"].includes(building.name)) {
                const hero = player.heroes.find(unit => unit.name.toLowerCase() == building.name.toLowerCase());
                if (hero) player.heroes.splice(player.heroes.indexOf(hero), 1, {
                    ...hero,
                    level: building.currentLevel + 1
                });
            } else playerSchema.homeVillage[Util.convertToDatabaseName(building.name) + building.id] = `${building.currentLevel + 1}`;
            playerSchema.otto.builder = [];
            updateDatabase = true;
        };
    };
    for (const building of builder) if (Date.now() >= building.start.getTime() + building.durationInMilliseconds) {
        if ([...Coc.homeHeroesArray, "Battle Machine"].includes(building.name)) {
            const hero = player.heroes.find(unit => unit.name.toLowerCase() == building.name.toLowerCase());
            if (hero) player.heroes.splice(player.heroes.indexOf(hero), 1, {
                ...hero,
                level: building.currentLevel + 1
            });
        } else playerSchema.homeVillage[Util.convertToDatabaseName(building.name) + building.id] = `${building.currentLevel + 1}`;
        playerSchema[village == "home" ? "homeVillageBuilder" : "builderBaseBuilder"].splice(playerSchema[village == "home" ? "homeVillageBuilder" : "builderBaseBuilder"].indexOf(building), 1);
        updateDatabase = true;
    };
    //Check if the lab has finished
    const lab = playerSchema[(village + "Lab")][0];
    if (lab && Date.now() >= lab.start.getTime() + lab.durationInMilliseconds) {
        const isSpell = player.spells.find(spell => spell.name.toLowerCase() == lab.name.toLowerCase());
        if (isSpell) player.spells.splice(player.spells.indexOf(isSpell), 1, {
            ...isSpell,
            level: lab.currentLevel + 1
        });
        else {
            const troop = player.troops.find(unit => unit.name.toLowerCase() == lab.name.toLowerCase() && unit.village.toLowerCase() == village.toLowerCase());
            if (troop) player.troops.splice(player.troops.indexOf(troop), 1, {
                ...troop,
                level: lab.currentLevel + 1
            });
        };
        playerSchema[(village + "Lab")] = [];
        updateDatabase = true;
    };
    //Check if pet house has finished
    const petHouse = playerSchema.petHouse[0];
    if (petHouse && Date.now() >= petHouse.start.getTime() + petHouse.durationInMilliseconds) {
        const pet = player.troops.find(unit => unit.name.toLowerCase() == petHouse.name.toLowerCase());
        if (pet) player.troops.splice(player.troops.indexOf(pet), 1, {
            ...pet,
            level: petHouse.currentLevel + 1
        });
        playerSchema.petHouse = [];
        updateDatabase = true;
    };
    if (updateDatabase && village == "home") await Database.ClashOfClansVillage.findOneAndUpdate({
        playerTag: checkForHash(player.tag)
    }, {
        homeVillage: playerSchema.homeVillage,
        homeVillageBuilder: playerSchema.homeVillageBuilder,
        homeLab: playerSchema.homeLab,
        player: player,
        otto: playerSchema.otto
    }, {
        upsert: false
    });
    else if (updateDatabase && village == "builder") await Database.ClashOfClansVillage.findOneAndUpdate({
        playerTag: checkForHash(player.tag)
    }, {
        builderBase: playerSchema.builderBase,
        builderBaseBuilder: playerSchema.builderBaseBuilder,
        builderLab: playerSchema.builderLab,
        player: player,
        otto: playerSchema.otto
    }, {
        upsert: false
    })
    return updateDatabase;
};

/**
 * Gets the total costs and the total time and split them in categories
 * @param {ClashOfClansVillage} playerSchema The player of the database 
 * @param {"home" | "builder"} village The village
 */
export function getTotalCostsAndTimes(playerSchema: ClashOfClansVillage, village: "home" | "builder") {
    const structures = village == "home" ? [...Coc.homeDefensesArray, ...Coc.homeTrapsArray, ...Coc.homeArmyArray, ...Coc.homeResourcesArray] : [...Coc.builderDefensesArray, ...Coc.builderTrapsArray, ...Coc.builderArmyArray, ...Coc.builderResourcesArray];
    const base = playerSchema[village == "home" ? "homeVillage" : "builderBase"];
    const totalCosts = {};
    const sectionCosts = {};
    /**
     * The time for `structures`, `laboratory`, `pet house`, `heroes`
     * Time is given in seconds
     */
    const timeForSections = {};
    /**
     * The total time sections: `builder`, `laboratory`
     * Time is given in seconds
     */
    const totalTimeSections = {};
    sectionCosts["totalStructuresCosts"] = {};
    for (const buildingName of structures) {
        const hallItem = Util.getHallItem(buildingName, village == "home" ? playerSchema?.player.townHallLevel : playerSchema?.player.builderHallLevel, village);
        if (!hallItem) continue;
        if (buildingName.toLowerCase() == "army camp" && village == "builder") {
            //@ts-ignore
            for (let id = 1; id <= (hallItem.amount || hallItem); id++) {
                const level = parseInt(base[Util.convertToDatabaseName(buildingName) + id]) || 0;
                if (level != 0) continue;
                const targetLevel = builder.find(el => el.name.toLowerCase() == buildingName.toLowerCase())[id - 1];
                //Add costs to the total costs
                if (!totalCosts[targetLevel.costType]) totalCosts[targetLevel.costType] = 0;
                totalCosts[targetLevel.costType] += targetLevel.costs;
                //Add costs to the section costs
                if (!sectionCosts["totalStructuresCosts"][targetLevel.costType]) sectionCosts["totalStructuresCosts"][targetLevel.costType] = 0;
                sectionCosts["totalStructuresCosts"][targetLevel.costType] += targetLevel.costs;
                //Add time to the structures time
                if (!totalTimeSections["builder"]) totalTimeSections["builder"] = 0;
                totalTimeSections["builder"] += targetLevel.upgradeDurationInSeconds;
                //Add time to the sections time
                if (!timeForSections["totalStructuresTime"]) timeForSections["totalStructuresTime"] = 0;
                timeForSections["totalStructuresTime"] += targetLevel.upgradeDurationInSeconds;
            };
        } else {
            //@ts-ignore
            for (let id = 1; id <= (hallItem.amount || hallItem); id++) {
                const isUpgrading = (playerSchema[village == "home" ? "homeVillageBuilder" : "builderBaseBuilder"]).find(builder => builder.name.toLowerCase() == buildingName.toLowerCase() && id == builder.id) || playerSchema.otto.builder.find(builder => builder.name.toLowerCase() == buildingName.toLowerCase() && id == builder.id);
                //@ts-ignore
                const maxedLevel: number = hallItem.maxLevel || playerSchema.player.builderHallLevel;
                let level = buildingName.toLowerCase().includes("giga") ? (playerSchema.player.townHallWeaponLevel || 1) : parseInt(base[Util.convertToDatabaseName(buildingName) + id]) || 0;
                if (level == maxedLevel) continue;
                if (id >= 3 && buildingName == "Builder's Hut" && level == 0) {
                    let costs: number;
                    switch (id) {
                        case 3:
                            costs = 500;
                            break;
                        case 4:
                            costs = 1000;
                            break;
                        case 5:
                            costs = 2000;
                            break;
                    };
                    //Add costs to the total costs
                    if (!totalCosts["gem"]) totalCosts["gem"] = 0;
                    totalCosts["gem"] += costs;
                    //Add costs to the section costs
                    if (!sectionCosts["totalStructuresCosts"]["gem"]) sectionCosts["totalStructuresCosts"]["gem"] = 0;
                    sectionCosts["totalStructuresCosts"]["gem"] += costs;
                    level = 1;
                };
                for (let i = level; i < maxedLevel; i++) {
                    const { levels } = (village == "home" ? home : builder).find(el => el.name.toLowerCase() == buildingName.toLowerCase());
                    const targetLevel = levels[i];
                    if (isUpgrading?.currentLevel == i) {
                        totalTimeSections["builder"] += (isUpgrading.durationInMilliseconds - (Date.now() - isUpgrading.start.getTime())) / 1000;
                        timeForSections["totalStructuresTime"] += (isUpgrading.durationInMilliseconds - (Date.now() - isUpgrading.start.getTime())) / 1000;
                    } else {
                        //Add costs to the total costs
                        if (!totalCosts[targetLevel.costType]) totalCosts[targetLevel.costType] = 0;
                        totalCosts[targetLevel.costType] += targetLevel.costs;
                        //Add costs to the section costs
                        if (!sectionCosts["totalStructuresCosts"][targetLevel.costType]) sectionCosts["totalStructuresCosts"][targetLevel.costType] = 0;
                        sectionCosts["totalStructuresCosts"][targetLevel.costType] += targetLevel.costs;
                        //Add time to the structures time
                        if (!totalTimeSections["builder"]) totalTimeSections["builder"] = 0;
                        totalTimeSections["builder"] += targetLevel.upgradeDurationInSeconds;
                        //Add time to the sections time
                        if (!timeForSections["totalStructuresTime"]) timeForSections["totalStructuresTime"] = 0;
                        timeForSections["totalStructuresTime"] += targetLevel.upgradeDurationInSeconds;
                    };
                };
            };
        };
    };
    //Troops and Spells
    if ((village == "home" && playerSchema?.player.townHallLevel >= 3) || village != "home") {
        const laboratory = village == "home" ? [...Coc.homeTroopsArray, ...Coc.homeDarkTroopsArray, ...Coc.homeSpellsArray, ...Coc.homeSiegeMachinesArray] : Coc.builderTroopsArray;
        sectionCosts["totalLaboratoryCosts"] = {};
        const playerLaboratory = [...playerSchema.player.troops, ...playerSchema.player.spells];
        for (const unitName of laboratory) {
            const isUpgrading = playerSchema[(village + "Lab")].find(unit => unitName.toLowerCase() == unit.name.toLowerCase());
            const hallItem = Util.getHallItem(unitName, village == "home" ? playerSchema?.player.townHallLevel : playerSchema?.player.builderHallLevel, village);
            if (!hallItem) continue;
            const level = playerLaboratory.find(unit => unit.name.toLowerCase() == unitName.toLowerCase() && unit.village.toLowerCase() == (village == "builder" ? "builderBase" : "home").toLowerCase())?.level || 1;
            //@ts-ignore
            const maxedLevel: number = hallItem.maxLevel;
            if (level == maxedLevel) continue;
            for (let i = level; i < maxedLevel; i++) {
                const { levels } = (village == "home" ? home : builder).find(el => el.name.toLowerCase() == unitName.toLowerCase());
                const targetLevel = levels[i];
                if (isUpgrading?.currentLevel == i) {
                    totalTimeSections["laboratory"] += (isUpgrading.durationInMilliseconds - (Date.now() - isUpgrading.start.getTime())) / 1000;
                    timeForSections["totalLaboratoryTime"] += (isUpgrading.durationInMilliseconds - (Date.now() - isUpgrading.start.getTime())) / 1000;
                } else {
                    //Add costs to the total costs
                    if (!totalCosts[targetLevel.costType]) totalCosts[targetLevel.costType] = 0;
                    totalCosts[targetLevel.costType] += targetLevel.costs;
                    //Add costs to the section costs
                    if (!sectionCosts["totalLaboratoryCosts"][targetLevel.costType]) sectionCosts["totalLaboratoryCosts"][targetLevel.costType] = 0;
                    sectionCosts["totalLaboratoryCosts"][targetLevel.costType] += targetLevel.costs;
                    //Add time to the laboratory time
                    if (!totalTimeSections["laboratory"]) totalTimeSections["laboratory"] = 0;
                    totalTimeSections["laboratory"] += targetLevel.upgradeDurationInSeconds;
                    //Add time to the sections time
                    if (!timeForSections["totalLaboratoryTime"]) timeForSections["totalLaboratoryTime"] = 0;
                    timeForSections["totalLaboratoryTime"] += targetLevel.upgradeDurationInSeconds;
                };
            };
        };
    };
    //HEROES
    if ((village == "home" && playerSchema?.player.townHallLevel >= 7) || (village == "builder" && playerSchema?.player.builderHallLevel >= 5)) {
        const heroes = village == "home" ? Coc.homeHeroesArray : ["Battle Machine"];
        sectionCosts["totalHeroCosts"] = {};
        for (const heroName of heroes) {
            const hallItem = Util.getHallItem(heroName, village == "home" ? playerSchema?.player.townHallLevel : playerSchema?.player.builderHallLevel, village);
            if (!hallItem) continue;
            const level = playerSchema.player.heroes.find(hero => hero.name.toLowerCase() == heroName.toLowerCase())?.level || 0;
            //@ts-ignore
            const maxedLevel = hallItem.maxLevel;
            if (level == maxedLevel) continue;
            for (let i = level; i < maxedLevel; i++) {
                const isUpgrading = playerSchema[village == "home" ? "homeVillageBuilder" : "builderBaseBuilder"].find(builder => builder.name.toLowerCase() == heroName.toLowerCase());
                const { levels } = (village == "home" ? home : builder).find(el => el.name.toLowerCase() == heroName.toLowerCase());
                const targetLevel = levels[i];
                if (isUpgrading?.currentLevel == i) {
                    totalTimeSections["builder"] += (isUpgrading.durationInMilliseconds - (Date.now() - isUpgrading.start.getTime())) / 1000;
                    timeForSections["totalHeroTime"] += (isUpgrading.durationInMilliseconds - (Date.now() - isUpgrading.start.getTime())) / 1000;
                } else {
                    //Add costs to the total costs
                    if (!totalCosts[targetLevel.costType]) totalCosts[targetLevel.costType] = 0;
                    totalCosts[targetLevel.costType] += targetLevel.costs;
                    //Add costs to the section costs
                    if (!sectionCosts["totalHeroCosts"][targetLevel.costType]) sectionCosts["totalHeroCosts"][targetLevel.costType] = 0;
                    sectionCosts["totalHeroCosts"][targetLevel.costType] += targetLevel.costs;
                    //Add time to the hero time
                    if (!totalTimeSections["builder"]) totalTimeSections["builder"] = 0;
                    totalTimeSections["builder"] += targetLevel.upgradeDurationInSeconds;
                    //Add time to the sections time
                    if (!timeForSections["totalHeroTime"]) timeForSections["totalHeroTime"] = 0;
                    timeForSections["totalHeroTime"] += targetLevel.upgradeDurationInSeconds;
                };
            };
        };
    };
    //PETS
    if (village == "home" && playerSchema?.player.townHallLevel >= 14) {
        sectionCosts["totalPetsCosts"] = {};
        const pets = Coc.homePetsArray;
        for (const petName of pets) {
            const hallItem = Util.getHallItem(petName, village == "home" ? playerSchema?.player.townHallLevel : playerSchema?.player.builderHallLevel, village);
            if (!hallItem) continue;
            const level = playerSchema.player.troops.find(pet => pet.name.toLowerCase() == petName.toLowerCase())?.level || 1;
            //@ts-ignore
            const maxedLevel = hallItem.maxLevel;
            if (level == maxedLevel) return;
            for (let i = level; i < maxedLevel; i++) {
                const { levels } = home.find(el => el.name.toLowerCase() == petName.toLowerCase());
                const targetLevel = levels[i];
                //Add costs to the total costs
                if (!totalCosts[targetLevel.costType]) totalCosts[targetLevel.costType] = 0;
                totalCosts[targetLevel.costType] += targetLevel.costs;
                //Add costs to the section costs
                if (!sectionCosts["totalPetsCosts"][targetLevel.costType]) sectionCosts["totalPetsCosts"][targetLevel.costType] = 0;
                sectionCosts["totalPetsCosts"][targetLevel.costType] += targetLevel.costs;
                //Add time to the pet time
                if (!totalTimeSections["petHouse"]) totalTimeSections["petHouse"] = 0;
                totalTimeSections["petHouse"] += targetLevel.upgradeDurationInSeconds;
                //Add time to the sections time
                if (!timeForSections["totalPetsTime"]) timeForSections["totalPetsTime"] = 0;
                timeForSections["totalPetsTime"] += targetLevel.upgradeDurationInSeconds;
            };
        };
    };
    //WALLS
    sectionCosts["totalWallCosts"] = {};
    for (const levelOfWall of Object.keys(base["Walls"])) {
        //@ts-ignore
        const maxedLevel = Util.getHallItem("Wall", village == "home" ? playerSchema?.player.townHallLevel : playerSchema?.player.builderHallLevel, village).maxLevel || playerSchema.player.builderHallLevel;
        const lvl = parseInt(levelOfWall);
        for (let level = lvl; level < maxedLevel; level++) {
            const { levels } = (village == "home" ? home : builder).find(wall => wall.name.toLowerCase() == "wall");
            const targetLevel = levels[level];
            //Add costs to the total costs
            if (!totalCosts[targetLevel.costType]) totalCosts[targetLevel.costType] = 0;
            totalCosts[targetLevel.costType] += targetLevel.costs * parseInt(base["Walls"][levelOfWall]);
            //Add costs to the section costs
            if (!sectionCosts["totalWallCosts"][targetLevel.costType]) sectionCosts["totalWallCosts"][targetLevel.costType] = 0;
            sectionCosts["totalWallCosts"][targetLevel.costType] += targetLevel.costs * parseInt(base["Walls"][levelOfWall]);
        };
    };
    const statsTotal = {
        ...totalCosts,
        ...sectionCosts,
        ...timeForSections,
        totalTimeSections
    };
    for (const key of Object.keys(statsTotal)) {
        if (typeof statsTotal[key] == "object" && statsTotal[key] !== null && Object.keys(statsTotal[key]).length == 0) delete statsTotal[key];
    };
    return statsTotal;
};

module.exports = CocUpgradeRouter;