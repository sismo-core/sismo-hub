
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
      "0xaeb7Ac2B294A6c1841CCf0374A264F0A6c32C7c9": "1",
      "0x5ED28248d8B4132F2Faece526130d2678A7Bf083": "1",
      "0x27dbf7ea0661F9B5A765918fccDDC9109E95a2F0": "1",
      "0xBC2327A5B552a606F5663aba3c0D955467407D4f": "1",
      "0xB819E75169c7d0A3471AE340223287FBd012a28f": "1",
      "0xfa4173EA7bc8831E4EBb4abC9ab8f4Fb1C3c1D27": "1",
      "0x7856696b06EB6e18Ef981E62D9c39c5F69d48328": "1",
      "0xF15bA1167278F47101cc6469D5F94A1330C9A45F": "1",
      "0x3591207508Fd890EC78Bf194E4ab7022523f085f": "1",
      "0x6EEFf6d1a33C6BB7D7729500dcB2fb6761BA2E27": "1",
      "0xe05B02a527D8e16c7b2992D200fAac2A37A63fc9": "1",
      "0x9BcAB8f7E2c0CD4438c750FbD2c704efAF122ce2": "1",
      "0x1b7a0DA1D9c63D9B8209fa5cE98aC0D148960800": "1",
    };

    return [
      {
        name: "farmer",
        timestamp: context.timestamp,
        description: "Hold ENS",
        specs: "Hold a SISMO ENS",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
