
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "dydymoon.sismo.eth": "1",
      "tokenbrice.eth": "1",
      "williamx.eth": "1",
      "flipsidecrypto.eth": "1",
      "starny.eth": "1",
      "stablenodegov.eth": "1",
      "0x72C99402AaCC7b764d10d2166d94c58cA045b5dc": "1",
      "0x1b05944D2B286961e583640b4D2FBD859b502b3c": "1",
      "0x4BE9A5d053Cb64e7568C3313AA24B70951323a14": "1",
    };

    return [
      {
        name: "paladin-delegates",
        timestamp: context.timestamp,
        description: "Paladin-delegates",
        specs: "Data group of Paladin delegates, updated manually when a new delegate candidates",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
