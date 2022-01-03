import { Router } from "express";
import { Token, ClashRoyale } from "supercell-apis";
import { CRProfile, CRCard } from "../Interfaces/clashRoyale";
import Util from "../../Configuration/Util/index"
import ClashRoyaleElixir from "../../Configuration/Database/Clash Royale/elixirCost";
import { createDeckLink, openProfile, openClan } from "../../Configuration/Database/Clash Royale/links";

class StatsRouter {
    constructor() {
        this.router = Router();
        this.router.get("/stats-tracker", (req, res) => res.render("Stats/index"));
        this.router.get("/stats-tracker/clashroyale/player/:playerTag", async (req, res) => {
            const { playerTag } = req.params;
            try {
                const token = await new Token("clashroyale", "night.clash.tracker@gmail.com", process.env.PASSWORD).init();
                const client = new ClashRoyale(token);
                const player: CRProfile = await client.player(playerTag);
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
                    player.profileLink = openProfile(player.tag);
                    player.profileMobileLink = openProfile(player.tag, true);
                    player.clanLink = openClan(player.clan.tag);
                    player.clanMobileLink = openClan(player.clan.tag, true);
                    res.render("Stats/clashRoyalePlayer", {
                        player: player,
                        chests: (await client.playersUpcomingChests(playerTag)).items,
                        isLeaguePlayer: player.leagueStatistics ? true : false
                    });
                };
            } catch (error) {
                res.status(400).send("Invalid player tag! Please try again!");
                console.log(error);
            };
        });
    };
    public router: Router;
};

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
    for (const card of deck) totalCosts += ClashRoyaleElixir.getElixirCosts(card.name);
    return Util.round(totalCosts / deck.length, 1);
};

module.exports = StatsRouter;