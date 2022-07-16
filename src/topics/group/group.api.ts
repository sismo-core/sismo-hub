import { Router } from "express";
import { GroupSearch } from "./group.types";
import { Group } from "./group";

const router = Router();

router.get("/", async (req, res) => {
  const groupSearch: GroupSearch = req.query;
  res.json({
    items: await Group.store.search(groupSearch),
  });
});

router.get("/latests", async (req, res) => {
  res.json({
    items: await Group.store.latests(),
  });
});

export default router;
