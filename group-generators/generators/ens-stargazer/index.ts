import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    return [
      {
        name: "ens-stargazer",
        timestamp: context.timestamp,
        data: {
          "github:kakktuss:36704171": ":36704171",
          "github:leosayous21:11630545": ":11630545",
          "github:lsankar4033:451947": ":451947",
          "github:gabin54:59560717": ":59560717",
          "github:kobigurk:3520024": ":3520024",
          "github:longcpp:5866465": ":5866465",
          "github:dorgjelli:5522128": ":5522128",
          "github:nezz0746:36443340": ":36443340",
          "github:heypran:15847009": ":15847009",
          "github:luozhuzhang:70309026": ":70309026",
          "github:peyton-spencer:6766068": ":6766068",
          "github:maxgillett:1622077": ":1622077",
          "github:orland0x:37511817": ":37511817",
          "github:sing1ee:1057882": ":1057882",
          "github:domwoe:1970182": ":1970182",
          "github:gakonst:17802178": ":17802178",
          "github:transmissions11:26209401": ":26209401",
          "github:gaonuk:43006704": ":43006704",
          "github:pynchmeister:33232379": ":33232379",
          "github:tcheee:45823872": ":45823872",
          "github:blockbuilder97:91764636": ":91764636",
          "github:liamzebedee:584141": ":584141",
          "github:rajivpo:19913716": ":19913716",
          "github:shunkakinoki:39187513": ":39187513",
          "github:decentrilizedman:43113774": ":43113774",
          "github:rhacker:2028062": ":2028062",
          "github:theofield13:31965215": ":31965215",
          "github:chirag-bgh:76247491": ":76247491",
          "github:pcaversaccio:25297591": ":25297591",
          "github:ra-phael:10075759": ":10075759",
          "github:arden:11365": ":11365",
        },
        accountSources: [AccountSource.GITHUB],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
