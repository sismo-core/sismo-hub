
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
      "0xf48350c2c3B39A84b919dD88c29E1B3ab24841D8": "1",
      "0x657944E294E4e3e20cf0863EB997954801CACe5e": "1",
      "0xc57fa06959157829623Dc317973429dB25E1a675": "1",
      "0xaf2D22BDed8B333BD499edC460EC69d50eeECBf0": "1",
      "0xEFf034f8D1FBedC4476B5a83b623B263bb4E5e84": "1",
      "0xdee55B415b0b7Dc28C846F4a6d665Ed89a626C5E": "1",
    };

    return [
      {
        name: "roadtolife2",
        timestamp: context.timestamp,
        description: "Be part of Github, follow twitter, be verified on Discord",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
