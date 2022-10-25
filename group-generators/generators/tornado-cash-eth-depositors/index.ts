import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  ValueType,
  Tags,
  GroupWithData,
  AccountSource,
  FetchedData,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const transposeProvider = new dataProviders.TransposeProvider();

    const data: FetchedData = {};
    for await (const item of await transposeProvider.getTornadoCashDepositors('0x0000000000000000000000000000000000000000')) {
      if(data[item.from_address]) {
        data[item.from_address] = Number(data[item.from_address].toString()) + item.quantity
      }
      else {
        data[item.from_address] = item.quantity;
      }
    }

    return [
      {
        name: "tornado-cash-eth-depositors",
        timestamp: context.timestamp,
        data: data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Info,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;

