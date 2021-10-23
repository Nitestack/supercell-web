import { Express } from "express";
import { join } from "path";
import { lstatSync, readdirSync } from "fs";
import Util from "../../Util/index";
import { ClashOfClansConstants } from "./clashOfClans";

export default class Constants {
    /**
     * Makes all constants available at `app.locals`
     * @param {Express} app The express app 
     */
    public static async applyConstants(app: Express) {
        //Applying routes
        async function readConstants(path: string) {
            for (const file of readdirSync(path)) {
                if (lstatSync(join(path, file)).isDirectory()) readConstants(join(path, file));
                else if (!file.toLowerCase().endsWith("ts") || file.toLowerCase() == "index.ts") continue;
                else {
                    const fileData: { default?: any; } = await import(join(path, file));
                    //Default class export (Constant Class with apply? function)
                    const Constants: { localName?: string, apply: (app: Express) => void; } = fileData.default;
                    Constants.apply(app);
                    //Apply constants to app.locals
                    for (const classKey of Object.keys(fileData)) {
                        for (const key of Object.keys(fileData[classKey])) app.locals[key] = fileData[classKey][key];
                    };
                };
            };
        };
        await readConstants(join(__dirname));
        app.locals.util = Util;
    };

    public static ClashOfClans = ClashOfClansConstants;
};