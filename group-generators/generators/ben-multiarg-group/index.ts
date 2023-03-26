import { dataOperators } from "@group-generators/helpers/data-operators";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const attestationStationProvider =
      new dataProviders.AttestationStationProvider();

    const attestationStationProviderData0 =
      await attestationStationProvider.getAttestations({
        creator: "0xd34a8775d06d41b36054d59ef2d09a79b7aa1fa2",
        key: "numFollowersTwitter",
        value: "1",
      });

    const jsonListData1 = {
      "ben.eth": "1",
    };

    const dataUnion = dataOperators.Union([
      attestationStationProviderData0,
      jsonListData1,
    ]);

    return [
      {
        name: "ben-multiarg-group",
        timestamp: context.timestamp,
        description: "Test",
        specs: "test",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
