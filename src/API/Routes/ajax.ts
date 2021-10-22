import { Router } from "express";
import { API } from "../../index";
import { Builder, Laboratory, PetHouse } from "../../Configuration/Database/Models/clashofclans";
import Util from "../../Configuration/Util";
import { home } from "../../Configuration/Database/Clash of Clans/home";
import { builder } from "../../Configuration/Database/Clash of Clans/builder";
import { townHall } from "../../Configuration/Database/Clash of Clans/Home/townHall";
import { builderHall } from "../../Configuration/Database/Clash of Clans/Builder/builderHall";
import { getTotalCostsAndTimes, updateLevels } from "./clashOfClansUpgrade";
import { Token, ClashRoyale } from "supercell-apis";
import { CRProfile, CRCard } from "../../API/Interfaces/clashRoyale";
import crElixirCosts from "../../Configuration/Database/Clash Royale/elixirCost";
import { createDeckLink } from "../../Configuration/Database/Clash Royale/links";
import Database from "../../Configuration/Database/Models/index";

const router = Router();

//Update them for ajax
router.post("/upgrade-tracker/clashofclans/searchForPlayerByClan", async (req, res) => {
    try {
    } catch {

    };
});
//--------------------------------------------------------

//CLASH ROYALE

function getLeague(trophies: number) {
    let leagueName: string;
    if (trophies >= 8000) leagueName = "Ultimate Champion";
    else if (trophies >= 7600) leagueName = "Royal Champion";
    else if (trophies >= 7300) leagueName = "Grand Champion";
    else if (trophies >= 7000) leagueName = "Champion";
    else if (trophies >= 6600) leagueName = "Master III";
    else if (trophies >= 6300) leagueName = "Master II";
    else if (trophies >= 6000) leagueName = "Master I";
    else if (trophies >= 5600) leagueName = "Challenger III";
    else if (trophies >= 5300) leagueName = "Challenger II";
    else if (trophies >= 5000) leagueName = "Challenger I";
    else leagueName = "No League";
    return leagueName;
};

function getAverageElixirCost(deck: Array<CRCard>) {
    let totalCosts: number = 0;
    for (const card of deck) totalCosts += crElixirCosts.find(el => el.name.toLowerCase() == card.name.toLowerCase()).elixirCost;
    return Util.round(totalCosts / deck.length, 1);
};

router.post("/stats-tracker/clashroyale/searchForPlayer", async (req, res) => {
    try {
        const token = await new Token("clashroyale", "night.clash.tracker@gmail.com", process.env.PASSWORD).init();
        const client = new ClashRoyale(token);
        const { playerTag } = req.body;
        const player: CRProfile = await client.player(playerTag);
        console.log(player);
        if (player) {
            if (player.leagueStatistics) {
                player.leagueStatistics.currentSeason.name = getLeague(player.leagueStatistics.currentSeason.trophies);
                player.leagueStatistics.currentSeason.bestName = getLeague(player.leagueStatistics.currentSeason.bestTrophies);
                player.leagueStatistics.bestSeason.name = getLeague(player.leagueStatistics.bestSeason.trophies);
                player.leagueStatistics.previousSeason.name = getLeague(player.leagueStatistics.previousSeason.bestTrophies);
            };
            player.currentDeckAverageElixirCost = getAverageElixirCost(player.currentDeck);
            const cardIDsArray: Array<number> = [];
            for (const card of player.currentDeck) cardIDsArray.push(card.id);
            player.currentDeckLink = createDeckLink(cardIDsArray);
            player.currentDeckMobileLink = createDeckLink(cardIDsArray, true);

            res.send({
                player: player,
                htmlCode: Util.compilePUGFile("Includes/crProfile.pug", {}, {
                    player: player,
                    chests: (await client.playersUpcomingChests(playerTag)).items
                })
            });
        };
    } catch (error) {
        res.status(400).send("Invalid player tag! Please try again!");
        console.log(error);
    };
});

//CLASH OF CLANS

/**
 * Sorts the buildings in the builder array
 * @param {Builder} a Compare a 
 * @param {Buikder} b Compare b
 */
function sortBuilder(a: Builder, b: Builder) {
    return (new Date(a.start.getTime() + a.durationInMilliseconds).getTime() - Date.now()) - (new Date(b.start.getTime() + b.durationInMilliseconds).getTime() - Date.now());
};

/**
 * Gets an array of the builders for the builder potion
 */
