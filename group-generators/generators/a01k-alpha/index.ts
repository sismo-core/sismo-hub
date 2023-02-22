
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
      "obolonchik.eth": "1",
      "twitter:001k_alpha": "1",
      "dzyn01k.eth": "1",
      "0x0ba028c98E19DD6217255519645eDeD89D68Ec63": "1",
      "0x468025846eCF70b9aC49261b345F453f19e66b85": "1",
      "0xA44CA63136A48237b4Ff4acf2AAEAfcCa6D775eA": "1",
      "0xFb0c57093BBC80b28820164aA148D7e84cFdF8aD": "1",
      "0x9Fbf9c375c72e109604E8a72fA6b804dBB96Ca66": "1",
      "0x7D2E25dDB73b90400A57452D35ed6e2803D7F894": "1",
      "0xB8763abf098D741AB755c38Bbf9565838D19b501": "1",
      "0xa088771dFf052eC295Cba755C7735d333810e3FF": "1",
      "0xA70291AF2821C817EF6B4248635cb9FbBE666645": "1",
      "0xb53999769C642E163255988Dc933BC0671fA8492": "1",
    };

    return [
      {
        name: "a01k-alpha",
        timestamp: context.timestamp,
        description: "Be part of the a01k Alpha team, follow a01k.Crypto on twitter",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
