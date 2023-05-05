import axios from "axios";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const url =
      "https://api.flipsidecrypto.com/api/v2/queries/51f179ec-4200-4070-ba05-a8c2e12cd68c/data/latest";
    const response = await axios.get(url);
    const allDelegatees = response.data;
    const sismoData: FetchedData = {};

    for (const delegatee of allDelegatees) {
      if (delegatee.AMOUNT >= 10) {
        sismoData[delegatee.DELEGATING_ADDRESS] = 1;
      }
    }

    return [
      {
        name: "aavechan-above10",
        timestamp: context.timestamp,
        description:
          "Group for AAVECHAN delegators who delegate more 10 or more AAVE or stkAAVE",
        specs:
          "Group for AAVECHAN delegators who delegate more 10 or more AAVE or stkAAVE",
        data: sismoData,
        valueType: ValueType.Score,
        tags: [Tags.Mainnet],
      },
    ];
  },
};

export default generator;
