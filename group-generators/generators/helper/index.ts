
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
      "0x2c2e67a4c5Ea3335408406503844D4879C84A9f6": "1",
      "0x4DF83971f6f1bFD8D33a2E79584bDFDe75F4DF60": "1",
      "0x261acB4aE504bfe1a3d22875F135AD8F3252e499": "1",
      "0x619499888c3c6c0a2786AC23fB3AB731bB413b08": "1",
      "0xBBC3d8108069B10a5859a08f31d140b9f357F73f": "1",
      "0x7C94803E9F63706437E91606bCb58A07A6789157": "1",
      "0xf31df2dcd4083ee57f0d33d386656cfbd1e859a1": "1",
      "0x2085E2838DE7f47128A94AC9d938ed4C5A28016B": "1",
    };

    return [
      {
        name: "helper",
        timestamp: context.timestamp,
        description: "Help someone in need at Web3 Help Desk.",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
