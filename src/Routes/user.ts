import { Router, Request, Response, NextFunction } from "express";
import Database from "../Database/Models/index";
import bcrypt from "bcryptjs";
import Middleware from "../Middleware/index";

const router = Router();

router.get("/login", (req, res) => {
    if (res.locals.user) return res.redirect("/account");
    res.render("Authentication/login");
});
router.get('/logout', (req, res) => {
    res.clearCookie("x-access-token");
    res.redirect('/');
});
router.get("/register", (req, res) => {
    if (res.locals.user) return res.redirect("/account");
    res.render("Authentication/register");
});
router.get("/forgot-password", (req, res) => {
    if (res.locals.user) return res.redirect("/account");
    res.render("Authentication/forgotPassword");
});
router.get("/account", Middleware.redirectToLoginPage, (req, res) => res.render("Authentication/account", {

}));

router.post("/auth/signup", async (req, res) => {
    try {
        //Check for Email validaty
        const userCheck = await Database.getUser({ username: req.body.username });
        if (userCheck) return res.redirect("/register?error=user");
        const emailCheck = await Database.getUser({ email: req.body.email });
        if (emailCheck) return res.redirect("/register?error=email");
        //Check for role validaty
        if (req.body.roles) for (let i = 0; i < req.body.roles.length; i++) if (!Database.ROLES.includes(req.body.roles[i])) {
            console.log(`Failed! Role ${req.body.roles[i]} does not exist!`);
            return res.redirect("/register?error=internal");
        };
        const newUser = new Database.User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });
        //Sign up
        newUser.save((err, user) => {
            if (err) {
                console.log(err);
                return res.redirect("/register?error=internal");
            } else {
                if (req.body.roles) Database.Role.find({ name: { $in: req.body.roles } }, (err, roles) => {
                    if (err) {
                        console.log(err);
                        return res.redirect("/register?error=internal");
                    } else {
                        user.roles = roles.map(role => role._id);
                        user.save(err => {
                            if (err) {
                                console.log(err);
                                return res.redirect("/register?error=internal");
                            };
                        });
                    };
                });
                else {
                    Database.Role.findOne({ name: "user" }, {}, {}, (err, role) => {
                        if (err) {
                            console.log(err);
                            return res.redirect("/register?error=internal");
                        } else {
                            user.roles = [role._id];
                            user.save(err => {
                                if (err) {
                                    console.log(err);
                                    return res.redirect("/register?error=internal");
                                };
                            });
                        };
                    });
                };
                res.cookie("x-access-token", Middleware.generateToken({ id: user.id, username: user.username, roles: user.roles }), {
                    path: "/",
                    sameSite: true,
                    httpOnly: true // The cookie only accessible by the web server
                });
                return res.redirect("/account");
            };
        });
    } catch (err) {
        console.log(err);
        return res.redirect("/register?error=internal");
    };
});

router.post("/auth/signin", async (req, res) => {
    try {
        const user = await Database.getUser({ username: req.body.username });
        if (!user) return res.redirect("/login?error=user");
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.redirect("/login?error=password");
        res.cookie("x-access-token", Middleware.generateToken({ id: user.id, username: user.username, roles: user.roles }), {
            path: "/",
            sameSite: true,
            httpOnly: true // The cookie only accessible by the web server
        });
        return res.redirect("/account");
    } catch (err) {
        console.log(err);
        return res.redirect("/login?error=internal");
    };
});

export default router;