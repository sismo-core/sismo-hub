import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {

    // This group is constituted by all the users who have a poap
    // of the following highly curated events:
    const eventIds = [
      63400 /* Met Patricio September 2022 */,
      57318 /* Met Patricio August 2022 */, 
      53153 /* Met Patricio July 2022 */,
      47144 /* Met Patricio June 2022 */, 
      42068 /* Met Patricio May 2022 */,
      36528 /* Met Patricio April 2022 */, 
      30875 /* Met Patricio March 2022 */,
      25149 /* Met Patricio February 2022 */,
      15916 /* Met Patricio December 2021 */,
      36029 /* DevConnect Co-Work space */, 
      69 /* Devcon 5 */,
      65440 /* ETHBerlin 3 */, 
      63682 /* POAP Sponsor boot @DappCon22 */,
      53834 /* ETHCC[5] - Attendee */, 
      3695 /* ETHCC 4 */,
      53425 /* ETHNEwYork Staked Hacker */, 
      43 /* DappCon 2019 */,
      60695 /* Devcon VI in Bogotá */,
      82394 /* EthGlobal San Francisco POAP */
    ];

    const aggregatedPoapProvider = new dataProviders.PoapSubgraphProvider(
    );

    const proofOfAttendanceMainEventsHolders =  await aggregatedPoapProvider.queryEventsTokenOwners({eventIds})

    return [
      {
        name: "proof-of-attendance-main-events",
        timestamp: context.timestamp,
        description: "Hold one of the POAPs from a curated list of events",
        specs: "Attend EthCC4 (3695), or EthCC5 (53834), or Devcon VI (60695), or DevCon V (69), or DevConnect Co-work space (36029), or ETH New York Stacked Hacker (53425), or ETHBerlin 3 (65440), or Poap Sponsor boot @DappCon22 (63682) or met Patricio during events on December 2021 (15916) or on February 2022 (25149), or on March 2022 (30875), or on April 2022 (36528), or on May 2022 (42068), or on June 2022 (47144), or on July 2022 (53153), or on August 2022 (57318), or on September 2022 (63400)",
        data: proofOfAttendanceMainEventsHolders,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.POAP, Tags.User],
      },
    ];
  },
};

export default generator;
