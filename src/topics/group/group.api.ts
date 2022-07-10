import { Router } from "express";
import { GroupSearch } from "./group.types";
import { Group } from "./group";

const router = Router();

router.get("/", async (req, res) => {
  const groupSearch: GroupSearch = req.query;
  res.send(
    JSON.stringify(
      {
        items: await Group.store.search(groupSearch),
      },
      null,
      4
    )
  );
});

export default router;
