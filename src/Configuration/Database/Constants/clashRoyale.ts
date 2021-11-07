import { Express } from "express";

export class ClashRoyaleConstants {
    public static maxLevel = 14;
    public static cardAmount = 106;
};

export default class CrConstants {
    public static apply(app: Express) {
        app.locals.ClashRoyale = {};
        for (const key of Object.keys(ClashRoyaleConstants)) app.locals.ClashRoyale[key] = ClashRoyaleConstants[key];
    };
    public static localName = "ClashRoyale";
};