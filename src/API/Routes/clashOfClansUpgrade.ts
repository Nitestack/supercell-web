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
import Middleware from "../Middleware";
import ErrorHandler from "../Error";

const Coc = Constants.ClashOfClans;

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
        this.router.get("/upgrade-tracker/clashofclans/:playerTag", Middleware.UpgradeTracker.validateVillage, async (req, res) => {
            try {
                const { playerSchema } = res.locals;
                res.render("Upgrade/Clash of Clans/switchVillage", {
                    player: playerSchema.player
                });
            } catch {
                return res.redirect("/upgrade-tracker/clashofclans");
            };
        });

        /**
         * Home Village
         */
        this.router.get("/upgrade-tracker/clashofclans/:playerTag/home", Middleware.UpgradeTracker.validateVillage, async (req, res) => {
            try {
                const { playerSchema } = res.locals;
                const { player } = playerSchema;
                if (!playerSchema.homeVillage) return res.redirect("/upgrade-tracker/clashofclans/" + player.tag.replace(/#/g, "") + "/home/update");
                await updateLevels(playerSchema, "home");
                res.render("Upgrade/Clash of Clans/index", {
                    player: player,
                    village: "home",
                    database: playerSchema,
                    statsTotal: getTotalCostsAndTimes(playerSchema, "home")
                });
            } catch (err) {
                console.log(err);
            };
        });

        /**
         * Builder Base
         */
        this.router.get("/upgrade-tracker/clashofclans/:playerTag/builder", Middleware.UpgradeTracker.validateVillage, async (req, res) => {
            try {
                const { playerSchema } = res.locals;
                const { player } = playerSchema;
                if (!playerSchema.builderBase) return res.redirect("/upgrade-tracker/clashofclans/" + player.tag.replace(/#/g, "") + "/builder/update");
                await updateLevels(playerSchema, "builder");
                res.render("Upgrade/Clash of Clans/index", {
                    player: player,
                    village: "builder",
                    database: playerSchema,
                    statsTotal: getTotalCostsAndTimes(playerSchema, "builder")
                });
            } catch (err) {
                console.log(err);
            };
        });

        /**
         * Edit village structures
         */
        this.router.get("/upgrade-tracker/clashofclans/:playerTag/:village/update", Middleware.UpgradeTracker.validateVillage, async (req, res) => {
            const { playerTag, village } = req.params;
            const { playerSchema } = res.locals;
            if (!["home", "builder"].includes(village)) return res.redirect("/upgrade-tracker/clashofclans/" + playerTag.replace(/#/g, "") + "/home");
            try {
                res.render(`Upgrade/Clash of Clans/edit${village[0].toUpperCase() + village.slice(1)}Structures`, {
                    player: playerSchema.player,
                    village: village,
                    playerSchema: playerSchema
                });
            } catch (err) {
                ErrorHandler.handleInternalServerError(err, res, "/upgrade-tracker/clashofclans/" + playerTag.replace(/#/g, "") + "/home");
            };
        });

        /**
         * Setting new structures
         */
        this.router.post("/upgrade-tracker/clashofclans/home/new", (req, res) => {
            try {
                const player: Player = JSON.parse(req.body.player);
                res.render("Upgrade/Clash of Clans/editHomeStructures", {
                    player: player,
                    village: "home"
                });
            } catch (err) {
                ErrorHandler.handleInternalServerError(err, res, "/upgrade-tracker/clashofclans");
            };
        });

        /**
         * Redirects to a page to choose village
         */
        this.router.post("/upgrade-tracker/clashofclans/chooseVillage", (req, res) => {
            try {
                const player: Player = JSON.parse(req.body.player);
                res.render("Upgrade/Clash of Clans/switchVillage", {
                    player: player
                });
            } catch (err) {
                ErrorHandler.handleInternalServerError(err, res, "/upgrade-tracker/clashofclans/")
            };  
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
         * Sets the home village structures
         */
        this.router.post("/upgrade-tracker/clashofclans/home/structures/set", async (req, res) => {
            try {
                const player: Player = JSON.parse(req.body.player);
                const object = createVillageStructureObject(req.body, player, "home", true);
                //@ts-ignore
                await Database.ClashOfClansVillage.findOneAndUpdate({
                    playerTag: Util.checkForHash(player.tag)
                }, {
                    playerTag: Util.checkForHash(player.tag),
                    player: player,
                    homeVillage: object 
                }, {
                    upsert: true,
                    setDefaultsOnInsert: true
                });
                res.redirect("/upgrade-tracker/clashofclans/" + player.tag.replace(/#/g, "") + "/home");
            } catch (err) {
                ErrorHandler.handleInternalServerError(err, res, "/upgrade-tracker/clashofclans");
            };
        });

        /**
         * Sets the builder base structures
         */
        this.router.post("/upgrade-tracker/clashofclans/builder/structures/set", async (req, res) => {
            try {
                const player: Player = JSON.parse(req.body.player);
                const object = createVillageStructureObject(req.body, player, "builder", true);
                object["Builder"] = 1;
                await Database.ClashOfClansVillage.findOneAndUpdate({
                    playerTag: Util.checkForHash(player.tag)
                }, {
                    playerTag: Util.checkForHash(player.tag),
                    player: player,
                    builderBase: object
                }, {
                    upsert: true,
                    setDefaultsOnInsert: true
                });

                res.redirect("/upgrade-tracker/clashofclans/" + player.tag.replace(/#/g, "") + "/builder");
            } catch (err) {
                ErrorHandler.handleInternalServerError(err, res, "/upgrade-tracker/clashofclans");
            };
        });

        /**
         * Redirects to the other opposite village
         */
        this.router.post("/upgrade-tracker/clashofclans/redirectToOtherVillage", (req, res) => {
            const { playerTag, village } = req.body;
            try {
                res.redirect("/upgrade-tracker/clashofclans/" + playerTag.replace(/#/g, "") + "/" + (village == "home" ? "builder" : "home"));
            } catch (err) {
                ErrorHandler.handleInternalServerError(err, res, "/upgrade-tracker/clashofclans/" + playerTag.replace(/#/g, "") + "/" + village)
            };
            
        });

        /**
         * Updates the player via API
         */
        this.router.post("/upgrade-tracker/clashofclans/apiUpdate", async (req, res) => {
            const { playerTag, village } = req.body;
            try {
                const player = await API.player(Util.checkForHash(playerTag));
                const playerSchema = await Database.ClashOfClansVillage.findOne({ playerTag: Util.checkForHash(playerTag) });
                await Database.ClashOfClansVillage.findOneAndUpdate({
                    playerTag: Util.checkForHash(playerTag),
                }, {
                    player: player,
                    homeVillage: createVillageStructureObject(playerSchema?.homeVillage, player, "home"),
                    builderBase: createVillageStructureObject(playerSchema?.builderBase, player, "builder")
                }, {
                    upsert: false
                });
                res.redirect("/upgrade-tracker/clashofclans/" + player.tag.replace(/#/g, "") + "/" + village);
            } catch (err) {
                ErrorHandler.handleInternalServerError(err, res, "/upgrade-tracker/clashofclans/" + playerTag.replace(/#/g, "") + "/" + village);
            };
        });
        /**
         * Set's the season boost
         */
        this.router.post("/upgrade-tracker/clashofclans/seasonBoosts", async (req, res) => {
            const { builderSeasonBoost, researchSeasonBoost, info } = req.body;
            const { playerTag, village } = JSON.parse(info);
            try {
                const builderBoost = parseInt(builderSeasonBoost.replace(/%/g, "")) as 0 | 10 | 15 | 20;
                const researchBoost = parseInt(researchSeasonBoost.replace(/%/g, "")) as 0 | 10 | 15 | 20;
                await Database.ClashOfClansVillage.findOneAndUpdate({
                    playerTag: Util.checkForHash(playerTag)
                }, {
                    builderSeasonBoost: builderBoost,
                    researchSeasonBoost: researchBoost
                }, {
                    upsert: false
                });
                return res.redirect("/upgrade-tracker/clashofclans/" + playerTag.replace(/#/g, "") + "/" + village);
            } catch (err) {
                ErrorHandler.handleInternalServerError(err, res, "/upgrade-tracker/clashofclans/" + playerTag.replace(/#/g, "") + "/" + village);
            };
        });
    };
    public router: Router;
};

/**
 * Creates an edited village structure object
 * @param {object} structures The structures
 * @param {Player} player The player
 * @param {"home" | "builder"} village The village
 * @param {boolean?} createdFirstTime If it is the first time setting structures
 */
export function createVillageStructureObject(structures: object, player: Player, village: "home" | "builder", createdFirstTime?: boolean) {
    //If the structure object includes an player object
    if (structures["player"]) delete structures["player"];
    if (village == "home") {
        //Regular spells are unlocked at TH5
        if (player.townHallLevel >= 5) {
            if (!player.spells) return;
            for (let i = Coc.homeNormalSpellsArray.length - 1; i >= 0; i--) {
                if (player.spells.find(spell => spell.name.toLowerCase() == Coc.homeNormalSpellsArray[i].toLowerCase())) {
                    structures["SpellFactory1"] = `${i + 1}`;
                    break;
                };
            };
        };
        //Dark spells are unlocked at TH8
        if (player.townHallLevel >= 8) {
            if (!(player.spells.filter(unit => Coc.homeDarkSpellsArray.includes(unit.name)) || []).length) return;
            for (let i = Coc.homeDarkSpellsArray.length - 1; i >= 0; i--) {
                if (player.spells.find(spell => spell.name.toLowerCase() == Coc.homeDarkSpellsArray[i].toLowerCase())) {
                    structures["DarkSpellFactory1"] = `${i + 1}`;
                    break;
                };
            };
        };
        //Siege Machines are unlocked at TH12
        if (player.townHallLevel >= 12) {
            if (!(player.troops.filter(unit => Coc.homeSiegeMachinesArray.includes(unit.name)) || []).length) return;
            for (let i = Coc.homeSiegeMachinesArray.length - 1; i >= 0; i--) {
                if (player.troops.find(siegeMachine => siegeMachine.name.toLowerCase() == Coc.homeSiegeMachinesArray[i].toLowerCase())) {
                    structures["Workshop1"] = `${i + 1}`;
                    break;
                };
            };
        };
        //Pets are unlocked at TH14
        if (player.townHallLevel >= 14) {
            if (!(player.troops.filter(unit => Coc.homePetsArray.includes(unit.name)) || []).length) return;
            for (let i = Coc.homePetsArray.length - 1; i >= 0; i--) {
                if (player.troops.find(pet => pet.name.toLowerCase() == Coc.homePetsArray[i].toLowerCase())) {
                    structures["PetHouse1"] = `${i + 1}`;
                    break;
                };
            };
        };
        if (player.townHallLevel >= 14) {
            if (structures["Builder"] < 5) {
                structures["BuildersHut5"] = "0";
                if (structures["Builder"] < 4) {
                    structures["BuildersHut4"] = "0";
                    if (structures["Builder"] < 3) structures["BuildersHut3"] = "0";
                };
            };
            if (structures["BuildersHut1"] == "0") structures["BuildersHut1"] = "1";
            if (structures["BuildersHut2"] == "0") structures["BuildersHut2"] = "1";
        };
    } else {
        //Troops are unlocked at BH1
        for (let i = Coc.builderTroopsArray.length - 1; i >= 0; i--) {
            if (player.troops.find(troop => troop.name.toLowerCase() == Coc.builderTroopsArray[i].toLowerCase() && troop.village == "builderBase")) {
                structures["BuilderBarracks1"] = `${i + 1}`;
                break;
            };
        };
    };
    if (createdFirstTime) {
        const wallObject = {};
        for (const structureKey of Object.keys(structures)) {
            //If it isn't a Wall level
            if (!structureKey.includes("Wall")) continue;
            //@ts-ignore
            else if (structures[structureKey] == "0") {
                delete structures[structureKey]
                continue;
            };
            wallObject[structureKey.replace(/Wall/g, "")] = structures[structureKey];
            delete structures[structureKey];
        };
        let wallPieces = 0;
        for (const amount of Object.values(wallObject)) wallPieces += parseInt(amount as string);
        //@ts-ignore
        const totalPossibleWallAmount: number = village == home ? townHall[player.townHallLevel - 1].wall.amount : (builderHall[player.builderHallLevel - 1].wall.amount ? builderHall[player.builderHallLevel - 1] : builderHall[player.builderHallLevel - 1].wall);
        if (wallPieces < totalPossibleWallAmount) wallObject["0"] = `${totalPossibleWallAmount - wallPieces}`;
        structures["Walls"] = wallObject;
    };
    return structures;
};

/**
 * Updates the level when something has finished upgrading
 * @param {ClashOfClansVillage} playerSchema The player of the database 
 * @param {"home" | "builder"} village The village
 */
export async function updateLevels(playerSchema: ClashOfClansVillage, village: "home" | "builder") {
    let updateDatabase = false;
    const { player } = playerSchema;
    //Check if an builder has finished
    const builder = playerSchema[village == "home" ? "homeVillageBuilder" : "builderBaseBuilder"];
    //Check if otto is unlocked and if otto's current location matches the village and checks if otto is working
    if (playerSchema.otto.unlocked && playerSchema.otto.currentVillage == village && playerSchema.otto.builder[0]) {
        const building = playerSchema.otto.builder[0];
        //If the building hasn't finished upgrading
        if (Date.now() < building.start.getTime() + building.durationInMilliseconds) return;
        //If the building is a hero
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
    for (const building of builder) {
        //If the building hasn't finished upgrading
        if (Date.now() < building.start.getTime() + building.durationInMilliseconds) return;
        //If the building is a hero
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
    //Check if a unit has finished upgrading
    const lab = playerSchema[(village + "Lab")][0];
    //Checks if the lab exists and if the unit has finished upgrading
    if (lab && Date.now() >= lab.start.getTime() + lab.durationInMilliseconds) {
        const isSpell = player.spells.find(spell => spell.name.toLowerCase() == lab.name.toLowerCase());
        //If it is a spell
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
    //Check if a pet has finished upgrading
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
    if (updateDatabase) {
        if (village == "home") await Database.ClashOfClansVillage.findOneAndUpdate({
            playerTag: Util.checkForHash(player.tag)
        }, {
            homeVillage: playerSchema.homeVillage,
            homeVillageBuilder: playerSchema.homeVillageBuilder,
            homeLab: playerSchema.homeLab,
            player: player,
            otto: playerSchema.otto
        }, {
            upsert: false
        });
        else if (village == "builder") await Database.ClashOfClansVillage.findOneAndUpdate({
            playerTag: Util.checkForHash(player.tag)
        }, {
            builderBase: playerSchema.builderBase,
            builderBaseBuilder: playerSchema.builderBaseBuilder,
            builderLab: playerSchema.builderLab,
            player: player,
            otto: playerSchema.otto
        }, {
            upsert: false
        });
    };
    return updateDatabase;
};

/**
 * Gets the total costs and the total time and split them into categories
 * @param {ClashOfClansVillage} playerSchema The player of the database 
 * @param {"home" | "builder"} village The village
 */
export function getTotalCostsAndTimes(playerSchema: ClashOfClansVillage, village: "home" | "builder") {
    const structures = village == "home" ? [...Coc.homeDefensesArray, ...Coc.homeTrapsArray, ...Coc.homeArmyArray, ...Coc.homeResourcesArray] : [...Coc.builderDefensesArray, ...Coc.builderTrapsArray, ...Coc.builderArmyArray, ...Coc.builderResourcesArray];
    const base = playerSchema[village == "home" ? "homeVillage" : "builderBase"];
    /**
     * The total costs sections
     * Object is categorized in cost types
     */
    const totalCosts = {};
    /**
     * The costs for `structures`, `laboratory`, `pet house`, `heroes`
     * Object is categorized in cost types
     */
    const sectionCosts = {};
    /**
     * The time for `structures`, `laboratory`, `pet house`, `heroes`
     * Time is given in seconds
     */
    const timeForSections = {};
    /**
     * The total time sections: `builder`, `laboratory`, `pet house`
     * Time is given in seconds
     */
    const totalTimeSections = {};
    sectionCosts["totalStructuresCosts"] = {};
    //Buildings
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
    //Heroes
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
    //Pets
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
    //Walls
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