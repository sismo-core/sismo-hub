import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    return [
      {
        name: "relay-badge",
        timestamp: context.timestamp,
        description: "Be on the Relay team",
        specs: "A member of the Relay team. ",
        data: {
          "killthebuddha.eth": "1",
          "vdp.eth": "1",
          "seanwbren.eth": "1",
          "brianschafer.eth": "1",
          "worldpe.eth": "1",
          "mmmarcus.eth": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
