
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
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
  
    const lensProvider = new dataProviders.LensProvider();
    
    const jsonListData0 = {
      "0x7cb03197f09dBB07402eE9c215Ab29D527bfa33A": "1",
      "0x07b1a3138522FB3954610695434f39126C45c538": "1",
      "0x540bF2248327654DC40ebC8054E3A73Ed49bD4fe": "1",
      "0x9AD986D96120fAcc72C602495410FcfbED319e91": "1",
      "0x179Cd0Cc34427668AF8ce8EA503536C0f219E263": "1",
      "0xFA8068d46d907Fc89EcA188F98A2Fa006119Bb6E": "1",
      "0xca77b99d8bc30Cb07b2948b26EF3dfE94245b8Fa": "1",
      "0xDA3ccbe70A22E722c0feb78C33703E862703E4a7": "1",
      "0xC6672BccBA02398D5870BB30BD8a2f72c81F5040": "1",
      "0x4De9efA0cb41D0869468599050ADC56ed30617c1": "1",
      "0x79D81A29A27e963969237a68A5BD8587B31D25dB": "1",
      "0x59b7e7a9e01FDAB7e6AD4c4ADbF89D30A50CC475": "1",
      "0x4678880e0Fd1050d9Fc3c1c14F127b5Ec2D09b8a": "1",
      "0xF929757f0ad199Ed89fEA1497949eF2F9bf8ea25": "1",
      "0xe5198d0B716e65C2AE6b02Ea88eDD551c3E41a0e": "1",
      "0xc94bA02066f023aa981CdDc9300272FBef00b2E8": "1",
      "0xf4975253a0E5A6f02050b7fc6a27729036100c6f": "1",
      "0x650A61871FddF6F77D33806A51D2044c40D9dAc0": "1",
      "0x9D304B3e91d7eBCAeE197035637572eFce508fC6": "1",
      "0x20cd522D4a12eA0bC16E2130B71a18cAc2587aF5": "1",
      "0x8A5062879788b6D7c17Cb98Cf8286f21b09A2937": "1",
      "0x7566b6c294145d46cbfCf2b3b0BDDCE1cb647C7c": "1",
      "0xf937E38d3752f6c4D44E8D806cD8164fC487C86e": "1",
      "0x951671150A4E37Bfcd73e4E07504FDA2105195B5": "1",
      "0xF4Fd3Bafb201E712545A9Aab1693dedC1A9984F8": "1",
    };
    
    const lensProviderData1 = await lensProvider.getFollowers({
      profileId: "toufu.lens"
    });
    
    const dataUnion = dataOperators.Union([
      jsonListData0,
      lensProviderData1 
    ]);

    return [
      {
        name: "nowheresafe",
        timestamp: context.timestamp,
        description: "Toufu.lens followers",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
