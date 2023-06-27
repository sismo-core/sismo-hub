
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
      "0xac6c431E01Ee4632ceEeFAa2a1Ba59f916f623d7": "1",
      "0x00000000219ab540356cbb839cbe05303d7705fa": "1",
      "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2": "1",
      "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8": "1",
      "0x0716a17fbaee714f1e6ab0f9d59edbc5f09815c0": "1",
      "0x47ac0fb4f2d84898e4d9e7b4dab3c24507a6d503": "1",
      "0x78605df79524164911c144801f41e9811b7db73d": "1",
      "0x8484ef722627bf18ca5ae6bcf031c23e6e922b30": "1",
    };

    return [
      {
        name: "the-ramen-shop",
        timestamp: context.timestamp,
        description: "Holder of The Ramen Shop Genesis Collection NFT",
        specs: "You need to be a holder of The Ramen Shop ERC721 NFT",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
