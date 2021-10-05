import { Router } from "express";
import Database from "../Database/Models/User/index";
import Middleware from "../Middleware/index";
import prism from "prismjs";

const router = Router();

router.get("/admin", Middleware.redirectToLoginPage, Middleware.isAdmin, async (req, res) => {
    return res.render("Admin/index", {
        userCount: await Database.User.countDocuments().exec(),
        //@ts-ignore
        user: await Middleware.getUser(req.userID)
    });
});

router.post("/admin/getEveryUser", Middleware.redirectToLoginPage, Middleware.isAdmin, async (req, res) => {
    try {
        console.log(prism.highlight(JSON.stringify(await Database.User.find()), prism.languages.json, "json"))
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    };
});

export default router;