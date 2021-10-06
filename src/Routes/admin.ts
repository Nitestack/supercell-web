import { Router } from "express";
import Database from "../Database/Models/User/index";
import Middleware from "../Middleware/index";
import prism from "prismjs";
import loadLanguages from "prismjs/components/";
import PlayerSchema from "../Database/Models/clashofclans";
loadLanguages("json");

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
        const users = await Database.User.find().exec();
        const html = prism.highlight(JSON.stringify(users, null, 2), prism.languages.json, 'json');
        return res.send(html);
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    };
});

router.post("/admin/getEveryClashOfClansVillage", Middleware.redirectToLoginPage, Middleware.isAdmin, async (req, res) => {
    try {
        const villages = await PlayerSchema.find().exec();
        const html = prism.highlight(JSON.stringify(villages, null, 2), prism.languages.json, 'json');
        return res.send(html);
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    };
});

export default router;