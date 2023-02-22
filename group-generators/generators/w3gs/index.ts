
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
      "0x9D89a3380F307650d9c2dc8b034D1388aB996Efe": "1",
      "kieranpm.eth": "1",
      "0x1F1Bd54eCAE5F400bdDBa27bF079Ed44f181df4a": "1",
      "marktully.eth": "1",
      "0x53DD35e2bCD31906cc396D464cEdd38Ba62d2C24": "1",
    };

    return [
      {
        name: "w3gs",
        timestamp: context.timestamp,
        description: "participation in a W3GS event ",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
