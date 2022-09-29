import {addresses} from "./addresses.json"
import { ValueType, Tags, FetchedData, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    const gitcoinApiAddresses = addresses

    const dataApi = gitcoinApiAddresses.map(address => {
        return address[0]
    })

    const data : FetchedData = {}

    for (const address of dataApi) {
        data[address] = 1
    }

    return [
      {
        name: "gitcoin-grant-15-api-donors",
        timestamp: context.timestamp,
        data,
        valueType: ValueType.Score,
        tags: [Tags.GitcoinGrant],
      },
    ];
  },
};

export default generator;
