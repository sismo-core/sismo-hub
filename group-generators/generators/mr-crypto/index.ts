
import { dataOperators } from "@group-generators/helpers/data-operators";
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
      "0xaa61ebad70de31d58005429713104830d12a7d1b": "1",
      "0x871e26cffdd43c81c6907afabc4b2e9e83139936": "1",
      "0x370ee5a3019120296fab4476ecd33ef96ee57937": "1",
      "0x82d4b597fd226d7832f9e14b19897e1df5dc5c61": "1",
      "0x524e3f52d8b9d90bba7bf8bb99678070d2a59cba": "1",
      "0x44923166a7ee5127b254c610d335c8f0eee02ac8": "1",
      "0x0f46ddad431dd0b1c3063e75d45b5b8eb5b7161d": "1",
      "0x67f8eccf03b9cfe8afc713ba0e4a75c56434f093": "1",
      "0x92249e76237987f2ff679f32189ae90fea508ba1": "1",
      "0xd456628f744c041a6f382ccd7b5970a75654f3b6": "1",
      "0x96bbe83091c72a92d412ee42169c4f57f2061528": "1",
      "0x0257cd5778fc25839b88071843a43ba77b22dd85": "1",
      "0xf806f2516ecf8658636b7c8662ba418cc164cc5c": "1",
      "0x5974edb5e30f260e1b45bd816a75c6cfbc573d7c": "1",
      "0x262cb1b806919557ab8b9e00fac9af0376c3e30f": "1",
      "0x5af7fa8ec803420d729397027bcd19a088b98109": "1",
      "0x2b700833738ebd72f1286661ebbf0eb2ef0c4902": "1",
      "0x844435cd4f8efab891a7e10a1a03e6ee8c47a366": "1",
      "0x56bb38528f692f3415466781a093972d4be789e2": "1",
      "0xaca6d786578e129e7b31d210a4519fd22f735190": "1",
      "0x93c7485b340ce159ac411057e3091ce142471c3b": "1",
      "0x9a0cdb6e838e3402ab319cfc2336c56e255cee1a": "1",
      "0x7f88056df3ddd3a52d7055d25f1a8bd2b880a09a": "1",
      "0xe315e0737444aac52c6174f618386dbc4f50728d": "1",
      "0x821181c9bcf31f3ace061bcb07f274b936d7fff1": "1",
      "0xec144abc9ab70aa5461429575006d08000d6c096": "1",
      "0xec20ad674bcd6008848451b36f70068fffc95a27": "1",
      "0x7b82383eeb9af0c9edf365d044159feb92fc120b": "1",
      "0xcf55a980d4d52b8205c7d149785ad803fc15a2b0": "1",
      "0x3d0a30a158a92abc41609337c2f68f04926778ca": "1",
      "0x98612b38886ab8125df0866a0dedcabbe7e74b50": "1",
      "0xd7e0cdcce13bf2b1e226234de156f0270fa2a83f": "1",
      "0xcf1f14da4b74bbfdcf04bd2da7ab4f3f2590f105": "1",
      "0x755e29b936b74076b97a8ec29cf13e1357b0e402": "1",
      "0x9225d94a922ffeb82628cdd6177af4ec02f88a19": "1",
      "0xe6dbc1a6725b62f621e28fc403bc92d66848d478": "1",
      "0xf25c7f9df1e93a93ea5a47e6c6d86e5f8b90621c": "1",
      "0x3836d51191ee17bd2546ae6bbf524a6d58dbbe10": "1",
      "0x32196f3dcdc51150eb459c51d524199f346815e8": "1",
      "0x35900422ebfcead65fc29915cca47e3f72deebfd": "1",
      "0x9931f0108a281a0a4b78613156a039e6aefc59e4": "1",
      "0xaef165dcb31f76e8a7345f1eb7ace102037e0e9a": "1",
      "0x1ca04bf2cc0b7904f26b053c2a007801a0ad8244": "1",
      "0x6e1c37f2cd6339beab5fe7f929ba603880a57d51": "1",
      "0x309a0b7eac4c64c74709b054c9a94e2431d906e1": "1",
      "0xb0d458fb092516d7261619d51bc37a00f56a83b7": "1",
      "0xc04497de6d4b4c1906bb3fdca208cae861d27da0": "1",
      "0x0aeac6d1424ea6d0f87123a50ca5eec9f16108c5": "1",
      "0x9d50a4821c7df6113f872743bf99d07efdb67f79": "1",
    };
    
    const jsonListData1 = {
      "0xe80b0B0F7D6b2Fd6B2e169AB8E083eC82C28bf99": "1",
    };
    
    const dataUnion = dataOperators.Union([ 
      jsonListData0,
      jsonListData1 
    ]);

    return [
      {
        name: "mr-crypto",
        timestamp: context.timestamp,
        description: "Be part of top 50 Mr Crypto holders",
        specs: "",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
