
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
      "0x0318d38dcb790e4014935d708874833560bb0d40": "1",
      "0x048a8bb49ac39c7a31ffba9f9b6522396df26b2b": "1",
      "0x05054c258af0d56cab3c98b3923e93966fe797a3": "1",
      "0x051a55bdd44cabe39022e509e333b8fbc267c43e": "1",
      "0x0d800f334aa2733a3c49a307fc4147717e086bf6": "1",
      "0x0ef7a9948357c432f86b727b207e3a09f0248c9b": "1",
      "0x133b2f8476af944c434454695313082215d5c4b3": "1",
      "0x28cc2f65f596f1c08392a757b21f22d4ec25a015": "1",
      "0x34b73b1af42b5828109f982a99f33153f85b4ba8": "1",
      "0x37ac09e1640577e1d71e3787297a56b58f88f0f2": "1",
      "0x39c31a899662da8bba43862c82c8ba531dc61390": "1",
      "0x4500998b58ec4fa2bdd9c0b7cc6971702307c1bf": "1",
      "0x4b89d407e366d948709df4c5cfcf86f78933c693": "1",
      "0x4c2bad6ded85c73dec25930c4d88d72a93512eff": "1",
      "0x516c0757d2f413737a79c3792ca203d2ee3341d4": "1",
      "0x59a596ee3ff7aba1c1111018f990206acbc754a0": "1",
      "0x5c8a7b88dd1d867b8ae773b3cbc3effc5d21081b": "1",
      "0x60c2f34ff71cb8e6ac630d7b22c6b7a91db23ec7": "1",
      "0x68292357e9b0b35e08861ccdb53290bdb92999c5": "1",
      "0x68fb8d6fa04e9eb17d86fdedeb79f6b06fe2ffc9": "1",
      "0x6e89216b6d5c8fbed5cdb21b7838b801b9a9ca52": "1",
      "0x706f9ac0c9d08d725b899cc8c2582620745cf930": "1",
      "0x75ab80d94f9f7c0fe4e7973c8ff505882be80f97": "1",
      "0x7be32be6a987416ee5fee80c1ec181a622941c87": "1",
      "0x7db3d080de992b1e2d6dbb4517362c26979a2770": "1",
      "0x81ba93b26bce8ca5d649b6607df15e6d45462d8f": "1",
      "0x83cfde7a14fc0d8bbddfcaaf3993a90a35d1dbc8": "1",
      "0x87013cfd02a863d5ed3cad31223a81b59dbfdbcd": "1",
      "0x899b0a157f7dce8441e4e5bab7aa93ae519e1276": "1",
      "0x8d91a9c66c38ac9b87a6b134431b46bfe4b9ec70": "1",
      "0x8fc642d66492c830da43d95da7fe3f027f4f3246": "1",
      "0x95c70532c5e64f2cfdd92b47cb089a8d9b2b42d7": "1",
      "0x9debadcaae4820092c8ff7dc741c9ec7d9e95027": "1",
      "0x9f9ebce72c0715cdbad4d589986eb22f6782a1ce": "1",
      "0xa260cf1726a6a5e0b7079f708823fc8e884611cb": "1",
      "0xa4431d8ad55bc69c055cd452d58640764ac1185c": "1",
      "0xa8f4a971e71bba82514e669075326c7a923ea6b8": "1",
      "0xaaa94ec1d5c58493257fa6811503e5cd5aa02410": "1",
      "0xb25cd9449afed2fb8bd55657b7040ce15465e6fe": "1",
      "0xb2f6129b4b2fa2061bbf6d136bee016a66d821fb": "1",
      "0xc0a736fc46578a9d0cb5595f19035da934755cac": "1",
      "0xc17a3b91919eeec3e10d19c192c743863fe0f0b2": "1",
      "0xc6004dcc7694cda5bba0e0fceb33bad1683db2ee": "1",
      "0xc65aa07a7134b08a558cbc29aba93cebdfb02a33": "1",
      "0xca77cc332ca6201f76c3caf9083e64e0e8403802": "1",
      "0xcb895dfa8808d0c5a900ced39da485ddc0bf31e9": "1",
      "0xcc0d8f409b149b92c089b5a9177331338671501c": "1",
      "0xcd266b9e1709343c6ae8614d1fc12f71565bf37d": "1",
      "0xcd92b68b5513936870b12a9ad3f6b15254c2d6d5": "1",
      "0xdf1a80841b16747ea4a48f449a255a79f8e238de": "1",
      "0xe2d1a6fb9745c722b0ec9cb4a765c3876a2b30d4": "1",
      "0xe45d10c00575a68a97a81645916036305bab3fba": "1",
      "0xed2529fb1f1b4d1a241b3744d62b21e84f122cf0": "1",
      "0xeee7c8ab07c84bddff25b1eeaf79dd9242895c56": "1",
      "0xeeff517294d2aa759274703a1b1c5ac81f9a754b": "1",
      "0xfb688483bc14b0a4c1525b95f591b7a9e1190ca7": "1",
    };

    return [
      {
        name: "akaps-frens",
        timestamp: context.timestamp,
        description: "Be a Follower of AKAPS",
        specs: "To mint this ZK Badge, users must follow AKAPS.LENS",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
