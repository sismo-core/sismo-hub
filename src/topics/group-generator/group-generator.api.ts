import { Router } from "express";
import { generators } from "../../../group-generators/generators";

const router = Router();

router.get("/", async (req, res) => {
  res.json({
    items: generators,
  });
});

export default router;
