import Database from "../Database/Models/User/index";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export function signup(req: Request, res: Response) {
    const user = new Database.User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    });
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else {
            if (req.body.roles) Database.Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                } else {
                    user.roles = roles.map(role => role._id);
                    user.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        } else res.send({ message: "User was registered successfully!" });
                    });
                };
            });
            else {
                Database.Role.findOne({ name: "user" }, {}, {}, (err, role) => {
                    if (err) {
                        res.status(500).send({ message: err });
                        return;
                    } else {
                        user.roles = [role._id];
                        user.save(err => {
                            if (err) {
                                res.status(500).send({ message: err });
                                return;
                            } else res.send({ message: "User was registered successfully!" });
                        });
                    };
                });
            };
        };
    });
};