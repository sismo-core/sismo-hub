import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    // This group is constituted by all the users who have a poap
    // of the following highly curated events:

    const poapProviderXdai = new dataProviders.PoapSubgraphProvider(
      "https://api.thegraph.com/subgraphs/name/poap-xyz/poap-xdai"
    );

    const poapProviderMainnet = new dataProviders.PoapSubgraphProvider(
      "https://api.thegraph.com/subgraphs/name/poap-xyz/poap"
    );

    const eventIds = [
      63400 /* Met Patricio September 2022 */,
      57318 /* Met Patricio August 2022 */, 53153 /* Met Patricio July 2022 */,
      47144 /* Met Patricio June 2022 */, 42068 /* Met Patricio May 2022 */,
      36528 /* Met Patricio April 2022 */, 30875 /* Met Patricio March 2022 */,
      25149 /* Met Patricio February 2022 */,
      15916 /* Met Patricio December 2021 */,
      36029 /* DevConnect Co-Work space */, 69 /* Devcon 5 */,
      65440 /* ETHBerlin 3 */, 63682 /* POAP Sponsor boot @DappCon22 */,
      53834 /* ETHCC[5] - Attendee */, 3695 /* ETHCC 4 */,
      53425 /* ETHNEwYork Staked Hacker */, 43 /* DappCon 2019 */,
    ];

    const proofOfAttendanceMainEventsHoldersXdai =
      await poapProviderXdai.queryEventsTokenOwners({
        eventIds,
      });

    const proofOfAttendanceMainEventsHoldersMainnet =
      await poapProviderMainnet.queryEventsTokenOwners({
        eventIds,
      });

    let proofOfAttendanceMainEventsHolders = dataOperators.Union([
      proofOfAttendanceMainEventsHoldersMainnet,
      proofOfAttendanceMainEventsHoldersXdai,
    ]);

    // we provide to each holder the same score
    proofOfAttendanceMainEventsHolders = dataOperators.Map(
      proofOfAttendanceMainEventsHolders,
      1
    );

    return [
      {
        name: "proof-of-attendance-main-events",
        timestamp: context.timestamp,
        data: proofOfAttendanceMainEventsHolders,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.POAP, Tags.User],
      },
    ];
  },
};

export default generator;
