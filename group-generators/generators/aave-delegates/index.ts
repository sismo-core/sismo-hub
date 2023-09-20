
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "aavechan.eth": "1",
      "0x070341aA5Ed571f0FB2c4a5641409B1A46b4961b": "1",
      "aave.standard-crypto.eth": "1",
      "0xFFC97d72E13E01096502Cb8Eb52dEe56f74DAD7B": "1",
      "0x990daFE818681F8E18d14E2Ae7abD30aE46BF1c2": "1",
      "0x25F2226B597E8F9514B3F68F00f494cF4f286491": "1",
      "flipsidecrypto.eth": "1",
      "wintermutegovernance.eth": "1",
      "blockchaincolumbia.eth": "1",
      "0xaFDAbFb6227507fF6522b8a242168F6b5F353a6E": "1",
      "michiganblockchain.eth": "1",
      "stablelab.eth": "1",
      "0x2cc1ADE245020FC5AAE66Ad443e1F66e01c54Df1": "1",
      "lbsblockchain.eth": "1",
      "llamagov.eth": "1",
      "blockchainatucla.eth": "1",
      "0xC697051d1C6296C24aE3bceF39acA743861D9A81": "1",
      "lucasvo.eth": "1",
      "0x4a49985B14bD0ce42c25eFde5d8c379a48AB02F3": "1",
      "calblockchain.eth": "1",
      "hkustblockchain.eth": "1",
    };

    return [
      {
        name: "aave-delegates",
        timestamp: context.timestamp,
        description: "Aave-delegates",
        specs: "Data groups of Aave delegates based on Boardroom data, updated manually when a new delegate candidates. ",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
