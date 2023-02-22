
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
      "0x732D9b4AA4ceCCB16EE07cfD3A4946A240a684EA": "1",
      "0x7cbE0Db898e210D0E5F8f361b0E3C25186BebA4e": "1",
      "0xC8F74b95c4216a61cE6337aEd89E831DF0FEd63c": "1",
      "0xaE256cD2d13353e549d09aEA8D4105c8d1cc09d8": "1",
      "0x9535d90580f7969e7428c22F0B676628e9C02ae1": "1",
      "0x117b393BEBaD9215768192A763B7c095016bdf9d": "1",
      "0xbE318638503759FD8C95162464Bc3393f7eAfd8B": "1",
      "0x8F1cD354073568900294928c2aE373C2464B1265": "1",
      "0x82e9A55aFb16A26FF840E83DeC37E7088774C8ee": "1",
      "0xEE730A25cA18b1ba36F5992ba50e562b70391954": "1",
      "0xf2931400A2E42d15919644b884424CEC166006Fd": "1",
      "0x1C246c027fE113dDB4fF2900244e28bA95818289": "1",
      "0x32eB30CAe36e1c2E9271ca1c02DA64e5C27cB465": "1",
      "0xE4983A9f2411824820409F36F023A69ED0999D58": "1",
      "0x1D72C5ec4ae74eF80C51bBbD3433cF6A2eD21ea0": "1",
      "0x0De7030ABDC26A717f7290b1E3C68385246e7DAd": "1",
      "0x5668074d78e3c524f3ea4983fa8ce334fff2047a": "1",
      "0xd469Ce76ca266dC2B84B2782A1879e6E0743492d": "1",
      "0x5FB9303477d0cdE0e2935f9f08C2D9988ECE56Af": "1",
      "0x939d8f09e002EaF17E10acaB804164becE5B8e3c": "1",
      "0x58d8984447086CEbA3CBE591fe71970Be3402DF2": "1",
      "0x23cb05c7f88f9e62fd3971c47aedc5df18e9a7bc": "1",
      "0x37089e3a35221bdffb1889fd7028368b2423e307": "1",
      "0x7882caC398FFFE6E76B9c2a576F875b39e0278b1": "1",
      "0x5f1e94a170671ab7336116ddf8f15a0aad3d3f9c": "1",
      "0x604E5166f1123147042E0d6eE59B38A9fAdEC4E8": "1",
      "0x66b406c96dfe5f87689236976151caa02eb66921": "1",
      "0x923b6bFC8Cb0d9a57716a1340F7b86E8B678ECEa": "1",
      "0x9826b474ca644e5cf0f49c80b350caa13ee7a993": "1",
    };

    return [
      {
        name: "singularity-dao",
        timestamp: context.timestamp,
        description: "Leave the address under the tweet",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
