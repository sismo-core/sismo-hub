import axios from "axios";
import { ValueType, GroupWithData, FetchedData } from "topics/group";
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
    
    const delegates: FetchedData = {};

    for (const delegate of response.data) {
      const currentValue = delegates[delegate.DELEGATING_ADDRESS];
      delegates[delegate.DELEGATING_ADDRESS] = currentValue ? currentValue + delegate.AMOUNT : delegate.AMOUNT;
    }

    return [
      {
        name: "aavechan-aave-delegates",
        timestamp: context.timestamp,
        description:
          "Aave-chan Aave and stkAave delegates",
        specs:
          "Group consist of all Aave-chan Aave and stkAave delegates",
        data: delegates,
        valueType: ValueType.Score,
        tags: [],
      },
    ];
  },
};

export default generator;
