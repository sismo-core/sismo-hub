
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
      "0xDD2b3f1d3a4f08622a25a3f75284fC01ad0c5CcA": "1",
      "0x86AE120DFf0967Fdb20ADa7629976A759A6FdEdf": "2",
      "0x9090A5d516f2054007bD184caf55760B51fcFBfD": "3",
      "0x1EC75BaBD4CDe5Fe58D7268bb3F2C34B534F8d81": "4",
    };

    return [
      {
        name: "administrators",
        timestamp: context.timestamp,
        description: "Data groups of the different admin ranks for our Melon App",
        specs: "Data groups by address holders",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
