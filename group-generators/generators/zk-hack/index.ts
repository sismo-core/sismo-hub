
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
      "github:wborgeaud": "1",
      "github:niooss-ledger": "1",
      "github:Konstantce": "1",
      "github:tjade273": "1",
      "github:NicsTr": "1",
      "github:bkomuves": "1",
      "github:learningalbert123": "1",
      "github:obeliskgolem": "1",
      "github:tamirhemo": "1",
      "github:maxgillett": "1",
      "github:BlockHeader": "1",
      "github:pluxoid": "1",
      "github:Ethan-000": "1",
      "github:lucasxia01": "1",
      "github:naure": "1",
      "github:oneeman": "1",
      "github:AleksanderMisztal": "1",
      "github:danielementary": "1",
      "github:tekkac": "1",
      "github:shuklaayush": "1",
      "github:grjte": "1",
      "github:cgsvv": "1",
      "github:georgwiese": "1",
      "github:akinovak": "1",
      "github:JL2718": "1",
      "github:baumbata": "1",
      "github:onsen-egg": "1",
      "github:finiteprods": "1",
      "github:kryptomouse": "1",
      "github:therealyingtong": "1",
      "github:nalinbhardwaj": "1",
      "github:StarLI-Trapdoor": "1",
    };

    return [
      {
        name: "zk-hack",
        timestamp: context.timestamp,
        description: "At least 1 Puzzle submission",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
