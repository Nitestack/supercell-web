import { Router } from "express";

const router = Router();

router.get("/stats-tracker", (req, res) => {
    res.render("Stats/index");
});

export default router;