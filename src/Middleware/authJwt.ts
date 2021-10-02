import jwt from "jsonwebtoken";
import Database from "../Database/Models/User/index";
import { Request, Response, NextFunction } from "express";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).send({ message: "No token provided!" });
    jwt.verify(token as string, process.env.SECRET, (err, decoded) => {
        if (err) return res.status(401).send({ message: "Unauthorized!" });
        //@ts-ignore
        else req.userId = decoded.id;
        next();
    });
};

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    Database.User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else {
            Database.Role.find({ _id: { $in: user.roles } }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                } else {
                    for (let i = 0; i < roles.length; i++) if (roles[i].name == "admin") {
                        next();
                        return;
                    };
                    res.status(403).send({ message: "Require Admin Role!" });
                    return;
                };
            });
        };
    });
};

export function isModerator(req: Request, res: Response, next: NextFunction) {
    //@ts-ignore
    Database.User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else {
            Database.Role.find({ _id: { $in: user.roles } }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                } else {
                    for (let i = 0; i < roles.length; i++) if (roles[i].name == "moderator") {
                        next();
                        return;
                    };
                    res.status(403).send({ message: "Require Moderator Role!" });
                    return;
                };
            });
        }
    });
};