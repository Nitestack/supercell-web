import { Router } from "express";

const router = Router();

router.get("/stats", (req, res) => {
    res.render("Stats/index");
});

export default router;