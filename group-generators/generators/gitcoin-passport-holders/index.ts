import { dataProviders } from "@group-generators/helpers/data-providers";
import { ApiConfig } from "@group-generators/helpers/data-providers/rest-api";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    type Passport = {
      address: string,
      score: string,
      status: string,
      last_score_timestamp: string,
      evidence: {
        type: string,
        success: boolean,
        rawScore: string,
        threshold: string
      },
      error: any
    };

    const restProvider = new dataProviders.RestProvider();
    const gitcoinPassportHolders: FetchedData = {};
    const url = "https://indexer-grants-stack.gitcoin.co/data/passport_scores.json";

    const apiConfig: ApiConfig = {
      url: url,
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };

    const res: any = await restProvider.fetchData(apiConfig);

    res.forEach((passport: Passport) => {
      if(passport.status == "DONE") {
        if(passport.evidence.success) {
          gitcoinPassportHolders[passport.address] = passport.evidence.rawScore;
        }
      }
    });

    return [
      {
        name: "gitcoin-passport-holders",
        timestamp: context.timestamp,
        description: "Prove that you own a Gitcoin Passport",
        specs: "You must have a Gitcoin Passport",
        data: gitcoinPassportHolders,
        valueType: ValueType.Score,
        tags: [Tags.SybilResistance],
      },
    ];
  },
};

export default generator;
