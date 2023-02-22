
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
      "0xeca0327db7aaa0c55879cac53cbc4c02a23ecad6": "1",
      "0x99663aa641b8b8f630c8f08da7bdd22cbbb5a265": "1",
      "0x6b08770fc5804862217ffccd03a468a83965914e": "1",
      "0x1ced0bc8142991b760d0fc229cac999ba200363c": "1",
      "0x0efa674b8b6f3b2fa60a201af780a2e91e4fc86b": "1",
      "0x7f678d97f4247759aab5630428343852731b0c4c": "1",
      "0xc9f0b378f594689b5416235a6f5582ebc94cfeb5": "1",
      "0x21a8700a79767bd89d736c502ecab7bf9e1b3a1c": "1",
      "0xf578dca5e536a707205e7995bccd5f564086c6c3": "1",
      "0xf74e3519c6557f4b01083ea9df48f2d48f09ebff": "1",
      "0x9785b0d3b6ae72579f6da9b2cd9b518ca1866f3d": "1",
      "0x1b6e7066febc2e88225b580ed65a0eb9813d37cc": "1",
      "0xa19fe4f4b2e0555c2d9f6e96c07ae3ba54339f3c": "1",
      "0xa8cbf4200595efcd94b7526d04deafe0f284af2d": "1",
      "0x275adebca17e2444b3b9deb423a8361f2f1ccd9c": "1",
      "0xacdd52537f4d84ce93875c3c9ddb0f4ad3a5bd44": "1",
      "0xf5356ffec958c36f3fe09ddd0d79eba32fd3cadf": "1",
      "0xf5a1068df90515adc25dd5e551c5aac37b6d565f": "1",
      "0x8bdaf257b03059b5769ee77a9b78f90ec3ef3730": "1",
      "0x1da7159798e28d884c48330f7de6f4066e63b382": "1",
      "0xbfa9751f8f5e52ed4bd5c655643302e1d1b68bb7": "1",
      "0xae605aad14010311d6f0b17adac6459c6e6a423e": "1",
      "0xb03e094e643a50e145e804b35787c28292e6afe4": "1",
      "0xe5cb05aee78d01fd7869e4a872a2fb01527dc904": "1",
      "0x976a2ac7855de22b3b29115b9ea521a6129c756c": "1",
      "0xb2574d3886603da3b69ae4b97533832d67d855e9": "1",
      "0x2c9cbecd29313747f8e44b0ddde8ddfcd7a7d71c": "1",
      "0x8841554c6798ade7f54660574c543edf9b2d330a": "1",
      "0xdf81a39b6acb41bdb4f6f492a8d2748045ccfd5d": "1",
      "0x3e6e239ee2920c4a35a4b3941c83a1477e5935b2": "1",
      "0x1bf5df45042d29d4e2336960693ffd61a7f0124e": "1",
      "0x5b8bdc67aa314ebe6e0d798191b7d13c5fe24a37": "1",
      "0x4802757ee8e8085d1e6507f983c5d3ebc270f5c7": "1",
    };

    return [
      {
        name: "crypto-square",
        timestamp: context.timestamp,
        description: "be part of the futur",
        specs: "hold that badge to show off ",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
