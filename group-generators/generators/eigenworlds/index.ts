
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
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const wiwBadgeProvider = new dataProviders.WiwBadgeProvider();
    
    const wiwBadgeProviderData0 = await wiwBadgeProvider.queryBadgeHolders({
      tagId: "49ed9bb903453cdf594df640dbe6d2da4cb009f06bdce013c6b6d5a6a0f34159"
    });
    
    const wiwBadgeProviderData1 = await wiwBadgeProvider.queryBadgeHolders({
      tagId: "f7b10f907d5cefb0e8320a41b55d8019f03e86f691ae0473f539643a1a52b8f9"
    });
    
    const wiwBadgeProviderData2 = await wiwBadgeProvider.queryBadgeHolders({
      tagId: "0e1d40aa372131825a7ca334a918125aee0935ba36b2bee53caa560e63633c8d"
    });
    
    const wiwBadgeProviderData3 = await wiwBadgeProvider.queryBadgeHolders({
      tagId: "130c29140f566d717a71fb97eca4b2a26685a31a4dc89bb10ed99f76f8505b9e"
    });
    
    const wiwBadgeProviderData4 = await wiwBadgeProvider.queryBadgeHolders({
      tagId: "68a1044bcdb197b825a50de56fec5388e047f7cf82e790da94b6c8a4d5294f33"
    });
    
    const dataUnion = dataOperators.Union([
      wiwBadgeProviderData0,
      wiwBadgeProviderData1,
      wiwBadgeProviderData2,
      wiwBadgeProviderData3,
      wiwBadgeProviderData4 
    ]);

    return [
      {
        name: "eigenworlds",
        timestamp: context.timestamp,
        description: "EigenWorlds nft all data powered by wiw.io",
        specs: "Top Holder of EigenWorlds
Diamond Hand of EigenWorlds
Early Adopter of EigenWorlds
Holder of EigenWorlds
Minter of EigenWorlds
",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
