import { BigNumberish } from "ethers";
import { dataOperators } from "@group-generators/helpers/data-operators";
import BigQueryProvider, {
  SupportedNetwork,
} from "@group-generators/helpers/data-providers/big-query/big-query";
import {
  ValueType,
  Tags,
  FetchedData,
  GroupWithData,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const bigQueryProviderEthereum = new BigQueryProvider({
      network: SupportedNetwork.MAINNET,
    });

    const bigQueryProviderPolygon = new BigQueryProvider({
      network: SupportedNetwork.POLYGON,
    });

    const donateEventABI =
      "event DonationSent(address indexed token, uint256 indexed amount, address dest, address indexed donor)";

    type DonateEventType = {
      token: string;
      amount: BigNumberish;
      dest: string;
      donor: string;
    };

    const contractAddresses = {
      ethereum: "0x7d655c57f71464B6f83811C55D84009Cd9f5221C",
      polygon: "0xb99080b9407436eBb2b8Fe56D45fFA47E9bb8877",
    };

    // Sismo Gitcoin grant interval for fetching
    const grantPeriodTimestamp = ["2021-01-01 17:00:00", "2022-09-25 02:00:00"];

    const getSismoGitcoinDonorsEthereum =
      await bigQueryProviderEthereum.getEvents<DonateEventType>({
        contractAddress: contractAddresses.ethereum,
        eventABI: donateEventABI,
        options: {
          timestampPeriodUtc: grantPeriodTimestamp,
          data: "0x0000000000000000000000006e5cd14de0ad04f4012d057acdb01109a8f7b676", // sismo grant contract address
        },
      });

    const getSismoGitcoinDonorsPolygon =
      await bigQueryProviderPolygon.getEvents<DonateEventType>({
        contractAddress: contractAddresses.polygon,
        eventABI: donateEventABI,
        options: {
          timestampPeriodUtc: grantPeriodTimestamp,
          data: "0x0000000000000000000000006e5cd14de0ad04f4012d057acdb01109a8f7b676", // sismo grant contract address
        },
      });

    const dataEthereum: FetchedData = {};
    const dataPolygon: FetchedData = {};

    for (const event of getSismoGitcoinDonorsEthereum) {
      dataEthereum[event.donor] = 1;
    }

    for (const event of getSismoGitcoinDonorsPolygon) {
      dataPolygon[event.donor] = 1;
    }

    const data = dataOperators.Union([dataEthereum, dataPolygon]);

    return [
      {
        name: "sismo-gitcoin-donors",
        timestamp: context.timestamp,
        description: "Sismo Gitcoin donors",
        specs: "",
        data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
