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
        name: "maltsismo",
        timestamp: context.timestamp,
        description: "hold ens or follow @tomspcc2018",
        specs: "hold ens or follow @tomspcc2018",
        data: {
          "0x810d3AABbBf8CbCFf5C256f2B0621c4941f8B139": "1",
          "0x242F20589E3AA594d5014A58501f376861984f65": "1",
          "0x76024694Ed557264719683b0ceAb8Df1a572262e": "1",
          "0x6CAd957812F1bb9aB9364F20cfA15482BcE9DE77": "1",
          "0x101AfF216865f56E7653b2A0c6f714980606F072": "1",
          "0x2f1F1339481746683c47e8713949e6744e7Ef8Cc": "1",
          "0x9308cf07C7110176179e9A0FBB92C09C032963c8": "1",
          "0x09B4c85CAB2A58a60cFba940526133a138a15D30": "1",
          "0x1F5e9701091b54457B573F9b9720f87b3FBC97c4": "1",
          "0xA3eda61227fb6BFE8BCcA07268D9318F4554496b": "1",
          "0x3D8acF8Be3AB5c504Eb1C6eb8B43bb3b4d7B1081": "1",
          "0x1415f4F436eE87CD1e839F281ba248794d33e921": "1",
          "0xe8E97dDa69a20f6b70D85EfC509fd7eE5b55E5E5": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
