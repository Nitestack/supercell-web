import { Router } from "express";

class ToolsRouter {
    constructor() {
        this.router = Router();
        this.router.get("/tools", (req, res) => res.render("Tools/index"));
        this.router.get("/tools/coc-army-maker", (req, res) => res.render("Tools/cocArmy"));
    };
    public router: Router;
};

module.exports = ToolsRouter;