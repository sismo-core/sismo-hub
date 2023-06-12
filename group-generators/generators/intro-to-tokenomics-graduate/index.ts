
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
      "0x1CBbe9fc5520AaE025945e23578d488EB5548922": "1",
      "0x72f2c4dD290D1C08d5763c812028655CBde3FB53": "1",
      "0x8B455614f6D35fFEC796181Cef76FCBcA10540EC": "1",
      "0xf478063e4b46df8e3b8042cc94d182ebf6c02e5a": "1",
      "0xF0cDb2DE342184d43Bf7A457a3391eB34f9e56a7": "1",
      "0x511f65359cF7d1D9AC38e5ef58c4aAcd6222e8aa": "1",
      "0xCE0e605B7A7E4f0A0e6E24351eEbcE55547D523d": "1",
      "0x278a4BD5A8d09bCF11B1052eC3129A7EFa75D213": "1",
    };

    return [
      {
        name: "intro-to-tokenomics-graduate",
        timestamp: context.timestamp,
        description: "Graduates of &quot;Intro to Tokenomics&quot; online course by Tokenomics DAO",
        specs: "Must subscribe to paid &quot;Intro to Tokenomics&quot; course and complete all sections to at least 90% to be eligible for this course completion ZK Badge.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
