import { Request, Response, NextFunction, Express } from "express";
import jwt from "jsonwebtoken";
import Database from "../Database/Models/User/index";
import ClashOfClansConstants from "../Database/Clash of Clans/constants";
import { home } from "../Database/Clash of Clans/home";
import { builder } from "../Database/Clash of Clans/builder";
import { townHall } from "../Database/Clash of Clans/Home/townHall";
import { builderHall } from "../Database/Clash of Clans/Builder/builderHall";

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
                        res.cookie("x-access-token", this.generateToken({ id: decoded.id, username: decoded.username }), {
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
                        username: decoded.username
                    };
                };
            });
        };
        next();
    };
    public static isAdmin(req: Request, res: Response, next: NextFunction) {
        //@ts-ignore
        Database.User.findById(res.locals.user.id).exec((err, user) => {
            if (err) {
                console.log(err);
                return res.render("Errors/404");
            } else {
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
        });
    };
    public static async getUser(userID: string) {
        try {
            const user = await Database.User.findById(userID);
            if (user) return user;
        } catch (err) {
            console.log(err);
        };
    };
    public static async applyClashOfClansConstants(app: Express) {
        for (const propertyName of Object.keys(ClashOfClansConstants)) app.locals[propertyName] = ClashOfClansConstants[propertyName];
        app.locals.home = home;
        app.locals.builder = builder;
        app.locals.townHall = townHall;
        app.locals.builderHall = builderHall;
    };
};