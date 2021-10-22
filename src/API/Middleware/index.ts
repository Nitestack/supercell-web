import { Request, Response, NextFunction, Express } from "express";
import Database from "../../Configuration/Database/Models/index";
import ClashOfClansConstants from "../../Configuration/Database/Clash of Clans/constants";
import { home } from "../../Configuration/Database/Clash of Clans/home";
import { builder } from "../../Configuration/Database/Clash of Clans/builder";
import { townHall } from "../../Configuration/Database/Clash of Clans/Home/townHall";
import { builderHall } from "../../Configuration/Database/Clash of Clans/Builder/builderHall";
import Util from "../../Configuration/Util/index";
import AuthenticationMiddleware from "./auth";

export default class Middleware {
    public static Authentication = AuthenticationMiddleware;
    public static async isAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await Database.getUserById(res.locals.user.id);
            if (user) {
                Database.Role.find({ _id: { $in: user.roles } }, (err, roles) => {
                    if (err) {
                        console.log(err);
                        return res.render("Errors/404");;
                    } else {
                        for (const role of roles) if (role.name.toLowerCase() == "admin") return next();
                        return res.render("Errors/404");
                    };
                });
            };            
        } catch (err) {
            console.log(err);
            return res.render("Errors/404");
        };
    };
    public static applyClashOfClansConstants(app: Express) {
        for (const propertyName of Object.keys(ClashOfClansConstants)) app.locals[propertyName] = ClashOfClansConstants[propertyName];
        app.locals.home = home;
        app.locals.builder = builder;
        app.locals.townHall = townHall;
        app.locals.builderHall = builderHall;
        app.locals.maxedBuilderHallLevel = builderHall.length;
        app.locals.maxedTownHallLevel = townHall.length;
    };
    public static applyUtilClass(app: Express) {
        app.locals.util = Util;
    };
};