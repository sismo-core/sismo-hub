
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
      "0x55a5705453ee82c742274154136fce8149597058": "1",
      "0xee3ca4dd4ceb3416915eddc6cdadb4a6060434d4": "1",
      "0x20147b1919d9a174636971182fb3b40c62e9ec33": "1",
      "0x92382f5c6ad39829a07537d18807462960025725": "1",
      "0x8a95d5f9ac0eebd5880199ea8fcd0fae845bbbf2": "1",
      "0xca4e29bdc334073f9f4c339ef33174eccf1b6a60": "1",
      "0x179a862703a4adfb29896552df9e307980d19285": "1",
      "0x4ce9de775d9c0739222f4e526eec81134af06b64": "1",
      "0xebb6d28638fe3e468d7969f94fb328d517c6ae76": "1",
      "0xe943ca883ef3294e0fc55a1a14591abead1b5927": "1",
      "0xa8f9f6005aab65649056c8c92cc034b6e993880d": "1",
      "0x219fc230dbe627dbeccf49b9584022fff678dd05": "1",
      "0xb76028b6150e19b8670a03b06de032dd83654ecd": "1",
      "0xd62696b9635156f1645420e32de82a70c2b95042": "1",
      "0x68d36dcbdd7bbf206e27134f28103abe7cf972df": "1",
      "0xeaf55242a90bb3289db8184772b0b98562053559": "1",
      "0x93c620d2af377c6c37e3e3c1d3e065eb04b08ae2": "1",
      "0x33cc45d8b0336bfa830fb512b54b02a049277403": "1",
      "0xf551abfb0bd83fb6506fb970e3d3cfb63e64d1f9": "1",
      "0xd0da14f46595850627bcdb19060bdfb0f4cc5e8f": "1",
      "0x768f1f49219cec623151b7b4b7a7acae6d489c7a": "1",
      "0x0fd5c2cf64fe2d02f309f616fa362355c91470e7": "1",
      "0xce4eb76664210426e900c20d4a3741a6b0f64855": "1",
      "0x8b80755c441d355405ca7571443bb9247b77ec16": "1",
      "0xe1dc110065463842152ccc9a089162ac9ccb50f6": "1",
      "0x1f1a2f7ced2db9e21f02c12b9b10dea81931ae4a": "1",
      "0x8907fae9148107978673922ff47aeee71414c349": "1",
      "0x7b994e111cd89c9391be815fa6fcd6ef2abfd053": "1",
      "0x182327170fc284caaa5b1bc3e3878233f529d741": "1",
      "0x1cb96c15327757d3f87ebcf6a2ba895e1437ab0c": "1",
      "0x4b288b23e3bdbbdc5632e5c31006c7f9a7355591": "1",
      "0x26047f5f688ff0e6a903c0c9e3d6400d6f13ad22": "1",
      "0xb063ae19c192556403893856cd5ff131719fd048": "1",
      "0xb0e469596e3e76de52d1208ca558d7e9d8f79b89": "1",
      "0xb09cfba9b97e129c87d331c70c67e0b738c46c5f": "1",
      "0xa5741729c4eefee1c299676786b6d52beca8c66f": "1",
      "0xb4d0e8be45395e72e9c1af25f59d854bc7dc5b48": "1",
      "0xed727248627fda303a1794f5da747215b6314330": "1",
      "0x48500ab6edd907a30efa706c9662e61e2cc71d30": "1",
      "0xd1eaefbeffd4106a1a166cd26a1fe23140d6a42e": "1",
      "0x5c3df95b6ef1ad1233bff760d88ca9673c975993": "1",
      "0x4f8c531df3d97c6cd437ac8dfe756975445d1161": "1",
      "0x05ff7cc8b490b38898744037f951f3247673c2ed": "1",
      "0x4c9e84df0060242f32aef4d792080a167dff7937": "1",
      "0x588dad9d6c93735c2ef6c7ec89ab1eb8762609dc": "1",
      "0x8b0573d1c80362db589eda39c2e30f5190d7eb51": "1",
      "0x3cc1a943b27c2af7c6dcf3be0137f66c2f22e712": "1",
      "0x2e7235c0fe98f11ea6c1ef4f7f8a9d97f0be6936": "1",
      "0x2f60d2bb84eb8df6951f7215ef035ef052ba2725": "1",
      "0xc4364f3a17bb60f3a56adbe738414eeeb523c6b2": "1",
      "0x444f7a5c62d75b0d7a8b3fb4b97950e149cdff33": "1",
      "0xfe819920199392cdd911acdaed84b38f30e27562": "1",
      "0x1c33258bffe442ae5bb293cb5a7841c39e62253f": "1",
      "0x684f49bc1e04339d84f2370f14dc1491a3b4f113": "1",
      "0x1216083be36842278fb3cf9c3f56b7792ecc359b": "1",
    };

    return [
      {
        name: "iknowsan",
        timestamp: context.timestamp,
        description: "Following me on Farcaster",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
