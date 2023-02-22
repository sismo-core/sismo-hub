import { ValueType, Tags, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// This group is constituted by all addresses in 50 most followed

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Weekly,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    return [
      {
        name: "lens-50-best-followed",
        timestamp: context.timestamp,
        description: "Be one of the 50 most followed profiles on Lens",
        specs: "",
        data: {
          "0x95f2aC36E3C4dfF7cD04952d5056fb07Cb358fef": 1,
          "0xe655ade2fcd9c71C0D8276Ac5E022E97a5d94Aa1": 1,
          "0x794d5287D24d98586876Abf6f106e6643823FaEB": 1,
          "0x47E9f0027d61C662d5F432F573f765Cf5b2c5387": 1,
          "0x72663D419B54Dc9bDc6027F9faad60599e89f5de": 1,
          "0xaBfcF52E29883bE2b8c2b21F87754eB1EeaD0005": 1,
          "0xb4B91B71a9De0A1192eB687b183806bE22Cc046C": 1,
          "0x040D9E8179e21b7Ca73ac2761cB9e53283ba86F1": 1,
          "0xa57122bA89A7d09F0B6C9b1FEF23a7Cca196CB6f": 1,
          "0x6C9A3fC4292A1B173fEF04de2B4E4eEc53FeAa9c": 1,
          "0x6daC38ff7b547Bc4CFc9976cBB394F37D3cf1088": 1,
          "0xAE46403aB833A3F168C9B86c6D78665eC3fe8D5c": 1,
          "0x504258783Da503c6B06A62d1a3336347bcEdbc6D": 1,
          "0xd5bD5789D138d89D4F310ee6f39ceFFaa4ae0294": 1,
          "0xc72474C606867f48f25b3e44Fba319fD46b0c5A3": 1,
          "0x5fF7A5989DCF09002E9EEAa27B63626E37e3c121": 1,
          "0xdA9C405A59dF2a432EF77843a487995B8EFEcc42": 1,
          "0xf9ca5Df205d33047827592225ff77DF51F17587C": 1,
          "0x788a05396E41e362f39DC533Dd11063e18441415": 1,
          "0xe682181EbfDFfB6C379249b0E91AF7b4359A8FcD": 1,
          "0xDB9403535AAa18016b2A7B984B732b14C1b54BF0": 1,
          "0x804F6B78cd6e7e282D06a708C6f06aaad982e3BD": 1,
          "0x08a9499143AA889d53b76ccb6EC9e70E2e51a17C": 1,
          "0xc7f0Cfc7981493e65668145E5e3F81C736f29204": 1,
          "0xD3596C81FcAb699192dc79C8e25f1362E3dFf89A": 1,
          "0x6D415086eD055Cc9899176740Ba6747a0416a91d": 1,
          "0x66cD30aEaA777279cE7e6c9b091a3Cd95A57d736": 1,
          "0x015132BD34DD7452D043C37c748AbcC3E225947a": 1,
          "0x8244F70A5E1A0f5E2babde78030D310F08da0a65": 1,
          "0x073CAD14BC026b5E7eB9123b9833352Eb12c56d1": 1,
          "0x8511Ba99b4D5db98e741D6386775Cd93B9a2759C": 1,
          "0xBD7D04b4690f6d6c2237e263Fc146D1cB961C217": 1,
          "0x0E14EDec8F80571f0Bb7449CCEbb83AFd94c07d2": 1,
          "0xeC38c8DeE6b55c7661Ab6dcf5A91E7B76e73e74B": 1,
          "0xF266c60Acc1136C422F1F1e6b41141B3a73B7583": 1,
          "0x8bC0962D2c3F6064967aeA10B34B0B5a86EAE728": 1,
          "0xBeDf3956e85d649525D359539Dbc6e8fD32C4f18": 1,
          "0xFe77AfdD8b7d815d1A346b1F191Ec67F5B0c43f8": 1,
          "0x81ef0b6aC3c713703Cf7664296dCEe6d8e4478d0": 1,
          "0xd3bfCf3338de2dd450DD768FDD648999dE4Ba9a8": 1,
          "0x540CA34e166a134Dd649385679F3FE4447E0Ae33": 1,
          "0x636d484f2c360929ddf834566399D92dbD673358": 1,
          "0x91E429A0261c8c6AecC46d564aC33B81FDA3Fe1a": 1,
          "0x36F922fd1AEF37579e79E826A2A206858378F433": 1,
          "0x8EEf990CbbcD446273140680b6Fc151935F57e2b": 1,
          "0x8673bBe7E62Ab01781CB74747bE0E6404931B560": 1,
          "0x72b47c1a2fDbc7256E40C19aa4299834ee21B1D2": 1,
          "0xBEF7199f73E053a1f6d12ff9a14e36e60b8BC210": 1,
          "0x57A9444c45810F22278d2A05A14C88c0fDb936B9": 1,
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