router.post("/upgrade-tracker/clashofclans/getBuilders", async (req, res) => {
    try {
        const { playerTag, village } = req.body;
        let playerSchema = await Database.getClashOfClansVillage({
            playerTag: playerTag
        });
        const upgradeDone = await updateLevels(playerSchema, village);
        if (upgradeDone) playerSchema = await Database.getClashOfClansVillage({
            playerTag: playerTag
        });
        const builder = playerSchema[village == "home" ? "homeVillageBuilder" : "builderBaseBuilder"] || [];
        if (playerSchema.otto.unlocked && playerSchema.otto.currentVillage == village) builder.push(...playerSchema.otto.builder);
        if (village == "home") return res.send(builder.sort(sortBuilder));
        else return res.send({
            builders: builder.sort(sortBuilder),
            boostDuration: req.body.freeBoost ? getClockTowerDuration(playerSchema.builderBase["ClockTower1"]) : null
        });
    } catch (err) {
        console.log(err);
    };
});

/**
 * Gets the Clock Tower boost duration in milliseconds
 * @param {number | string} clockTowerLevel The Clock Tower level 
 * @returns 
 */
function getClockTowerDuration(clockTowerLevel?: number | string) {
    if (typeof clockTowerLevel == "string") clockTowerLevel = parseInt(clockTowerLevel);
    switch (clockTowerLevel) {
        case 1: return 7200000 + 360000;
        case 2: return 7200000 + 1440000;
        case 3: return 7200000 + 2520000;
        case 4: return 10800000;
        case 5: return 10800000 + 1080000;
        case 6: return 10800000 + 2160000;
        case 7: return 10800000 + 3240000;
        case 8: return 14400000 + 720000;
        case 9: return 14400000 + 1800000;
        default: return 0;
    };
};

/**
 * Gets an array of the lab for the research potion
 */
router.post("/upgrade-tracker/clashofclans/getLab", async (req, res) => {
    try {
        const { playerTag, village } = req.body;
        let playerSchema = await Database.getClashOfClansVillage({
            playerTag: playerTag
        });
        const upgradeDone = await updateLevels(playerSchema, village);
        if (upgradeDone) playerSchema = await Database.getClashOfClansVillage({
            playerTag: playerTag
        });
        return res.send(playerSchema[(village) + "Lab"] || []);
    } catch (err) {
        console.log(err);
    };
});

/**
 * Manages the request and starts the builder upgrade, when everything is ok
 */
router.post("/upgrade-tracker/clashofclans/startBuilderUpgrade", async (req, res) => {
    try {
        const id = parseInt(req.body.id);
        const currentLevel = parseInt(req.body.currentLevel);
        const { buildingName, village, playerTag } = req.body;
        let playerSchema = await Database.getClashOfClansVillage({ playerTag: playerTag });
        if (!playerSchema) return res.send({
            errorMessage: "An database error happened! Please try again!"
        });
        const update = await updateLevels(playerSchema, village);
        if (update) playerSchema = await Database.getClashOfClansVillage({ playerTag: playerTag });
        const builderSchema: Array<Builder> = playerSchema[(village == "home" ? "homeVillage" : "builderBase") + "Builder"];
        const builderAmount = parseInt(playerSchema[village == "home" ? "homeVillage" : "builderBase"]["Builder"]);
        //if all builders are busy
        if (builderSchema.length == builderAmount && (!playerSchema.otto.unlocked || playerSchema.otto.currentVillage.toLowerCase() != village.toLowerCase() || playerSchema.otto.builder[0])) return res.send({
            errorMessage: "All builders are busy right now!",
            builder: [...builderSchema, ...(playerSchema.otto.builder || [])].sort(sortBuilder)
        });
        const newBuilder = (builderSchema.length == builderAmount ? [] : builderSchema) || [];
        const building: Builder = {
            name: buildingName,
            id: id,
            currentLevel: currentLevel,
            start: new Date(),
            durationInMilliseconds: (village == "home" ? home : builder).find(element => element.name.toLowerCase() == buildingName.toLowerCase()).levels[currentLevel].upgradeDurationInSeconds * 1000
        };
        newBuilder.push(building);
        playerSchema[village == "home" ? "homeVillageBuilder" : "builderBaseBuilder"] = builderSchema.length == builderAmount ? builderSchema : newBuilder;
        playerSchema.otto = {
            ...playerSchema.otto,
            builder: builderSchema.length == builderAmount ? newBuilder : playerSchema.otto.builder
        }
        if (village == "home") await Database.ClashOfClansVillage.findOneAndUpdate({
            playerTag: playerTag
        }, {
            homeVillageBuilder: builderSchema.length == builderAmount ? builderSchema : newBuilder,
            otto: {
                ...playerSchema.otto,
                builder: builderSchema.length == builderAmount ? newBuilder : playerSchema.otto.builder
            }
        }, {
            upsert: false
        });
        else if (village == "builder") await Database.ClashOfClansVillage.findOneAndUpdate({
            playerTag: playerTag
        }, {
            builderBaseBuilder: builderSchema.length == builderAmount ? builderSchema : newBuilder,
            otto: {
                ...playerSchema.otto,
                builder: builderSchema.length == builderAmount ? newBuilder : playerSchema.otto.builder
            }
        }, {
            upsert: false
        });
        return res.send({
            htmlCode: Util.compilePUGFile("Upgrade/Clash of Clans/modules.pug", {}, {
                player: playerSchema.player,
                village: village,
                database: playerSchema,
                statsTotal: getTotalCostsAndTimes(playerSchema, "home")
            })
        });
    } catch (err) {
        console.log(err);
    };
});

