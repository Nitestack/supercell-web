import { Router } from "express";
import { API } from "../";
import PlayerSchemaObject, { Builder, Laboratory, PetHouse } from "../Database/Models/index";
import { compileFile } from "pug";
import { join } from "path";
import Util from "../Util";
import { home } from "../Database/Clash of Clans/home";
import { builder } from "../Database/Clash of Clans/builder";
import { townHall } from "../Database/Clash of Clans/Home/townHall";
import { builderHall } from "../Database/Clash of Clans/Builder/builderHall";
import { getTotalCostsAndTimes, updateLevels } from "./clashOfClansUpgrade";
import { Token, ClashRoyale } from "supercell-apis";
import { CRProfile, CRCard } from "../API";
import crElixirCosts from "../Database/Clash Royale/elixirCost";

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
    else leagueName = "Challenger I";
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
        const compileFunction = compileFile("./src/Views/Includes/crProfile.pug");
        if (player) {
            if (player.leagueStatistics) {
                player.leagueStatistics.name = getLeague(player.trophies);
            };
            player.currentDeckAverageElixirCost = getAverageElixirCost(player.currentDeck);
            res.send({
                player: player,
                htmlCode: compileFunction({
                    player: player
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
        let playerSchema = await PlayerSchemaObject.findOne({
            playerTag: playerTag
        });
        const upgradeDone = await updateLevels(playerSchema, village);
        if (upgradeDone) playerSchema = await PlayerSchemaObject.findOne({
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
        let playerSchema = await PlayerSchemaObject.findOne({
            playerTag: playerTag
        });
        const upgradeDone = await updateLevels(playerSchema, village);
        if (upgradeDone) playerSchema = await PlayerSchemaObject.findOne({
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
        let playerSchema = await PlayerSchemaObject.findOne({ playerTag: playerTag });
        if (!playerSchema) return res.send({
            errorMessage: "An database error happened! Please try again!"
        });
        const update = await updateLevels(playerSchema, village);
        if (update) playerSchema = await PlayerSchemaObject.findOne({ playerTag: playerTag });
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
        const compileFunction = compileFile(join(__dirname, "..", "Views", "Includes", "modules.pug"));
        const compileObject = {
            player: playerSchema.player,
            village: village,
            database: playerSchema,
            convertPrice: Util.convertNumber,
            convertTime: (timeInSeconds: number, language?: string) => {
                return Util.convertMilliseconds(timeInSeconds * 1000, true, language);
            },
            convertStatsTime: (timeInSeconds: number) => {
                return Util.convertMilliseconds(timeInSeconds * 1000);
            },
            shortener: Util.timeShortener,
            convertNumber: Util.convertNumber,
            resolveDatabaseName: Util.resolveDatabaseName,
            statsTotal: getTotalCostsAndTimes(playerSchema, "home"),
            timeToGems: (timeInSeconds: number) => {
                return Util.timeToGems(timeInSeconds, "home");
            }
        };
        if (village == "home") {
            compileObject["townHall"] = townHall[playerSchema.player.townHallLevel - 1];
            compileObject["maxTownHall"] = townHall[townHall.length - 1];
            compileObject["home"] = home;
        } else {
            compileObject["builderHall"] = builderHall[playerSchema.player.builderHallLevel - 1];
            compileObject["maxBuilderHall"] = builderHall[builderHall.length - 1];
            compileObject["builder"] = builder;
        };
        if (village == "home") await PlayerSchemaObject.findOneAndUpdate({
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
        else if (village == "builder") await PlayerSchemaObject.findOneAndUpdate({
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
            htmlCode: compileFunction(compileObject)
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
        const playerSchema = await PlayerSchemaObject.findOne({ playerTag: playerTag });
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
        const compileFunction = compileFile(join(__dirname, "..", "Views", "Includes", "modules.pug"));
        const compileObject = {
            player: playerSchema.player,
            village: village,
            database: playerSchema,
            convertPrice: Util.convertNumber,
            convertTime: (timeInSeconds: number, language?: string) => {
                return Util.convertMilliseconds(timeInSeconds * 1000, true, language);
            },
            convertStatsTime: (timeInSeconds: number) => {
                return Util.convertMilliseconds(timeInSeconds * 1000);
            },
            shortener: Util.timeShortener,
            convertNumber: Util.convertNumber,
            resolveDatabaseName: Util.resolveDatabaseName,
            statsTotal: getTotalCostsAndTimes(playerSchema, "home"),
            timeToGems: (timeInSeconds: number) => {
                return Util.timeToGems(timeInSeconds, "home");
            }
        };
        if (village == "home") {
            compileObject["townHall"] = townHall[playerSchema.player.townHallLevel - 1];
            compileObject["maxTownHall"] = townHall[townHall.length - 1];
            compileObject["home"] = home;
        } else {
            compileObject["builderHall"] = builderHall[playerSchema.player.builderHallLevel - 1];
            compileObject["maxBuilderHall"] = builderHall[builderHall.length - 1];
            compileObject["builder"] = builder;
        };
        if (village == "home") await PlayerSchemaObject.findOneAndUpdate({
            playerTag: playerTag
        }, {
            homeLab: newLaboratory
        }, {
            upsert: false
        });
        else if (village == "builder") await PlayerSchemaObject.findOneAndUpdate({
            playerTag: playerTag
        }, {
            builderLab: newLaboratory
        }, {
            upsert: false
        });
        return res.send({
            htmlCode: compileFunction(compileObject)
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
        const playerSchema = await PlayerSchemaObject.findOne({ playerTag: playerTag });
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
        const compileFunction = compileFile(join(__dirname, "..", "Views", "Includes", "modules.pug"));
        await PlayerSchemaObject.findOneAndUpdate({
            playerTag: playerTag
        }, {
            homeLab: newPetHouse
        }, {
            upsert: false
        });
        return res.send({
            htmlCode: compileFunction({
                player: playerSchema.player,
                village: village,
                database: playerSchema,
                convertPrice: Util.convertNumber,
                convertTime: (timeInSeconds: number, language?: string) => {
                    return Util.convertMilliseconds(timeInSeconds * 1000, true, language);
                },
                convertStatsTime: (timeInSeconds: number) => {
                    return Util.convertMilliseconds(timeInSeconds * 1000);
                },
                shortener: Util.timeShortener,
                convertNumber: Util.convertNumber,
                resolveDatabaseName: Util.resolveDatabaseName,
                statsTotal: getTotalCostsAndTimes(playerSchema, "home"),
                timeToGems: (timeInSeconds: number) => {
                    return Util.timeToGems(timeInSeconds, "home");
                },
                townHall: townHall[playerSchema.player.townHallLevel - 1],
                maxTownHall: townHall[townHall.length - 1],
                home: home
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
        let playerSchema = await PlayerSchemaObject.findOne({
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
            playerSchema = await PlayerSchemaObject.findOne({
                playerTag: playerTag
            });
            const compileObject = {
                player: playerSchema.player,
                village: village,
                database: playerSchema,
                convertPrice: Util.convertNumber,
                convertTime: (timeInSeconds: number, language?: string) => {
                    return Util.convertMilliseconds(timeInSeconds * 1000, true, language);
                },
                convertStatsTime: (timeInSeconds: number) => {
                    return Util.convertMilliseconds(timeInSeconds * 1000);
                },
                shortener: Util.timeShortener,
                convertNumber: Util.convertNumber,
                resolveDatabaseName: Util.resolveDatabaseName,
                statsTotal: getTotalCostsAndTimes(playerSchema, "home"),
                timeToGems: (timeInSeconds: number) => {
                    return Util.timeToGems(timeInSeconds, "home");
                }
            };
            if (village == "home") {
                compileObject["townHall"] = townHall[playerSchema.player.townHallLevel - 1];
                compileObject["maxTownHall"] = townHall[townHall.length - 1];
                compileObject["home"] = home;
            } else {
                compileObject["builderHall"] = builderHall[playerSchema.player.builderHallLevel - 1];
                compileObject["maxBuilderHall"] = builderHall[builderHall.length - 1];
                compileObject["builder"] = builder;
            };
            const compileFunction = compileFile(join(__dirname, "..", "Views", "Includes", "modules.pug"));
            sendObject["htmlCode"] = compileFunction(compileObject);
        };
        return res.send(sendObject);
    } catch (err) {
        console.log(err);
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
        const playerSchema = await PlayerSchemaObject.findOne({ playerTag: playerTag });
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
        const compileFunction = compileFile(join(__dirname, "..", "Views", "Includes", "modules.pug"));
        const compileObject = {
            player: playerSchema.player,
            village: village,
            database: playerSchema,
            convertPrice: Util.convertNumber,
            convertTime: (timeInSeconds: number, language?: string) => {
                return Util.convertMilliseconds(timeInSeconds * 1000, true, language);
            },
            convertStatsTime: (timeInSeconds: number) => {
                return Util.convertMilliseconds(timeInSeconds * 1000);
            },
            shortener: Util.timeShortener,
            convertNumber: Util.convertNumber,
            resolveDatabaseName: Util.resolveDatabaseName,
            statsTotal: getTotalCostsAndTimes(playerSchema, "home"),
            timeToGems: (timeInSeconds: number) => {
                return Util.timeToGems(timeInSeconds, "home");
            }
        };
        if (village == "home") {
            compileObject["townHall"] = townHall[playerSchema.player.townHallLevel - 1];
            compileObject["maxTownHall"] = townHall[townHall.length - 1];
            compileObject["home"] = home;
        } else {
            compileObject["builderHall"] = builderHall[playerSchema.player.builderHallLevel - 1];
            compileObject["maxBuilderHall"] = builderHall[builderHall.length - 1];
            compileObject["builder"] = builder;
        };
        if (village == "home") await PlayerSchemaObject.findOneAndUpdate({
            playerTag: playerTag
        }, {
            homeVillage: newVillageObject
        }, {
            upsert: false
        });
        else if (village == "builder") await PlayerSchemaObject.findOneAndUpdate({
            playerTag: playerTag
        }, {
            builderBase: newVillageObject
        }, {
            upsert: false
        });
        return res.send({
            htmlCode: compileFunction(compileObject)
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
        const playerDatabase = await PlayerSchemaObject.findOne({
            tag: playerTag
        });
        if (playerDatabase) {
            res.status(400).send("There is already an player in the database!");
        } else {
            const player = await API.player(playerTag);
            if (player) {
                const profileInHTML = compileFile("./src/Views/Includes/profile.pug");
                res.send({
                    player: player,
                    homeVillage: profileInHTML({
                        player: player,
                        village: "home"
                    }),
                    builderBase: profileInHTML({
                        player: player,
                        village: "builder"
                    })
                });
            };
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
        let playerSchema = await PlayerSchemaObject.findOne({
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
        if (village == "home") await PlayerSchemaObject.findOneAndUpdate({
            playerTag: playerTag
        }, {
            homeVillageBuilder: playerSchema.homeVillageBuilder,
            homeLab: playerSchema.homeLab,
            otto: playerSchema.otto
        });
        else await PlayerSchemaObject.findOneAndUpdate({
            playerTag: playerTag
        }, {
            builderBaseBuilder: playerSchema.builderBaseBuilder,
            builderLab: playerSchema.builderLab,
            otto: playerSchema.otto
        });
        const update = await updateLevels(playerSchema, village);
        if (update) playerSchema = await PlayerSchemaObject.findOne({
            playerTag: playerTag
        });
        const compileFunction = compileFile(join(__dirname, "..", "Views", "Includes", "modules.pug"));
        const compileObject = {
            player: playerSchema.player,
            village: village,
            database: playerSchema,
            convertPrice: Util.convertNumber,
            convertTime: (timeInSeconds: number, language?: string) => {
                return Util.convertMilliseconds(timeInSeconds * 1000, true, language);
            },
            convertStatsTime: (timeInSeconds: number) => {
                return Util.convertMilliseconds(timeInSeconds * 1000);
            },
            shortener: Util.timeShortener,
            convertNumber: Util.convertNumber,
            resolveDatabaseName: Util.resolveDatabaseName,
            statsTotal: getTotalCostsAndTimes(playerSchema, "home"),
            timeToGems: (timeInSeconds: number) => {
                return Util.timeToGems(timeInSeconds, "home");
            }
        };
        if (village == "home") {
            compileObject["townHall"] = townHall[playerSchema.player.townHallLevel - 1];
            compileObject["maxTownHall"] = townHall[townHall.length - 1];
            compileObject["home"] = home;
        } else {
            compileObject["builderHall"] = builderHall[playerSchema.player.builderHallLevel - 1];
            compileObject["maxBuilderHall"] = builderHall[builderHall.length - 1];
            compileObject["builder"] = builder;
        };
        return res.send(compileFunction(compileObject));
    } catch (error) {

    };
});

//BOOM BEACH

export default router;