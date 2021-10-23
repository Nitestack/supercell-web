import { Express } from "express";
import { join } from "path";
import { lstatSync, readdirSync } from "fs";
import Util from "../../Util/index";
import ClashOfClansConstants from "./clashOfClans";

export default class Constants {
    /**
     * Makes all constants available at `app.locals`
     * @param {Express} app The express app 
     */
    public static applyConstants(app: Express) {
        //Applying routes
        function readConstants(path: string) {
            for (const file of readdirSync(path)) {
                if (lstatSync(join(path, file)).isDirectory()) readConstants(join(path, file));
                else if (!file.toLowerCase().endsWith("ts") || file.toLowerCase() == "index.ts") continue;
                else {
                    const Constants = require(join(path, file));
                    if (Constants.apply) Constants.apply(app);
                    for (const key of Object.keys(Constants)) app.locals[key] = Constants[key];
                };
            };
        };
        readConstants(join(__dirname));
        app.locals.util = Util;
    };

    public static ClashOfClans = ClashOfClansConstants;
};