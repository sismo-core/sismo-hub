// import { BigNumber } from "ethers";
import { gql } from "graphql-request";
// import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import {
  Tags,
  ValueType,
  GroupWithData,
  AccountSource,
  // FetchedData,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const subgraphHostedServiceProvider =
      new dataProviders.SubgraphHostedServiceProvider({
        url: "https://api.thegraph.com/subgraphs/name/asyaasha/nfts-owners",
      });

    const mainNftHoldersMainnet: {
      [users: string]: Array<{ [id: string]: string }>;
    } = await subgraphHostedServiceProvider.query<any>(
      gql`
        query nfts {
          nftOwners(first: 1000) {
            id
          }
        }
      `
    );

    // const testAddress1 = "0x9fF8ed7430664CbF33317b265FDE484542152390";
    // const testAddress2 = "0xF66c41aF3Fe98725d3Ad2E63a3363332439aA2D1";
    // const testAddress3 = "0x9d537Bb16680D2BB4c88386F6b9C39Ce802EC3d1";

    const fetchedData: { [address: string]: number } = {};

    for (const owner of mainNftHoldersMainnet.nftOwners.map((item) =>
      item.id.slice(0, 42)
    )) {
      fetchedData[owner] = 1;

      // fetchedData[owner] = (fetchedData[owner] ?? 0) + 1;
      // frontend was only issuing badges with value 1
      // value should be thought as "tier" from now on
      // and suit a particular usecase
    }

    // fetchedData[testAddress1] = 5;
    // fetchedData[testAddress2] = 1;
    // fetchedData[testAddress3] = 2;

    return [
      {
        name: "nft-collector",
        timestamp: context.timestamp,
        data: fetchedData,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