/**
 * Manages the request and starts the unit upgrade, when everything is ok
 */
router.post("/upgrade-tracker/clashofclans/startLaboratoryUpgrade", async (req, res) => {
    try {
        const currentLevel = parseInt(req.body.currentLevel);
        const { unitName, village, playerTag } = req.body;
        const playerSchema = await Database.getClashOfClansVillage({ playerTag: playerTag });
        if (!playerSchema) return res.send({
            errorMessage: "An database error happened! Please try again!"
        });
        const labSchema: Array<Laboratory> = playerSchema[(village + "Lab")] || [];
        //if the laboratory is busy
        if (labSchema.length == 1) return res.send({
            errorMessage: `The ${village == "home" ? "" : "Star "}Laboratory is busy right now!`,
            lab: labSchema
        });
        const newLaboratory = labSchema || [];
        const lab: Laboratory = {
            name: unitName,
            currentLevel: currentLevel,
            start: new Date(),
            durationInMilliseconds: (village == "home" ? home : builder).find(element => element.name.toLowerCase() == unitName.toLowerCase()).levels[currentLevel].upgradeDurationInSeconds * 1000
        };
        newLaboratory.push(lab);
        playerSchema[(village + "Lab")] = newLaboratory;
        if (village == "home") await Database.ClashOfClansVillage.findOneAndUpdate({
            playerTag: playerTag
        }, {
            homeLab: newLaboratory
        }, {
            upsert: false
        });
        else if (village == "builder") await Database.ClashOfClansVillage.findOneAndUpdate({
            playerTag: playerTag
        }, {
            builderLab: newLaboratory
        }, {
            upsert: false
        });
        return res.send({
            htmlCode: Util.compilePUGFile("Upgrade/Clash of Clans/modules.pug", {}, {
                player: playerSchema.player,
                village: village,
                database: playerSchema,
                statsTotal: getTotalCostsAndTimes(playerSchema, "home")
            })
        });
    } catch (err) {
        console.log(err);
    };
});

/**
 * Manages the request and starts the pet upgrade, when everything is ok
 */
router.post("/upgrade-tracker/clashofclans/startPetHouseUpgrade", async (req, res) => {
    try {
        const currentLevel = parseInt(req.body.currentLevel);
        const { unitName, village, playerTag } = req.body;
        const playerSchema = await Database.getClashOfClansVillage({ playerTag: playerTag });
        if (!playerSchema) return res.send({
            errorMessage: "An database error happened! Please try again!"
        });
        const petHouseSchema: Array<Laboratory> = playerSchema.petHouse || [];
        //if the pet house is busy
        if (petHouseSchema.length == 1) return res.send({
            errorMessage: `The Pet House is busy right now!`,
            petHouse: petHouseSchema
        });
        const newPetHouse = petHouseSchema || [];
        const pet: PetHouse = {
            name: unitName,
            currentLevel: currentLevel,
            start: new Date(),
            durationInMilliseconds: (village == "home" ? home : builder).find(element => element.name.toLowerCase() == unitName.toLowerCase()).levels[currentLevel].upgradeDurationInSeconds * 1000
        };
        newPetHouse.push(pet);
        playerSchema.petHouse = newPetHouse;
        await Database.ClashOfClansVillage.findOneAndUpdate({
            playerTag: playerTag
        }, {
            homeLab: newPetHouse
        }, {
            upsert: false
        });
        return res.send({
            htmlCode: Util.compilePUGFile("Upgrade/Clash of Clans/modules.pug", {}, {
                player: playerSchema.player,
                village: village,
                database: playerSchema,
                statsTotal: getTotalCostsAndTimes(playerSchema, "home")
            })
        });
    } catch (err) {
        console.log(err);
    };
});

