import { Request, Response, NextFunction } from "express";
import Database from "../Database/Models/User/index";

export function checkDuplicateUsernameOrEmail(req: Request, res: Response, next: NextFunction) {
    Database.User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else if (user) {
            res.status(500).send({ message: "Failed! Username is already in use!" });
            return;
        };
        Database.User.findOne({
            email: req.body.email
        }).exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            } else if (user) {
                res.status(500).send({ message: "Failed! Email is already in use! " });
            };
            next();
        });
    });
};

export function checkRolesExisted(req: Request, res: Response, next: NextFunction) {
    if (req.body.roles) for (let i = 0; i < req.body.roles.length; i++) if (!Database.ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
            message: `Failed! Role ${req.body.roles[i]} does not exist!`
        });
        return;
    };
    next();
};