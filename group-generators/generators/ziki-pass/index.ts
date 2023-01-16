import { Tags, ValueType, GroupWithData } from "topics/group";
import { GenerationContext, GenerationFrequency, GroupGenerator } from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    return [
      {
        name: "ziki-pass",
        timestamp: context.timestamp,
        data: {
          "github:yum0e": 1,
          "github:Baoufa": 1,
          "github:CharlsCharls": 1,
          "github:dhadrien": 1,
          "github:gabin54": 1,
          "github:GrandSchtroumpf": 1,
          "github:jragosa": 1,
          "github:leosayous21": 1,
          "github:MartinGbz": 1,
          "github:nicolas-geniteau": 1,
          "twitter:f9s216": 1,
          "0x3EE60707a690031e3C553F8B8d1d41d14b63d60D": 1,
          "0x922ED4d2Aa01C177953A68C2fB598AD93577F95A": 1,
          "0x5916565390185ab087002728d4A0d2bAff2fe865": 1,
          "0x24680109281D1706EebBa53c343F9B3394762AE4": 1,
          "0xA35A549c672FC010c5eE467c3182D22719805A17": 1,
          "0xf4eDcEA4dD5F0A9f0B9cf3107dc2Ee0CF9680206": 1,
          "0x42DF30E962618d3cBd68E975d05af050ACd6BaA8": 1,
          "0xB69b2DBcC5a00BE460BFbC6d5b115aC9ebf7fFBF": 1,
          "0xec8cA41B46A080672E97371310D2800069472B7C": 1,
          "0x713e0Bf8B0239B3D630a1191aA1dacF7363F8852": 1,
          "0x1bB818B10f6DE6D4639d5ac7621802b0e5e7af98": 1,
          "0xB0d7F7074728D8f556d52D102bC8B732cceD8Aec": 1,
          "0xBaaDFfD24eFb95f580635890c2BA40d92beB2175": 1,
          "0x8C6176294E9f77B05b006dBA1aF8B4F093E7dB47": 1,
          "0x89028a562A64d25C461D7962FbF4B733908e40CC": 1,
          "0x9e26908BeaD904d1B9fDA48E1B4f9C44A5f747F9": 1,
          "0xCee3475223BE7a2DFcC4fa9455e090cf05b68b8b": 1,
          "0x73Bd44bad6759148D3C144b09279c0Bb540b9FB4": 1,
          "0xfc5aD13F61a7F5279080068A6C759E9ED2247f95": 1,
          "0x2B9B9846D7298e0272c61669A54f0e602abA6290": 1,
          "0xb8Da0A7722cBB0AB8a1F9c19ef403774F962CE74": 1,
          "0x82386002CcC9eE256A6093e81660D38581c9a3B7": 1,
          "0xD5DEe8d35f828019297ab45AF067E32cD11EaAD0": 1,
          "0xdc46552C6f754B5131A4240A64B7226E58EC4d0e": 1,
          "0x2967Aa78F9CC6193278afB9930907efeb1377ad1": 1,
          "0x10cAf5464bc7e51b75eA9dB902C9ebCE3195e9aD": 1,
          "0xBA7221CAf4509DB4869F65E2BFA134305CD31213": 1,
          "0xc38A6Ca53FED716bdF39eE0A7FECC3DD1cec1bEC": 1,
          "0xf3Ee111456dDF5326aabc3E38f19ACc02a00fe37": 1,
          "0x194D1D92386cCdB0D30C13ed199b134d5570c5C8": 1,
        },
        valueType: ValueType.Score,
        tags: [Tags.User],
      },
    ];
  },
};

export default generator;
