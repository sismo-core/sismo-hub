
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const jsonListData0 = {
      "sismo-connect-app(appid=0xffe981d059744847a152d6917b93366a):0x1cf2599741742dd0b02b2816ae37e10bf61b1e5098a47f5562e66947e50e112f": "1",
      "0x10ed43c718714eb63d5aa57b78b54704e256024e": "1",
      "0x37cd9b411029acbc14661152ec628d1e6bfc84c4": "1",
      "0xa21576767b15a8800cd2e0543d850b2ca73e8bfc": "1",
      "0xa07ebbad15afd879bae608503382844cd66f5707": "1",
    };

    return [
      {
        name: "vault-id-test",
        timestamp: context.timestamp,
        description: "Test of the vaultId group",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
