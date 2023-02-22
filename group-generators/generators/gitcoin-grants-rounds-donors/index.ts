import { BigNumberish } from "ethers";
import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import BigQueryProvider, {
  SupportedNetwork,
} from "@group-generators/helpers/data-providers/big-query/big-query";
import {
  ValueType,
  Tags,
  FetchedData,
  GroupWithData,
  GroupStore,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["gitcoin-grants-rounds-api-donors"],

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    const bigQueryProviderEthereum = new BigQueryProvider({
      network: SupportedNetwork.MAINNET,
    });
    const bigQueryProviderPolygon = new BigQueryProvider({
      network: SupportedNetwork.POLYGON,
    });

    const restProvider = new dataProviders.RestProvider();

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

    const roundPeriodTimestamp = [
      // Gitcoin round 6 dates : Jun 16th 2020 UTC - Jul 3rd 2020 UTC
      ["2020-06-16 00:00:00", "2020-07-03 23:59:59"],
      // Gitcoin round 7 dates : Sept 14th 2020 UTC - Oct 2nd 2020 UTC
      ["2020-09-14 00:00:00", "2020-10-02 23:59:59"],
      // Gitcoin round 8 dates : Dec 2nd 2020 UTC - Dec 18th 2020 UTC
      ["2020-12-02 00:00:00", "2020-12-18 23:59:59"],
      // Gitcoin round 9 dates : March 10th 2021 UTC - March 26th 2021 UTC
      ["2021-03-10 00:00:00", "2021-03-26 23:59:59"],
      // Gitcoin round 10 dates : Jun 16th 2021 UTC - Jul 2nd 2021 UTC
      ["2021-06-16 00:00:00", "2021-07-02 23:59:59"],
      // Gitcoin round 11 dates : Sept 8th 2021 UTC - Sept 24th 2021 UTC
      ["2021-09-08 00:00:00", "2021-09-24 23:59:59"],
      // Gitcoin round 12 dates : Dec 1st 2021 UTC - Dec 17th 2021 UTC
      ["2021-12-01 00:00:00", "2021-12-17 23:59:59"],
      // Gitcoin round 13 dates : March 9th 2022 UTC - March 25th 2022 UTC
      ["2022-03-09 00:00:00", "2022-03-25 23:59:59"],
      // Gitcoin round 14 dates : Jun 8th 2022 UTC - Jun 24th 2022 UTC
      ["2022-06-08 00:00:00", "2022-06-24 23:59:59"],
      // Gitcoin round 15 dates : September 7 (9AM) MDT - September 22 (6PM) MDT
      ["2022-09-07 17:00:00", "2022-09-23 02:00:00"],
    ];

    const groups: GroupWithData[] = [];
    const roundNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    for (const number of roundNumber) {
      const dataEthereum: FetchedData = {};
      const dataPolygon: FetchedData = {};
      let dataZkSync: FetchedData = {};

      // query bulkCheckout contract on ZkSync only for round 15
      if (number === 15) {
        const fectchZkSyncTx = async (data: FetchedData, i = 0) => {
          let txDate = 0;
          const fetchResult = await restProvider.fetchData({
            url: `https://api.zksync.io/api/v0.1/account/${
              contractAddresses.zksync
            }/history/${i * 100}/100`,
            method: "get",
          });

          Object.entries(fetchResult).forEach((tx) => {
            txDate = new Date(tx[1].created_at).getTime();
            if (
              txDate >
                new Date(roundPeriodTimestamp[number - 6][0]).getTime() &&
              txDate < new Date(roundPeriodTimestamp[number - 6][1]).getTime()
            ) {
              data[tx[1].tx.from] = 1;
            }
          });

          return { data, txDate, i };
        };

        let res = await fectchZkSyncTx(dataZkSync);

        while (
          res.txDate > new Date(roundPeriodTimestamp[number - 6][0]).getTime()
        ) {
          res = await fectchZkSyncTx(res.data, res.i + 1); // fetch while the timestamp of the tx is greather than the Grant start
        }

        dataZkSync = res.data;
      }

      // query bulkCheckout contracts on Ethereum and Polygon for rounds 6 to 15
      if (number > 5) {
        const getGitcoinRoundDonorsEthereum =
          await bigQueryProviderEthereum.getEvents<DonateEventType>({
            contractAddress: contractAddresses.ethereum,
            eventABI: donateEventABI,
            options: {
              timestampPeriodUtc: roundPeriodTimestamp[number - 6],
            },
          });

        const getGitcoinRoundDonorsPolygon =
          await bigQueryProviderPolygon.getEvents<DonateEventType>({
            contractAddress: contractAddresses.polygon,
            eventABI: donateEventABI,
            options: {
              timestampPeriodUtc: roundPeriodTimestamp[number - 6],
            },
          });

        for (const event of getGitcoinRoundDonorsEthereum) {
          dataEthereum[event.donor] = 1;
        }

        for (const event of getGitcoinRoundDonorsPolygon) {
          dataPolygon[event.donor] = 1;
        }
      }

      // retrieve data from gitcoin api groups to add individual donators in our group
      const dataApi = await groupStore.latest(
        `gitcoin-grants-round-${number}-api-donors`
      );

      const data = dataOperators.Union([
        dataEthereum,
        dataPolygon,
        dataZkSync,
        await dataApi.data(),
      ]);

      groups.push({
        name: `gitcoin-grants-round-${number}-donors`,
        timestamp: context.timestamp,
        description: "You must have donated in the 15th round of Gitcoin Grants",
        specs: "Donated to the Gitcoin Grant Round 15 through bulkCheckout Contracts on Ethereum (0x7d655c57f71464B6f83811C55D84009Cd9f5221C), or on Polygon (0xb99080b9407436eBb2b8Fe56D45fFA47E9bb8877), or on ZKSync (0xde21f729137c5af1b01d73af1dc21effa2b8a0d6), or appear on the Gitcoin Grants Round 15 API",
        data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.GitcoinGrant],
      });
    }

    return groups;
  },
};

export default generator;
