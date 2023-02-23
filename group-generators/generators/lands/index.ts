
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
  
    
    const jsonListData0 = {
      "0xAbAa2F0BE79447311f06D071114053898611e79e": "1",
      "0x01B13884915D2821Dfd793f22bCcdf1bc3Daf45F": "1",
      "0x014d49D54414003032cfFBC787AE1198FF07FCbc": "1",
      "0xD31d9972EEe43edda9CC6C15aa4dBd8f3EA2f116": "1",
      "0xB1A047C0EF1ffBe6e563cCFaf4C7140Ce6a3BC37": "1",
      "0xa131800C941Bd7E7df7D5b3d1b4cD29BC6381B58": "1",
    };

    return [
      {
        name: "lands",
        timestamp: context.timestamp,
        description: "hold by the land owners",
        specs: "hold by the land owners",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
