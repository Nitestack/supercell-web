import { Router } from "express";

const router = Router();

router.get("/tools", (req, res) => res.render("Tools/index"));

router.get("/tools/coc-army-maker", (req, res) => res.render("Tools/cocArmy"));

export default router;