/**
 * Updates the upgrade timers requested at loading home village or builder base
 */
router.post("/upgrade-tracker/clashofclans/updateTimers", async (req, res) => {
    try {
        const { playerTag, village } = req.body;
        let playerSchema = await Database.getClashOfClansVillage({
            playerTag: playerTag
        });
        const upgradeDone = await updateLevels(playerSchema, village);
        const builder = playerSchema[village == "home" ? "homeVillageBuilder" : "builderBaseBuilder"] || [];
        if (playerSchema.otto.unlocked && playerSchema.otto.currentVillage == village && playerSchema.otto.builder[0]) builder.push(...playerSchema.otto.builder);
        const sendObject = {
            builder: builder || [],
            lab: playerSchema[(village + "Lab")] || [],
            petHouse: village == "home" ? (playerSchema.petHouse || []) : []
        };
        if (upgradeDone) {
            playerSchema = await Database.getClashOfClansVillage({
                playerTag: playerTag
            });
            sendObject["htmlCode"] = Util.compilePUGFile("Upgrade/Clash of Clans/modules.pug", {}, {
                player: playerSchema.player,
                village: village,
                database: playerSchema,
                statsTotal: getTotalCostsAndTimes(playerSchema, "home")
            });
        };
        return res.send(sendObject);
    } catch (err) {
        console.log(err);
    };
});

/**
 * Requests the database for structure data and will finish
 */
router.post("/upgrade-tracker/finishUpgrade", async (req, res) => {
    const { tag, village, name, id } = req.body;
    const player = await Database.getClashOfClansVillage({
        playerTag: tag
    });
    //If an player exists in database
    if (player) {
        //Gets the builders of the village
        let builder = village == "home" ? player.homeVillageBuilder : player.builderBaseBuilder;
        //If the player has otto unlocked and if the builder is in the village
        if (player.otto.unlocked && player.otto.currentVillage == village) builder = [...builder, ...player.otto.builder];
        //Searches for the upgrade
        const building = builder.find(building => building.name.toLowerCase() == name.toLowerCase() && building.id == id);
        //If a building exists
        if (building) return res.send({
            building: building
        });
    };
});

/**
 * Upgrades an amount of walls
 */
router.post("/upgrade-tracker/clashofclans/upgradeWalls", async (req, res) => {
    try {
        const { village, playerTag } = req.body;
        const currentLevel = parseInt(req.body.currentLevel);
        const amount = parseInt(req.body.amount);
        const playerSchema = await Database.getClashOfClansVillage({ playerTag: playerTag });
        if (!playerSchema) return res.send({
            errorMessage: "An database error happened! Please try again!"
        });
        const newVillageObject = playerSchema[village == "home" ? "homeVillage" : "builderBase"];
        const wallObject = newVillageObject["Walls"];
        wallObject[`${currentLevel}`] = `${parseInt(wallObject[`${currentLevel}`]) - amount}`;
        if (!wallObject[`${currentLevel + 1}`]) wallObject[`${currentLevel + 1}`] = "0";
        wallObject[`${currentLevel + 1}`] = `${parseInt(wallObject[`${currentLevel + 1}`]) + amount}`;
        newVillageObject["Walls"] = wallObject;
        playerSchema[village == "home" ? "homeVillage" : "builderBase"] = newVillageObject;
        if (village == "home") await Database.ClashOfClansVillage.findOneAndUpdate({
            playerTag: playerTag
        }, {
            homeVillage: newVillageObject
        }, {
            upsert: false
        });
        else if (village == "builder") await Database.ClashOfClansVillage.findOneAndUpdate({
            playerTag: playerTag
        }, {
            builderBase: newVillageObject
        }, {
            upsert: false
        });
        return res.send({
            htmlCode: Util.compilePUGFile("Upgrade/Clash of Clans/modules.pug", {}, {
                player: playerSchema.player,
                village: village,
                database: playerSchema,
                statsTotal: getTotalCostsAndTimes(playerSchema, "home")
            })
        });
    } catch (err) {
        console.log(err);
    };
});

