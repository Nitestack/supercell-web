import { Router } from "express";

class StatsRouter {
    constructor() {
        this.router = Router();
        this.router.get("/stats-tracker", (req, res) => res.render("Stats/index"));
    };
    public router: Router;
};

module.exports = StatsRouter;