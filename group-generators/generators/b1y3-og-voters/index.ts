
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
      "0x10489f2e7A7Dca3f98e1c235e1435C260C99F412": "1",
      "0xd82313eb6b6818E14949e92082f522293bd23DdC": "1",
      "0x0000000000000000000000000000000000000003": "1",
      "0x8582ebF8176e380360D2C103d31f7774D07d5d63": "1",
      "0xc4dCd1E829A00bfa382b5040D830536110392e28": "1",
      "0xACC6fDaCf8150e82829fFAB8F5505D04EdEA442c": "1",
      "0x99763E113Eb4C2BB26dC94B2250507eb7ab1A400": "1",
      "0x3054E0B7fe53eE6c28875F79cd64F54B0E92d7e7": "1",
      "0x0f73008fBAE2D4Db2003C08919B3208296BadF2d": "1",
      "0xC883281d9c1842C6469e522D1E8F566CeC00e292": "1",
      "0x7A0D133195E4f22Fef27251057e3989AB67D0860": "1",
      "0x2eac8BfA252f36f5634D267946D879A09a873a75": "1",
      "0xCaf0C8e0E587da5CE042da9Be3AB47dd4b38983d": "1",
      "0x10C63010788938d65ABf0a240504Ad51Aec02cAd": "1",
      "0x37Aa1eAF967E7D55d2a042fFDA3576FC2851550c": "1",
      "0x56149d99BCd6184CA8246675b0D1A25DfA688113": "1",
      "0x3BdDDC01C6C584873e4c9D02b19866851e7Ed811": "1",
      "0xA15E54A2E206c2fF1f9B424B2a51b716F16A4fb9": "1",
      "0x821ac64D6E1affD4aBce058f6DE294c3259c75fe": "1",
      "0x536f27fDE152b20551a3ff818864B3d9a42159F1": "1",
      "0xC314eeD2C873DaDcC59a9De41613beCC20E9519B": "1",
    };

    return [
      {
        name: "b1y3-og-voters",
        timestamp: context.timestamp,
        description: "Be part of early B1Y3 community ",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
