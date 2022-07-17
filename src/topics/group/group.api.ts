import { Router } from "express";
import { GroupSearch } from "./group.types";
import { Group } from "./group";

const router = Router();

type GroupQueryType = {
  groupName?: string;
  latest?: boolean;
};

router.get("/", async (req, res) => {
  const query: GroupQueryType = req.query;
  if (!query.groupName) {
    res.status(400);
    res.json({
      error: "invalidRequest",
      message: "groupName is required",
    });
    return;
  }
  const groupSearch: GroupSearch = {
    groupName: query.groupName,
    latest: query.latest,
  };
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
