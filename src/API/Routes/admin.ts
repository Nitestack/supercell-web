import { Router } from "express";
import Database from "../../Configuration/Database/Models/index";
import Middleware from "../Middleware/index";
import prism from "prismjs";
import loadLanguages from "prismjs/components/";
import APIError from "../Error/index";
loadLanguages("json");

const router = Router();

router.get("/admin", Middleware.Authentication.redirectToLoginPage, Middleware.Authentication.isAdmin, async (req, res) => {
    try {
        return res.render("Admin/index", {
            userCount: await Database.User.countDocuments().exec(),
            user: await Database.getUserById(res.locals.user.id)
        });
    } catch (err) {
        APIError.handleInternalServerError(err, res);
    };
});

router.post("/admin/getEveryUser", Middleware.Authentication.redirectToLoginPage, Middleware.Authentication.isAdmin, async (req, res) => {
    try {
        const users = await Database.User.find().exec();
        const html = prism.highlight(JSON.stringify(users, null, 2), prism.languages.json, 'json');
        return res.send(html);
    } catch (err) {
        APIError.handleInternalServerError(err, res, "/admin");
    };
});

router.post("/admin/getEveryClashOfClansVillage", Middleware.Authentication.redirectToLoginPage, Middleware.Authentication.isAdmin, async (req, res) => {
    try {
        const villages = await Database.ClashOfClansVillage.find().exec();
        const html = prism.highlight(JSON.stringify(villages, null, 2), prism.languages.json, 'json');
        return res.send(html);
    } catch (err) {
        APIError.handleInternalServerError(err, res, "/admin");
    };
});

export default router;