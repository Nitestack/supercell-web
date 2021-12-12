import { Request, Response, NextFunction } from "express";
import Authentication from "../Authentication/index";
import { decode, verify } from "jsonwebtoken";
import Database from "../../Configuration/Database/Models/index";

export default class AuthMiddleware {
    public static redirectToLoginPage(req: Request, res: Response, next: NextFunction) {
        if (!res.locals.user) return res.redirect("/login");
        next();
    };
    public static validateToken(req: Request, res: Response, next: NextFunction) {
        const token = req.cookies['x-access-token'];
        if (token) {
            verify(token as string, process.env.SECRET, (err, decoded) => {
                if (err) {
                    if (err.message.toLowerCase().includes("expired")) {
                        const newDecoded = decode(token, {
                            json: true,
                            complete: true
                        })?.payload;
                        res.cookie("x-access-token", Authentication.generateToken({ id: newDecoded.id, username: newDecoded.username, roles: newDecoded.roles, clashOfClansVillages: newDecoded.clashOfClansVillages }), {
                            path: "/",
                            sameSite: true,
                            httpOnly: true //The cookie only accessible by the web server
                        });
                        res.locals.user = {
                            id: newDecoded.id,
                            username: newDecoded.username,
                            roles: newDecoded.roles,
                            clashOfClansVillages: newDecoded.clashOfClansVillages
                        };
                    } else {
                        console.log(err);
                    };
                } else {
                    res.locals.user = {
                        id: decoded.id,
                        username: decoded.username,
                        roles: decoded.roles,
                        clashOfClansVillages: decoded.clashOfClansVillages
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
};