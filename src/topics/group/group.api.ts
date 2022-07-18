import { Router } from "express";
import { GroupSearch, ValueType, Tags } from "./group.types";
import { Group } from "./group";

const router = Router();

type GroupQueryType = {
  groupName?: string;
  latest?: boolean;
};

type GroupAPIType = {
  name: string;
  timestamp: number;
  valueType: ValueType;
  tags: Tags[];
  dataUrl: string;
};

const serialize = (group: Group): GroupAPIType => {
  return {
    name: group.name,
    timestamp: group.timestamp,
    valueType: group.valueType,
    tags: group.tags,
    dataUrl: group.dataUrl(),
  };
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
    items: (await Group.store.search(groupSearch)).map((group) =>
      serialize(group)
    ),
  });
});

router.get("/latests", async (req, res) => {
  const groups = await Group.store.latests();
  const items: { [groupName: string]: GroupAPIType } = {};
  for (const groupName in groups) {
    items[groupName] = serialize(groups[groupName]);
  }
  res.json({
    items: items,
  });
});

export default router;
