import { Router } from "express";
import GroupGeneratorLibrary from "./group-generator-library";

const router = Router();

router.get("/", async (req, res) => {
  res.json({
    items: GroupGeneratorLibrary.generators,
  });
});

export default router;
