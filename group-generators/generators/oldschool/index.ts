
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
      "0xBF65AAB7883d3bF2d1810ba86cc123CC4d6dDd38": "1",
      "0x9e68E9BdF6A54d636743C616eb90fACccE4363D0": "1",
      "0x5bE4aa36716374AEE564D08011C6A8402a450a24": "1",
      "0xEEC9754e97BC6098448d797679c2CCA85A3D9C0d": "1",
      "0xEf3eb6CFEa8d4594B51975c637e2BD55CB50cF02": "1",
      "0x2317Cc3a366eA55Eeb5946423a082a3419B66E98": "1",
      "0x175223E9E804e81aB505dd7Cf954Af7184Bd6079": "1",
      "0xe4f0270A98C6AE4a307b0C5b3A226f64C01138Db": "1",
      "0x8FC557196F564a391c8E82969728949e973F37a0": "1",
      "0x299bCa257A4F155807eD34855a478cd979DBeC2f": "1",
      "0x92a600a87Af8421F54AB3B2064BA29381aA12b3C": "1",
      "0x9a66843650CB958e9aD75138C563613Ec8b1Cf1D": "1",
      "0x0c076F2f9c23eF609500ACFBdCBa1609638C8222": "1",
      "0xD4a7018520636867354bDE8FaE32D49cf3908b74": "1",
    };

    return [
      {
        name: "oldschool",
        timestamp: context.timestamp,
        description: "Oldschool rap parties",
        specs: "Be a real oldschool bro",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
