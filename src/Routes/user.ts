import { Router } from "express";
import { checkDuplicateUsernameOrEmail, checkRolesExisted } from "../Middleware/verifySignUp";
import { signup } from "../Controller/auth";
import { adminBoard, allAccess, userBoard, moderatorBoard } from "../Controller/user";
import { verifyToken, isAdmin, isModerator } from "../Middleware/authJwt";
import Database from "../Database/Models/User/index";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/login", (req, res) => res.render("Authentication/login"));
router.get("/register", (req, res) => res.render("Authentication/register"));
router.get("/forgot-password", (req, res) => res.render("Authentication/forgotPassword"));
router.get("/account", (req, res) => res.render("Authentication/account"));

router.post("/auth/signup", [checkDuplicateUsernameOrEmail, checkRolesExisted], signup);

router.post("/auth/signin", (req, res) => {
    Database.User.findOne({
        username: req.body.username
    }).populate("roles", "-__v").exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        } else if (!user) return res.redirect("/login?error=user");
        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) return res.redirect("/login?error=password");
        const token = jwt.sign({ id: user.id }, process.env.SECRET, {
            expiresIn: 86400 // 24 hours
        });
        const authorities: Array<string> = [];
        for (let i = 0; i < user.roles.length; i++) authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        console.log({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
        return res.redirect("/account");
    });
});

router.post("/verifyUser", (req, res) => {
    const { token } = req.body;
});

router.get("/api/test/all", allAccess);

router.get("/api/test/user", [verifyToken], userBoard);

router.get("/api/test/mod", [verifyToken, isModerator], moderatorBoard);

router.get("/api/test/admin", [verifyToken, isAdmin], adminBoard);

export default router;