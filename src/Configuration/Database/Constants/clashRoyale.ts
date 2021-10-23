import { Express } from "express";

export class ClashRoyaleConstants {
    public static maxLevel = 13;
    public static cardAmount = 103;
};

export default class CrConstants {
    public static apply(app: Express) {
        app.locals.ClashRoyale = {};
        for (const key of Object.keys(ClashRoyaleConstants)) app.locals.ClashRoyale[key] = ClashRoyaleConstants[key];
    };
    public static localName = "ClashRoyale";
};