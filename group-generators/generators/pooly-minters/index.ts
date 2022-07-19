import { BigNumberish } from "ethers";
import { ValueType, Tags, FetchedData } from "../../../src/topics/group";
import {
  GenerationFrequency,
  GroupGenerator,
} from "../../../src/topics/group-generator";
import { Group } from "../../../src/topics/group";
import BigQueryProvider from "../../helpers/providers/big-query/big-query";

export default class extends GroupGenerator {
  generationFrequency = GenerationFrequency.Once;

  async generate(): Promise<Group[]> {
    const bigQueryProvider = new BigQueryProvider();

    const NFTMintedEventABI =
      "event NFTMinted(address indexed to, uint256 numberOfTokens, uint256 amount)";
    type NFTMintedType = {
      to: string;
      numberOfTokens: BigNumberish;
      amount: BigNumberish;
    };

    const getPoolyMinters = async (
      contractAddress: string
    ): Promise<NFTMintedType[]> => {
      return bigQueryProvider.getEvents<NFTMintedType>({
        contractAddress,
        eventABI: NFTMintedEventABI,
        options: {
          blockNumber: this.context.blockNumber,
        },
      });
    };

    const PoolySupporterAddress = "0x90b3832e2f2ade2fe382a911805b6933c056d6ed";
    const PoolyLawyerAddress = "0x3545192b340f50d77403dc0a64cf2b32f03d00a9";
    const PoolyJudgeAddress = "0x5663e3e096f1743e77b8f71b5de0cf9dfd058523";

    const poolySupporterMinters = await getPoolyMinters(PoolySupporterAddress);
    const poolyLawyerMinters = await getPoolyMinters(PoolyLawyerAddress);
    const poolyJudgeMinters = await getPoolyMinters(PoolyJudgeAddress);

    const data: FetchedData = {};
    // Let's fill with the following value
    // Pooly Support => 1
    for (const address of poolySupporterMinters) {
      data[address.to] = 1;
    }

    // Pooly Lawyer => 2
    for (const address of poolyLawyerMinters) {
      data[address.to] = 2;
    }

    // Pooly Judge => 3
    for (const address of poolyJudgeMinters) {
      data[address.to] = 3;
    }

    return [
      new Group({
        name: "pooly-minters",
        timestamp: this.context.timestamp,
        data,
        valueType: ValueType.Score,
        tags: [Tags.Mainnet, Tags.Asset, Tags.NFT],
      }),
    ];
  }
}
