
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
      "0xdBd71c0b92caA92e37b2bCC43019f38947A2B0e6": "1",
      "0xbA8285d91e63D9DdFC1704aa989589e0b3677aFf": "1",
      "0x3E78E7f55B27BCB9f34C5Ed562280e6d175E94e5": "1",
      "0x74d3352E3FD9220615f205D9BA26a026287D5521": "1",
      "0x4931568c1cAd44fcaED48c8f7C82FDaaCf0F8251": "1",
      "0x6adbf81A803Be5cC2f0DB2F1c812Df4d3b0fE5c4": "1",
      "0x854224988c32a58f977b4C56C053738Db98b7beD": "1",
      "0xaa338a0E59B017f9b0D1012E555035818aC7b03e": "1",
      "0xCB324757Cf99Ce31bE317d2b6379df2c6d6BaF94": "1",
      "0x7EB7b73B887045d44907516fD52F9d9595331581": "1",
      "0x85a766558fC782072F052e2234e68B9eb59CBc86": "1",
      "0xC1bc273D71C72fc333021DCFA7c8b67e596C4B58": "1",
      "0x4242C2c68AA9D91a7499537c3ba1eA2FF03309A0": "1",
      "0xaed596ca13eB1Ec22F910492cB7385F41Cde71c7": "1",
      "0xcCacFCc74714363B4A3279cf39C5BD391015fF4B": "1",
      "0x08E7BD39E3fAd334ddE3570335F2f5adBF26df8a": "1",
      "0x2Bf7FE7E4C7F435dED322494b73108b613B6529C": "1",
      "0x06e70f295B6337c213DDe82D13cc198027687A7B": "1",
      "0x04E24908D31416D0e68283e9E28cA241c4d33DFD": "1",
      "0x376F99661D4c9b7b6782511BCA83D9F5414669eb": "1",
      "0x8bF6cC735A48a13102F9ec2A10D26845c7Fcb960": "1",
      "0x3C78186eE3e5db06A1CE66C6e6a3BDe41fC7007b": "1",
    };

    return [
      {
        name: "blocktheory-hq",
        timestamp: context.timestamp,
        description: "All members part of Blocktheory",
        specs: "These are all the members of Blocktheory. Blocktheory are a Blockchain R&D Hub. ",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
