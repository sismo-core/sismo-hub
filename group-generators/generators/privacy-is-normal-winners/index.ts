
import { ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Once,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    const jsonListData0 = {
        "sismo-connect-app(appid=0x9dd13bc62ae6809fe9de95475111fc2a):0x0108f80d94b4af8cb464f09ef184b11c539127b5a1172765a76effbab52fd03c": "1",
        "sismo-connect-app(appid=0x9dd13bc62ae6809fe9de95475111fc2a):0x01c8911decfea1f287b1996b739cad142a9e93f3369a0fe1daf74dd65b8ad716": "1",
        "sismo-connect-app(appid=0x9dd13bc62ae6809fe9de95475111fc2a):0x024dcb9271eb5ed2b53af76edfee9b2e55c45f5006174f2a808013706f48de4f": "1",
        "sismo-connect-app(appid=0x9dd13bc62ae6809fe9de95475111fc2a):0x03b714f33fc108b23852864b25a1ed3399c4b9aa28cc0bca8790e0e099405e09": "1",
        "sismo-connect-app(appid=0x9dd13bc62ae6809fe9de95475111fc2a):0x048fdbb2419d06984d7e3ed161e8f94f9e2b1988509c4f32a7f6c59078795861": "1",
        "sismo-connect-app(appid=0x9dd13bc62ae6809fe9de95475111fc2a):0x04f96040b5a4d65e98cc25036ed2dc46bff8ee8f7671a43488ced0ace7eb3d7f": "1",
        "sismo-connect-app(appid=0x9dd13bc62ae6809fe9de95475111fc2a):0x061582f37af39c55b5ae86cf877c6dfdd2b444fa0ed87c485d9acca3beb9cf5f": "1",
        "sismo-connect-app(appid=0x9dd13bc62ae6809fe9de95475111fc2a):0x0a1fd32e22cd5e05917a728e9cb03f79bb04138170e0cb0fe3915afa19f9e599": "1",
        "sismo-connect-app(appid=0x9dd13bc62ae6809fe9de95475111fc2a):0x0a6fefba41f3aefe7264b0a7dec540f9d5f19cb300faadeaae89f8f3204c53ab": "1",
        "sismo-connect-app(appid=0x9dd13bc62ae6809fe9de95475111fc2a):0x0a7fd7a8ce6f13ba9066b8276128f1f0f5054de07937c11d5bffdc728d8c8719": "1",
    };

    return [
      {
        name: "privacy-is-normal-winners",
        timestamp: context.timestamp,
        description: "Data Group of winners from the 'Privacy Is Normal' Lottery.",
        specs: "Data Group of winning participants from the ‘Privacy Is Normal’ Lottery (deposited or withdrew 0.1 or 1 or 10 or 100 ETH on Tornado Cash on Ethereum mainnet to participate).",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [],
      },
    ];
  },
};

export default generator;
