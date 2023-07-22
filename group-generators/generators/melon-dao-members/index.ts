
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
      "0xdd2b3f1d3a4f08622a25a3f75284fc01ad0c5cca": "2",
      "0x86ae120dff0967fdb20ada7629976a759a6fdedf": "3",
      "0x9090a5d516f2054007bd184caf55760b51fcfbfd": "3",
      "0x1ec75babd4cde5fe58d7268bb3f2c34b534f8d81": "1",
    };

    return [
      {
        name: "melon-dao-members",
        timestamp: context.timestamp,
        description: "Melon DAO members.",
        specs: "Data groups of the Melon DAO members. Values are ranks within the DAO. Value 1 - Token holders who've participated at least once in governance votes. Value 2 - Basic administrative rights. Value 3 - Highest executive rank.",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
