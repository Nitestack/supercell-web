import { Request, Response, NextFunction } from "express";
import Util from "../../Configuration/Util";
import Database from "../../Configuration/Database/Models/index";

export default class UpgradeTrackerMiddleware {
    public static async validateVillage(req: Request, res: Response, next: NextFunction) {
        const playerSchema = await Database.ClashOfClansVillage.findOne({
            playerTag: Util.checkForHash(req.params.playerTag)
        });
        if (!playerSchema) return res.redirect("/upgrade-tracker/clashofclans");
        const user = await Database.getUserById(res.locals.user?.id);
        if (!user) return res.redirect("/upgrade-tracker/clashofclans");
        if (!user.clashOfClansVillages.includes(playerSchema._id)) return res.redirect("/upgrade-tracker/clashofclans");
        res.locals.playerSchema = playerSchema;
        next();     
    };
};