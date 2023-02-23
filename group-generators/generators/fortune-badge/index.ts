
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
      "0x8EB01C142DE0B153b0ef01De1d3D383Bb4da8a83": "1",
      "0x0D4A9d78A8e1B370421084C4CB1db7aE39df081a": "1",
      "0x9af4212a24862C5A6E63F70c1f455262fa9F24b1": "1",
      "0xB851E5d800CA2E8242E447DDb28a57c86B9d526a": "1",
      "0x38B8672AAA53bEc1Abaf380759bFCcc746a85692": "1",
      "0x5FAb1bf0e8f724748D98376fdD489e7575aAE42F": "1",
      "0x229dC0F672329eAF4b3E4eD54551918b616d1529": "1",
      "0x47811bB495B7c6443d9cAd213C6cCBb2ea32159A": "1",
      "0xed03116F35EFFbe8c822571B344b9479Ca002AE7": "1",
      "0xD0d7989a0C01b83475c469d40DA1ED2240625291": "1",
      "0x0fe300CA85E6A650f594638cCFDD402b69615749": "1",
      "0x2C724947403c329bfff271a74326998223A11d0d": "1",
      "0x6ffa425f5c1e72e0558405ADBcDB7FbB3C20a420": "1",
      "0xe99AbbeC9B9BbdA3c36606D49251DA987F469bE1": "1",
      "0x840e5551B76579Be073cA159B79296863B28c41D": "1",
      "0xe4015dff966B66914e00256A7b7449671791e7fb": "1",
      "0x0fdbeAc1044b973d5213F8DC4550A1584B113818": "1",
      "0xddb72E813528CCFCbe92926B72d6D42236aAB026": "1",
      "0x072e4aeCCA554703DD7A58755b607fC139598965": "1",
      "0x816f8248bE58B1eD40AA581E98Ac1e4b1E598380": "1",
      "0x9866fE706C9F357f68F1dF7a55b6ee2AfE1F34b8": "1",
      "0x15c6f17aaAeE03ba56792F4e625e99375e961e2B": "1",
      "0xaff4240050e4B99E0DdD197b401CaCF814924fee": "1",
      "0x7F8E0231BF4aCb57e8AadFa8c95Edb708B5a5d50": "1",
      "0x1b126F9bd77800b114E58362B7E644Dbe00e86B7": "1",
      "0x4321082B74270d5494753BD813f49b6ADd9190Cc": "1",
    };

    return [
      {
        name: "fortune-badge",
        timestamp: context.timestamp,
        description: "Community Money badge",
        specs: "Community Money badge",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
