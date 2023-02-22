
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
      "0xc24Fe6f2bae027aeee47390be73D121f18F51bdB": "1",
      "0x26913b0EB24964181045FC7eb915BCf6DFA2C16E": "1",
      "0xBD8b4dc1126BaeA6Cc0F45b7dfE0c1AB6CcDD2DE": "1",
      "0x889eF0355112fEa47cBf479CBc5866fB94b91B6d": "1",
      "0x170a13359792d9A0ebC91eD181F224b980abA5cB": "1",
      "0x0B433FBF6ACB52fd4537dA2d358aF24b136d8789": "1",
      "0xd955B38fB3Ee870c1DAa217b5fd0de82Efb2e4E2": "1",
      "0x762c853Fb653323fb46e27Cb3cD631022B5B8343": "1",
      "0x3dC46bb603fB84D0F1b8111810D41C4e951afd29": "1",
      "0x431e1D92a7a350DBDfECB58ddaa56D3ECEd5f01E": "1",
      "0x6142cCaf1d095c10a2b8B6f1235c48fD5bf26Fe1": "1",
      "0x1417E1b670f6dcD13f2E1de882B84E23E4E8137e": "1",
      "0x6b15E2A8b5A5cAAdf06Fa8ed7A67f2eF4c9C917E": "1",
      "0x1b24FB758BC1A8c8D4B91c86E8b5747c52B0a383": "1",
      "0x0efB2060F39CbaB8EC1524627Fc4Aa6B90BE13DB": "1",
    };

    return [
      {
        name: "zl019",
        timestamp: context.timestamp,
        description: "Become a part of ZL019, hold DAI, who @wieYYDS, get verified at sismo.io",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