/**
 * Searches the player in the API
 */
router.post("/upgrade-tracker/clashofclans/searchForPlayer", async (req, res) => {
    try {
        const { playerTag } = req.body;
        const playerDatabase = await Database.getClashOfClansVillage({
            tag: playerTag
        });
        if (playerDatabase) {
            res.status(400).send("There is already an player in the database!");
        } else {
            const player = await API.player(playerTag);
            if (player) res.send({
                player: player,
                homeVillage: Util.compilePUGFile("Includes/profile.pug", {}, {
                    player: player,
                    village: "home"
                }),
                builderBase: Util.compilePUGFile("Includes/profile.pug", {}, {
                    player: player,
                    village: "builder"
                })
            });
        };
    } catch (error) {
        res.status(400).send("Invalid player tag! Please try again!");
        console.log(error);
    };
});

/**
 * Get's the townhall or builder hall item for setting structures
 */
router.post("/upgrade-tracker/clashofclans/maxAmountAndLevel", (req, res) => {
    const { village, hallLevel } = req.body;
    try {
        res.send((village == "home" ? townHall : builderHall).slice(0, hallLevel));
    } catch (error) {
        res.status(400).send("Invalid village! Please try again!");
        console.log(error);
    };
});

/**
 * 
 */
router.post("/upgrade-tracker/clashofclans/applyBoost", async (req, res) => {
    try {
        const { boost, playerTag, village } = req.body;
        const amount = req.body.amount ? parseInt(req.body.amount) : 1;
        let playerSchema = await Database.getClashOfClansVillage({
            playerTag: playerTag
        });
        if (boost.toLowerCase() == "builder potion") {
            const duration = 32400000;
            const builder = playerSchema.homeVillageBuilder || [];
            for (const building of builder) building.start = new Date(building.start.getTime() - (duration * amount));
            playerSchema.homeVillageBuilder = builder;
            if (playerSchema.otto.unlocked && playerSchema.otto.currentVillage == village && playerSchema.otto.builder[0]) {
                playerSchema.otto.builder[0].start = new Date(playerSchema.otto.builder[0].start.getTime() - (duration * amount));
            };
        } else if (boost.toLowerCase() == "research potion") {
            const duration = 82800000;
            let lab = playerSchema.homeLab || [];
            const labItem = lab[0];
            if (labItem) lab = [{
                ...labItem,
                start: new Date(labItem.start.getTime() - (duration * amount))
            }];
            playerSchema.homeLab = lab;
        } else if (boost.toLowerCase().includes("clock tower")) {
            const duration = boost.toLowerCase() == "clock tower potion" ? getClockTowerDuration(9) : getClockTowerDuration(playerSchema.builderBase["ClockTower1"]);
            const builder = playerSchema.builderBaseBuilder || [];
            for (const building of builder) building.start = new Date(building.start.getTime() - (duration * amount));
            playerSchema.builderBaseBuilder = builder;
            if (playerSchema.otto.unlocked && playerSchema.otto.currentVillage == village && playerSchema.otto.builder[0]) {
                playerSchema.otto.builder[0].start = new Date(playerSchema.otto.builder[0].start.getTime() - (duration * amount));
            };
            let lab = playerSchema.builderLab || [];
            const labItem = lab[0];
            if (labItem) lab = [{
                ...labItem,
                start: new Date(labItem.start.getTime() - (duration * amount))
            }];
            playerSchema.builderLab = lab;
        };
        if (village == "home") await Database.ClashOfClansVillage.findOneAndUpdate({
            playerTag: playerTag
        }, {
            homeVillageBuilder: playerSchema.homeVillageBuilder,
            homeLab: playerSchema.homeLab,
            otto: playerSchema.otto
        });
        else await Database.ClashOfClansVillage.findOneAndUpdate({
            playerTag: playerTag
        }, {
            builderBaseBuilder: playerSchema.builderBaseBuilder,
            builderLab: playerSchema.builderLab,
            otto: playerSchema.otto
        });
        const update = await updateLevels(playerSchema, village);
        if (update) playerSchema = await Database.getClashOfClansVillage({
            playerTag: playerTag
        });
        return res.send(Util.compilePUGFile("Upgrade/Clash of Clans/modules.pug", {}, {
            player: playerSchema.player,
            village: village,
            database: playerSchema,
            statsTotal: getTotalCostsAndTimes(playerSchema, "home")
        }));
    } catch (error) {

    };
});

//BOOM BEACH

export default router;