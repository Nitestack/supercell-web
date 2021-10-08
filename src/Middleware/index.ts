import { Request, Response, NextFunction, Express } from "express";
import jwt from "jsonwebtoken";
import Database from "../Database/Models/index";
import ClashOfClansConstants from "../Database/Clash of Clans/constants";
import { home } from "../Database/Clash of Clans/home";
import { builder } from "../Database/Clash of Clans/builder";
import { townHall } from "../Database/Clash of Clans/Home/townHall";
import { builderHall } from "../Database/Clash of Clans/Builder/builderHall";
import Util from "../Util/index";

export default class Middleware {
    public static generateToken(payload: string | object | Buffer, expireTime?: number) {
        return jwt.sign(payload, process.env.SECRET, {
            expiresIn: expireTime || 86400 // 24 hours
        });
    };
    public static redirectToLoginPage(req: Request, res: Response, next: NextFunction) {
        if (!res.locals.user) return res.redirect("/login");
        next();
    };
    public static validateToken(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies['x-access-token'];
        if (token) {
            jwt.verify(token as string, process.env.SECRET, (err, decoded) => {
                if (err) {
                    if (err.message.toLowerCase().includes("expired")) {
                        //@ts-ignore
                        res.cookie("x-access-token", this.generateToken({ id: decoded.id, username: decoded.username, roles: decoded.roles }), {
                            path: "/",
                            sameSite: true,
                            httpOnly: true // The cookie only accessible by the web server
                        });
                    } else {
                        console.log(err);
                    };
                } //@ts-ignore
                else {
                    res.locals.user = {
                        id: decoded.id,
                        username: decoded.username,
                        roles: decoded.roles
                    };
                };
            });
        };
        next();
    };
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