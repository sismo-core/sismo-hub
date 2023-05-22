
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


    const jsonListData0 = {
      "0x17e12400f50592e060cfD2d80c9614a36375df61": "1",
      "0xA77aFBE129ae74869179df6cE9BA7b8d83Cbd4F1": "1",
      "0xC341FF65Dc5C7eA56b92c5552DBd8F6C9904D3Fd": "1",
      "0xaaCE09798b8ECaa9E39Ff18A2A4282b39573AA6E": "1",
      "0xd7596f6e3ecbD3f3F1D8Da58cB6ac3Bc2E65023a": "1",
      "0x4F5c9a72905896bB157Be8fF8D3Fd62B21B882b4": "1",
      "centonze.eth": "1",

    };

    return [
      {
        name: "bertotest1",
        timestamp: context.timestamp,
        description: "test of sismoberto",
        specs: "test",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
