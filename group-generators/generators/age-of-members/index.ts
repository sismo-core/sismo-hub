
import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Weekly,
  
  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
  
    
    const jsonListData0 = {
      "0xdbd71c0b92caa92e37b2bcc43019f38947a2b0e6": "23",
      "0xba8285d91e63d9ddfc1704aa989589e0b3677aff": "45",
      "0x3e78e7f55b27bcb9f34c5ed562280e6d175e94e5": "23",
      "0x74d3352e3fd9220615f205d9ba26a026287d5521": "6",
      "0x4931568c1cad44fcaed48c8f7c82fdaacf0f8251": "34",
      "0x6adbf81a803be5cc2f0db2f1c812df4d3b0fe5c4": "34",
      "0x854224988c32a58f977b4c56c053738db98b7bed": "11",
      "0xaa338a0e59b017f9b0d1012e555035818ac7b03e": "19",
      "0xcb324757cf99ce31be317d2b6379df2c6d6baf94": "21",
      "0x7eb7b73b887045d44907516fd52f9d9595331581": "24",
      "0x85a766558fc782072f052e2234e68b9eb59cbc86": "26",
      "0xc1bc273d71c72fc333021dcfa7c8b67e596c4b58": "32",
      "0x4242c2c68aa9d91a7499537c3ba1ea2ff03309a0": "26",
      "0xaed596ca13eb1ec22f910492cb7385f41cde71c7": "22",
      "0xccacfcc74714363b4a3279cf39c5bd391015ff4b": "25",
      "0x08e7bd39e3fad334dde3570335f2f5adbf26df8a": "26",
      "0x2bf7fe7e4c7f435ded322494b73108b613b6529c": "24",
      "0x06e70f295b6337c213dde82d13cc198027687a7b": "35",
      "0x04e24908d31416d0e68283e9e28ca241c4d33dfd": "23",
      "0x376f99661d4c9b7b6782511bca83d9f5414669eb": "21",
      "0x8bf6cc735a48a13102f9ec2a10d26845c7fcb960": "29",
      "0x3c78186ee3e5db06a1ce66c6e6a3bde41fc7007b": "21",
    };
    
    const jsonListData1 = {
      "0xBd338676674f34ED2A8D0BCb20361F535ea89725": "25",
    };
    
    const dataUnion = dataOperators.Union([
      jsonListData0,
      jsonListData1 
    ]);

    return [
      {
        name: "age-of-members",
        timestamp: context.timestamp,
        description: "Age of the members of this account",
        specs: "These are issued based on the age ",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
