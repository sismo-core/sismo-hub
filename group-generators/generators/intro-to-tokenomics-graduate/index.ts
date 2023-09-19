
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
      "0x7Ad2b076D7523cd68b6CD1CbB29A2F173Cbb8E22": "1",
      "0xC0D2810703714dD71dd9B25e47C92a9F07c55FE6": "1",
      "0x5389b25D06B7a6d178DC491FC7F50d3c9192c56F": "1",
      "0x1896cD2c54EdC8ab0d6E43C6C7107Ac9EA7C8163": "1",
      "0xD9b4F9083a6E3f36a02161e41297e899D4b3afCa": "1",
      "0x9Cd40b891dB9aB9267A663e459Faca1F70775206": "1",
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
