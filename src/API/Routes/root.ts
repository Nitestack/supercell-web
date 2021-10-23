import { Router } from "express";
import { compileFile } from "pug";
import { join } from "path";
import { Token } from 'supercell-apis';
import axios from "axios";
import Util from "../../Configuration/Util/index";

class RootRouter{
    constructor() {
        this.router = Router();
        this.router.get("/", async (req, res) => {
            const token = await new Token("brawlstars", "hydra.qntp1764@gmail.com", process.env.PASSWORD).init();
            const response = await axios.get("https://api.brawlstars.com/v1/events/rotation", {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'content-type': "application/json; charset=utf-8"
                }
            });
            const events: Array<{
                startTime: string,
                endTime: string,
                event: {
                    id: number,
                    mode: string,
                    map: string,
                    modifiers: Array<string>
                }
            }> = response.data;
            const newEvents = [];
            for (const element of events) if (parseDateTime(element.startTime).getTime() <= Date.now()) newEvents.push({
                ...element,
                event: {
                    ...element.event,
                    mode: element.event.modifiers ? "Showdown+" : element.event.mode[0].toUpperCase() + element.event.mode.slice(1).replace(/([A-Z]+)/g, ' $1').trim()
                },
                startTime: parseDateTime(element.startTime).getTime(),
                endTime: parseDateTime(element.endTime).getTime()
            });
            res.render("home", {
                maps: newEvents,
                convertTime: Util.convertMilliseconds
            });
        });
        
        this.router.get("/upgrade-tracker", (req, res) => res.render("Upgrade/index"));
        
        function parseDateTime(dateTime: string) {
            const match = dateTime.match(/^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)\.(\d{3})Z$/)
            if (!match) throw new Error("Failed to parse")
            const date = new Date()
            date.setUTCFullYear(+match[1]);
            date.setUTCMonth(+match[2] - 1);
            date.setUTCDate(+match[3]);
            date.setUTCHours(+match[4]);
            date.setUTCMinutes(+match[5]);
            date.setUTCSeconds(+match[6]);
            date.setUTCMilliseconds(+match[7]);
            return date;
        };
        
        this.router.post("/displayError", (req, res) => {
            const errorCode = parseInt(req.body.errorCode);
            const compileFunction = compileFile(join(__dirname, "..", "Views", "Errors", `${errorCode}.pug`))
            return res.send(compileFunction());
        });
        
        this.router.get("/discord", (req, res) => res.redirect(""));
        this.router.get("/twitter", (req, res) => res.redirect(""));
        this.router.get("/facebook", (req, res) => res.redirect(""));
    };
    public router: Router;
};

module.exports = RootRouter;