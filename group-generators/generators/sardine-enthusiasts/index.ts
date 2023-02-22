import {
  Tags,
  ValueType,
  GroupWithData,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Once, // you generate the group only once
    
    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

        return [
          {
            name: "sardine-enthusiasts",
            timestamp: context.timestamp,
        description: "Eat a can of sardines every day",
        specs: "",
            data: {'0x69BAAA26EeA1056C74796c9a523d61a73fbd8Cf3': 1}, // just me lol
            valueType: ValueType.Score,
            tags: [Tags.User],
          },
        ];
      },
}

export default generator;
