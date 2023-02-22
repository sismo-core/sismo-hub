import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    return [
      {
        name: "optimism-governance-committee-member",
        timestamp: context.timestamp,
        description: "Committee member completed KYC with Optimism Foundation",
        specs: "",
        data: {
          "0x75536CF4f01c2bFa528F5c74DdC1232Db3aF3Ee5": "1",
          "0xa6e8772af29b29b9202a073f8e36f447689beef6": "1",
          "0x62a43123fe71f9764f26554b3f5017627996816a": "1",
          "0x1d1a13b16667c284b87de62caeeff0ce89e342b2": "1",
          "0x5e349eca2dc61aBCd9dD99Ce94d04136151a09Ee": "1",
          "0x1de2a056508e0d0dd88a88f1f5cdf9cfa510795c": "1",
          "0x94db037207f6fb697dbd33524aadffd108819dc8": "1",
          "0x7899d9b1181cbb427b0b1be0684c096c260f7474": "1",
          "0xdcf7be2ff93e1a7671724598b1526f3a33b1ec25": "1",
          "0xa56dfbe8010a8830a9fe5b56e8eff7236e277120": "1",
          "0x6eda5acaff7f5964e1ecc3fd61c62570c186ca0c": "1",
          "0xFC10A71B1E7974401D840fd15ceBf08Ed7E115Cc": "1",
          "0x0331969e189D63fBc31D771Bb04Ab44227D748D8": "1",
          "0xc4fc57dedd2463314a3fd2dbadb86b4404c257e5": "1",
          "0x2b888954421b424c5d3d9ce9bb67c9bd47537d12": "1",
          "0x48a63097e1ac123b1f5a8bbffafa4afa8192fab0": "1",
          "0x13838884271ec954CB036D0B29D404afab5EAe2A": "1",
          "0x1B686eE8E31c5959D9F5BBd8122a58682788eeaD": "1",
        },
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
