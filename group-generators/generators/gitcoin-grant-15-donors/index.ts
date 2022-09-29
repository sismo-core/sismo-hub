import { BigNumberish } from "ethers";
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/providers";
import BigQueryProvider, {
  SupportedNetwork,
} from "@group-generators/helpers/providers/big-query/big-query";
import { ValueType, Tags, FetchedData, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["gitcoin-grant-15-api-donors"],

  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
    const bigQueryProviderEthereum = new BigQueryProvider({
      network: SupportedNetwork.MAINNET,
    });
    const bigQueryProviderPolygon = new BigQueryProvider({
      network: SupportedNetwork.POLYGON,
    });

    const restProvider = new dataProviders.RESTProvider();

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
      zksync: "0xde21f729137c5af1b01d73af1dc21effa2b8a0d6",
    };

    // Gitcoin grant 15 dates : September 7 (9AM) MDT - September 22 (6PM) MDT
    const grantPeriodTimestamp = ["2022-09-07 17:00:00", "2022-09-23 02:00:00"];

    const getGitcoinGrantDonorsEthereum =
      await bigQueryProviderEthereum.getEvents<DonateEventType>({
        contractAddress: contractAddresses.ethereum,
        eventABI: donateEventABI,
        options: {
          timestampPeriodUtc: grantPeriodTimestamp,
        },
      });

    const getGitcoinGrantDonorsPolygon =
      await bigQueryProviderPolygon.getEvents<DonateEventType>({
        contractAddress: contractAddresses.polygon,
        eventABI: donateEventABI,
        options: {
          timestampPeriodUtc: grantPeriodTimestamp,
        },
      });

    let dataZkSync: FetchedData = {};

    const fectchZkSyncTx = async (data: FetchedData, i = 0) => {
      let txDate = 0;
      const fetchResult = await restProvider.fetchData({
        url: `https://api.zksync.io/api/v0.1/account/${
          contractAddresses.zksync
        }/history/${i * 100}/100`,
        method: "get",
        data: [],
      });

      Object.entries(fetchResult).forEach((tx) => {
        txDate = new Date(tx[1].created_at).getTime();
        if (
          txDate > new Date(grantPeriodTimestamp[0]).getTime() &&
          txDate < new Date(grantPeriodTimestamp[1]).getTime()
        ) {
          data[tx[1].tx.from] = 1;
        }
      });

      return { data, txDate, i };
    };

    let res = await fectchZkSyncTx(dataZkSync);

    while (res.txDate > new Date(grantPeriodTimestamp[0]).getTime()) {
      res = await fectchZkSyncTx(res.data, res.i + 1); // fetch while the timestamp of the tx is greather than the Grant start
    }

    dataZkSync = res.data;

    const dataEthereum: FetchedData = {};
    const dataPolygon: FetchedData = {};

    for (const event of getGitcoinGrantDonorsEthereum) {
      dataEthereum[event.donor] = 1;
    }

    for (const event of getGitcoinGrantDonorsPolygon) {
      dataPolygon[event.donor] = 1;
    }

    const dataApi = await groupStore.latest("gitcoin-grant-15-api-donors")

    const data = dataOperators.Union([dataEthereum, dataPolygon, dataZkSync, await dataApi.data()]);

    return [
      {
        name: "gitcoin-grant-15-donors",
        timestamp: context.timestamp,
        data,
        valueType: ValueType.Score,
        tags: [Tags.GitcoinGrant],
      },
    ];
  },
};

export default generator;
