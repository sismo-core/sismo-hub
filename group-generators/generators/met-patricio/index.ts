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
    const eventIds = [
      140955 /* Met Patricio July 2023 */,
      128160 /* Met Patricio June 2023 */,
      124806 /* Met Patricio May 2023 */,
      111991 /* Met Patricio April 2023 */,
      107011 /* Met Patricio March 2023 */,
      99467 /* Met Patricio February 2023 */,
      95087 /* Met Patricio January 2023 */,
      85155 /* Met Patricio December 2022 */,
      80122 /* Met Patricio November 2022 */,
      70986 /* Met Patricio October 2022 */,
      63400 /* Met Patricio September 2022 */,
      57318 /* Met Patricio August 2022 */, 
      53153 /* Met Patricio July 2022 */,
      47144 /* Met Patricio June 2022 */, 
      42068 /* Met Patricio May 2022 */,
      36528 /* Met Patricio April 2022 */, 
      30875 /* Met Patricio March 2022 */,
      25149 /* Met Patricio February 2022 */,
      15916 /* Met Patricio December 2021 */,
    ];

    const aggregatedPoapProvider = new dataProviders.PoapSubgraphProvider(
    );

    const proofOfAttendanceMainEventsHolders =  await aggregatedPoapProvider.queryEventsTokenOwners({eventIds})

    return [
      {
        name: "met-patricio",
        timestamp: context.timestamp,
        description: "Data group of people who met Patricio",
        specs: "Created by the Token Provider. Contains of all addresses that hold the following POAPs: 128160: June 2023,124806: May 2023, 111991: April 2023, 107011: March 2023, 99467: February 2023, 95087: January 2023, 85155: December 2022, 80122: November 2022, 70986: October 2022, 63400: September 2022, 57318: August 2022, 53153: July 2022, 47144: June 2022, 42068: May 2022, 36528: April 2022,  30875: March 2022, 25149: February 2022, 15916: December 2021",
        data: proofOfAttendanceMainEventsHolders,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.POAP, Tags.Maintained],
      },
    ];
  },
};

export default generator;
