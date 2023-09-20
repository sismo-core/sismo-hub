
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "0xb5AB443DfF53F0e397a9E0778A3343Cbaf4D001a": "1",
      "0x02bD49dB090EEB2F77Aad7d313028b7D9e288c8E": "2",
    };

    return [
      {
        name: "myteammembers",
        timestamp: context.timestamp,
        description: "MyTeamMembers",
        specs: "MyTeamMembers",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
