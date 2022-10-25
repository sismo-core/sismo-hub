
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Once,
  
    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
      return [
        {
          name: "rhinofi-power-users",
          timestamp: context.timestamp,
          data: {
            "0xd69005F707ed755D530FbA0FBEa9eDe0749F9832": 1,
            "0x0099F5326F05Fb8B3f541997526e9D9224a88147": 2,
          },
          accountSources: [AccountSource.ETHEREUM],
          valueType: ValueType.Info,
          tags: [Tags.User],
          
        },
      ];
    },
  };
  
  export default generator;