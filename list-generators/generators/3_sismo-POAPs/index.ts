import { Tags, ValueType } from "../../../src/list";
import {
  GenerationFrequency,
  GeneratorContext,
  ListGenerator,
} from "../../../src/list-generator";
import { List } from "../../../src/list/list";
import { dataProviders } from "../../helpers/providers";

export default new ListGenerator({
  id: 3,
  name: "sismo-POAPs",
  generate: async (context: GeneratorContext): Promise<List> => {
    // This list is constituted by all the users who have a sismo poap
    // of the following event:

    const poapProvider = new dataProviders.PoapSubgraphProvider();

    const zikiPoapOwners = await poapProvider.queryEventsTokenOwners({
      eventIds: [
        37527 /* Ziki Testers */, 39515 /* Ziki Artists */,
        39651 /* Ziki Community Managers  */, 39654 /* Ziki Data Analysts */,
        39655 /* Ziki copywriters */, 39657 /* Ziki cryptographers */,
        39660 /* Ziki Data creators */,
      ],
    });

    // construct your list
    return new List({
      generationDate: new Date(context.timestamp),
      data: zikiPoapOwners,
      valueType: ValueType.Score,
      tags: [Tags.POAP, Tags.User],
    });
  },
  generationFrequency: GenerationFrequency.Daily,
});
