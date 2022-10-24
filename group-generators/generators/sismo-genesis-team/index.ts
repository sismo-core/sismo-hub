import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const sismoGenesisTeam = {
      "0x8ab1760889f26cbbf33a75fd2cf1696bfccdc9e6": 1, // dhadrien.sismo.eth
      "0xf61cabba1e6fc166a66bca0fcaa83762edb6d4bd": 1, // leosayous21.sismo.eth
      "0x97d0bc262dfc2fbe2e6c62883a669e765fe3d83e": 1, // gabinh.sismo.eth
      "0x74184bff3cf29e82e4d8cb3b7f1d5a89fdd0eb15": 1, // charlscharls.sismo.eth
      "0x32108e5f09f0df35aefc2ef4c520bbd06a57dae5": 1, // samsb.sismo.eth
      "0xE77F1CF03C50090CD45238BEB35470d4eabBDc74": 1, // bigq11.eth
      "0x4a9a2f31e2009045950df5aab36950609de93c78": 1, // jrag.eth
    };
    return [
      {
        name: "sismo-genesis-team",
        timestamp: context.timestamp,
        data: sismoGenesisTeam,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
