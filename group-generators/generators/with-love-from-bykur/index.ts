
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  dependsOn: ["ethereum-power-users",],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const ethereumPowerUsersGroupLatest = await groupStore.latest(
      "ethereum-power-users"
    );
    
    const ethereumPowerUsersData0 = dataOperators.Map(
      await ethereumPowerUsersGroupLatest.data(),
      1
    );
    
    const jsonListData1 = {
      "0x245c817bb7C5648cdadDC96CEe166173094391F6": "1",
      "0xc61c0c48c8458da0e8408ffe1773d3bdfc1d0a3e": "1",
      "0x39214532d6c7fd512ebdd8dfa9f12905c659c121": "1",
      "0xa959f394b31d317dfe47319489fcb2a3c235448e": "1",
      "0x5516fe91ffeaa9accccec561744655d98580cc1c": "1",
      "0x813d73bbd7a1752e22d1b8f3d40e2280422f43bd": "1",
      "0x067380dd9819b225c383bc9b0cdc6f952c88c8bc": "1",
      "0xa3ad516af35298e71dcc409a6450eae32779fb36": "1",
      "0x5766ee6ee37732499840ba0bc2b35edf6101e696": "1",
      "0x04a0476daedaffc743a8c2d29e5562064b744e7c": "1",
      "0x481622ac0c0f505d443f4caac1ff09c7dfdd9e84": "1",
      "0x4b907410860f89571ab1a7130259d3443fa077e1": "1",
      "0x6af58ced7d0e5162aae77aa05b7eb6cb026ef60b": "1",
      "0x723b6a0e6758d9a37f6261aab7e1d1d9875c719e": "1",
      "0xcee10cc0c025d962b31679e58f36aa1de2b6c752": "1",
      "0x85c952ec161e34a6ee773211e3a617ab8b4d2a95": "1",
      "0xc64e758af2c68666e9a27f2836018afcda592841": "1",
      "0x37d2445fdf9b83b58392dadc9cc29100c263b505": "1",
      "0x6afb0977f6b0d16f4b49f9e76e9738c8028bef02": "1",
      "0x4d581bf096bf6a848f40ae58a2495a46b73fb788": "1",
      "0xe93bad1ced0d19a91aa4de6d682ef3942e2ffc1f": "1",
      "0x4ffa9c06c45ee0a7cca0989cd32ebe74629c8eca": "1",
      "0x664e53e269194590a12a46eeee4e8682c04ddc7b": "1",
      "0x2b4a5470759d27d68fead5024fe6219475f0f43b": "1",
      "0x65d27d47a016bf6f9da4d46884dc085e08d44b45": "1",
      "0xfb078c81ea86ce334b4e760919b43856199cf164": "1",
      "0xf6c61ee2a7bad38cc06a8b601fa978e9498cd537": "1",
      "0xcd2c3248e3aba1948285a9e608e0ba2106bf1387": "1",
      "0x9d17bb55b57b31329cf01aa7017948e398b277bc": "1",
      "0xdb9d281c3d29baa9587f5dac99dd982156913913": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      ethereumPowerUsersData0,
      jsonListData1 
    ]);

    return [
      {
        name: "with-love-from-bykur",
        timestamp: context.timestamp,
        description: "be a friend, or subscribed to Debank bykur.eth before 01/06/2023, or have an Ethereum Power User ZK badge",
        specs: "ZK badge owned by friends of the creator, or subscribed to Debank bykur.eth before 01/06/2023, or have an Ethereum Power User ZK badge",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
