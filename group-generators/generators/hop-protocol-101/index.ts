import { dataProviders } from "@group-generators/helpers/data-providers";
import { GroupWithData, Tags, ValueType } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generateNameGroup = async (
  context: GenerationContext
): Promise<GroupWithData> => {
  const subgraph101Provider = new dataProviders.Subgraph101Provider();
  const addresses = await subgraph101Provider.getQuestHoldersByName({
    name: "Understanding Hop Protocol",
  });
  return {
    name: "hop-protocol-101",
    description: "Participants having completed the Hop protocol course on 101",
    specs: "Get all participants of Hop protocol course on 101",
    timestamp: context.timestamp,
    data: addresses,
    valueType: ValueType.Info,
    tags: [Tags.User],
  };
};

const generateIdGroup = async (
  context: GenerationContext
): Promise<GroupWithData> => {
  const subgraph101Provider = new dataProviders.Subgraph101Provider();
  const addresses = await subgraph101Provider.getQuestHoldersById({
    course_id: "cl59hfo69044209ju7lfhlpph",
  });
  return {
    name: "hop-protocol-101",
    description: "Participants having completed the Hop protocol course on 101",
    specs: "Get all participants of Hop protocol course on 101",
    timestamp: context.timestamp,
    data: addresses,
    valueType: ValueType.Info,
    tags: [Tags.User],
  };
};

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const nameGroup = await generateNameGroup(context);
    const idGroup = await generateIdGroup(context);

    return [nameGroup, idGroup];
  },
};

export default generator;
