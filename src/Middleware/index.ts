import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Database from "../Database/Models/User/index";

export default class Middleware {
    public static generateToken(payload: string | object | Buffer, expireTime?: number) {
        return jwt.sign(payload, process.env.SECRET, {
            expiresIn: expireTime || 86400 // 24 hours
        });
    };
    public static redirectToLoginPage(req: Request, res: Response, next: NextFunction) {
        if (!res.locals.userID) return res.redirect("/login");
        next();
    };
    public static validateToken(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies['x-access-token'];
        if (token) {
            jwt.verify(token as string, process.env.SECRET, (err, decoded) => {
                if (err) {
                    if (err.message.toLowerCase().includes("expired")) {
                        //@ts-ignore
                        res.cookie("x-access-token", this.generateToken({ id: decoded.id }), {
                            path: "/",
                            sameSite: true,
                            httpOnly: true // The cookie only accessible by the web server
                        });
                    } else {
                        console.log(err);
                    };
                } //@ts-ignore
                else res.locals.userID = decoded.id;
            });
        };
        next();
    };
    public static isAdmin(req: Request, res: Response, next: NextFunction) {
        //@ts-ignore
        Database.User.findById(res.locals.userID.id).exec((err, user) => {
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
};