import { Router } from "express";
import Database from "../Database/Models/index";
import Middleware from "../Middleware/index";
import prism from "prismjs";
import loadLanguages from "prismjs/components/";
loadLanguages("json");

const router = Router();

router.get("/admin", Middleware.redirectToLoginPage, Middleware.isAdmin, async (req, res) => {
    return res.render("Admin/index", {
        userCount: await Database.User.countDocuments().exec(),
        //@ts-ignore
        user: await Database.getUserById(res.locals.user.id)
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
        const villages = await Database.ClashOfClansVillage.find().exec();
        const html = prism.highlight(JSON.stringify(villages, null, 2), prism.languages.json, 'json');
        return res.send(html);
    } catch (err) {
        console.log(err);
        return res.redirect("/admin");
    };
});

export default router;