import { Router } from "express";
import GroupGeneratorLibrary from "./group-generator-library";
import { GenerationFrequency } from "./group-generator.types";
import { GroupGenerator } from "./group-generator";

const router = Router();

type GroupGeneratorAPIType = {
  name: string;
  generationFrequency: GenerationFrequency;
};

const serialize = (
  name: string,
  groupGenerator: GroupGenerator
): GroupGeneratorAPIType => ({
  name: name,
  generationFrequency: groupGenerator.generationFrequency,
});

router.get("/", async (req, res) => {
  const groupGenerators = GroupGeneratorLibrary.generators;
  const items: GroupGeneratorAPIType[] = [];
  for (const groupName in groupGenerators) {
    items.push(serialize(groupName, groupGenerators[groupName]));
  }
  res.json({
    items: items,
  });
});

export default router;
