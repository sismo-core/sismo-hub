
import { dataOperators } from "@group-generators/helpers/data-operators";
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
      "twitter:PowerHasheur": "1",
      "twitter:CFarmeur": "1",
      "twitter:crypto_futur": "1",
      "twitter:CryptoPicsou": "1",
      "twitter:TagadoBTC": "1",
      "twitter:CryptoJonFR": "1",
      "twitter:Paul_Theway": "1",
      "twitter:carlitacrypto_": "1",
      "twitter:CryptoMafiaFR": "1",
      "twitter:coinstationfr": "1",
      "twitter:CryptoastMedia": "1",
      "twitter:LeJournalDuCoin": "1",
      "twitter:CryptoMatrix2": "1",
    };
    
    const jsonListData1 = {
      "twitter:MiningTk": "1",
      "twitter:QHbrcht": "1",
      "twitter:CryptoSauceYT": "1",
    };
    
    const dataUnion = dataOperators.Union([
      jsonListData0,
      jsonListData1 
    ]);

    return [
      {
        name: "crypto-twitter-fr",
        timestamp: context.timestamp,
        description: "Data Group of French crypto content creators",
        specs: "You need to have a Twitter account of at least 5.000 followers.",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
