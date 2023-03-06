
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
      "0x02385273f31812b3da46479aa9a710324830b648": "1",
      "0x154a309479e3cc5b40a363a419262601b9502b40": "1",
      "0x2acdb2013e64566aa20279c50c36fe4139651483": "1",
      "0x3be11ad5fc74d8bfdd321968c2a27220f4ba6f1a": "1",
      "0x417ecae932d3bae2d93a2af6da91441d46532a7c": "1",
      "0x49d1978dce1a788a0e33ac59c004e5fee4093e95": "1",
      "0x52b0c756d6f36af804c51211bd5a1fa4ab5dc911": "1",
      "0x53618fa426688be0dead4cd9116518d4f319b243": "1",
      "0x630fdd8641c35719d3628beb877cebadf46e1138": "1",
      "0x670fe3f42b4ac2ebc450e84d670c05cfc2e19759": "1",
      "0x72eba299088937ceaab3d7bde6234aee81a8bf76": "1",
      "0x8dcdb2db0268cde7b5c55492ef31e4fa3d187ac8": "1",
      "0xaac75aee1d3dac4e6a5435c589f36fe4f042fd1d": "1",
      "0xbd73fc8b44cb49f02702a5e0e1c1defcc7f73b7e": "1",
      "0xcf683f870f0e5e1127e87903f4d41efd4438d274": "1",
      "0xd3a81f6cc9ac6e437a4d88e6daf1598bde2a34a9": "1",
      "0xda80ca3f91e695d64a04d93c979b715221dbc30a": "1",
      "0xdaa22b54aa15180a4af68712ac7efaa5578ac81c": "1",
      "0xdef7304586638e1aec8844c2152bd9ece7dbd45a": "1",
    };

    return [
      {
        name: "tuuran-lenster-friends",
        timestamp: context.timestamp,
        description: "follow @tuuran on Lens protocol.",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
