import { ValueType, Tags } from "../../../src/list";
import {
  GeneratorContext,
  ListGenerator,
  GenerationFrequency,
} from "../../../src/list-generator";
import { List } from "../../../src/list/list";

export default new ListGenerator({
  id: 4,
  name: "sismo-domains",
  generate: async (context: GeneratorContext): Promise<List> => {
    // This list is constituted by all the users who have a sismo.eth domain

    // construct your list
    return new List({
      generationDate: new Date(context.timestamp),
      data: { "0x1": 1 }, // TODO replace when provider ready
      valueType: ValueType.Score,
      tags: [Tags.Mainnet, Tags.ENS, Tags.User],
    });
  },
  generationFrequency: GenerationFrequency.Once,
});
