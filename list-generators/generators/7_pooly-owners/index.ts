import { ValueType, Tags, FetchedData } from "../../../src/list";
import {
  GenerationFrequency,
  GeneratorContext,
  ListGenerator,
} from "../../../src/list-generator";
import { List } from "../../../src/list/list";
import BigQueryProvider from "../../helpers/providers/big-query/big-query";

export default new ListGenerator({
  id: 7,
  name: "pooly-owners",
  generate: async (context: GeneratorContext): Promise<List> => {
    const bigQueryProvider = new BigQueryProvider();

    const PoolySupporterAddress = "0x90b3832e2f2ade2fe382a911805b6933c056d6ed";
    const PoolyLawyerAddress = "0x3545192b340f50d77403dc0a64cf2b32f03d00a9";
    const PoolyJudgeAddress = "0x5663e3e096f1743e77b8f71b5de0cf9dfd058523";

    const poolySupporterOwnersData = await bigQueryProvider.getNftOwnership({
      contractAddress: PoolySupporterAddress,
      blockNumber: context.blockNumber,
    });
    const poolyLawyerOwnersData = await bigQueryProvider.getNftOwnership({
      contractAddress: PoolyLawyerAddress,
      blockNumber: context.blockNumber,
    });
    const poolyJudgeOwnersData = await bigQueryProvider.getNftOwnership({
      contractAddress: PoolyJudgeAddress,
      blockNumber: context.blockNumber,
    });

    let data: FetchedData = {};
    // Let's fill with the following value
    // Pooly Support => 1
    for (const address of Object.keys(poolySupporterOwnersData)) {
      data[address] = 1;
    }

    // Pooly Lawyer => 2
    for (const address of Object.keys(poolyLawyerOwnersData)) {
      data[address] = 2;
    }

    // Pooly Judge => 3
    for (const address of Object.keys(poolyJudgeOwnersData)) {
      data[address] = 3;
    }

    return new List({
      generationDate: new Date(context.timestamp),
      data,
      valueType: ValueType.Score,
      tags: [Tags.Mainnet, Tags.Asset, Tags.NFT],
    });
  },
  generationFrequency: GenerationFrequency.Weekly,
});
