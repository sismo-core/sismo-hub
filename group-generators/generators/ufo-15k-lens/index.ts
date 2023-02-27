import { dataOperators } from "@group-generators/helpers/data-operators";
import { Tags, ValueType, GroupWithData, GroupStore } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

// Generated from factory.sismo.io

const generator: GroupGenerator = {
  
  generationFrequency: GenerationFrequency.Daily,
  dependsOn: ["zk-developer-contributor"],
  
  generate: async (context: GenerationContext, groupStore: GroupStore): Promise<GroupWithData[]> => {
  
    
    const zkDeveloperContributorGroupLatest = await groupStore.latest(
      "zk-developer-contributor"
    );
    
    const zkDeveloperContributorData0 = dataOperators.Map(
      await zkDeveloperContributorGroupLatest.data(),
      1
    );

const jsonListData1 = {
  
  "0x4e4b40b1a3f945d6ecc00f65adba063be82439f0": "1",
  "0xbafaf28d01aefec4cf16830d2187becd502c6e0f": "1",
  "0x371dcb77311d0a6e2d7a47afc9279295ab526103": "1",
  "0x81d53cd3e96fd8d51cef3de47e546d0b325af8bf": "1",
  "0x1d0239e4e185f5f3fba605897849744ae8b5f333": "1",
  "0xe3f97e97576b4edaf30008a2586f9fdd417a745f": "1",
  "0xeba58fcb37a8767d89ee0ee5036cde38f45d19e1": "1",
  "0xdf07b9f4394cbe97a8f1c89e910155c71fc1ece7": "1",
  "0xde8a5118597001837ea7368c0ab338f5384f4723": "1",
  "0x2abf0f5e7d5651d7c847c457a3599c16f8b25a86": "1",
  "0x53aa991b2a2a1b6ce7b54747b9bea230c61603bf": "1",
  "0x310c58a54a13a4975ba5d27530ea8a8ff6f2fca5": "1",
  "0x9ddae7a058d2d8940d83b90e2538f72cbfbde206": "1",
  "0x38e189c373a07ff37628b6184332da6d0577cfaa": "1",
  "0x3f92fe2771020dc4c35e2f16c1548ed975a543e4": "1",
  "0xf824793cf1ae271a22e3d20614e7f3041cce043f": "1",
  "0xd0d3c22129c9d53c6c5f0bda74c46e2c4ffbff5a": "1",
  "0xe245bd11996f6f5611b3f5442813a19855cf4b37": "1",
  "0xe2359f20c2bb28b4309bf5b41e4cd03c44671e02": "1",
  "0x79ce80e90bd630b0d98e99a66ac74a951391b7b1": "1",
  "0x5d6243fa2c89212a95828bdc90faf79e09553bee": "1",
  "0xc499db5ed451cb5281b324e8ca9ad466eb8dbb28": "1",
  "0x9980b494602e08daace4ffd7838926ab973cf8d1": "1",
  "0xb3aace2e7aad63583ad720472f881e85cd0e9a20": "1",
  "0x0000ce08fa224696a819877070bf378e8b131acf": "1",
  "0x1c4b7ad534c4cadb795f4beb64bf9eb99958ba63": "1",
  "0xb2eeb0087bed941bac2086752db3633f4de97b3b": "1",
  "0xf6244b82a8ff1ac80e880f94fbce44a4bf7e7b01": "1",
  "0x07d095ff9fcf13e086ab6d44309733e95daa28c3": "1",
  "0xbe01d437afbcd1a23e1160d773a8e4917898f4e3": "1",
  "0x5026bebd68ddeff80b56329617988d6aa06c40d0": "1",
  "0x9219e2778e0fac0e59010157386f9c930cb25ab6": "1",
  "0xca133aed74c5fe5bdd79f3b82f1c3e61618d9756": "1",
  "0xec054b2296189bb1437d6ae06d9db46c258a09c6": "1",
  "0xc2639bba1adbe42268d9afbaab344e0d55419038": "1",
  "0x5edf4c06ffbe9a4b4fdf6c1545e9a3a18f5160ba": "1",
  "0x2f010fe05b35b85f52e2a7f0d9478cd552960b1f": "1",
  "0x2a60de7de747f99495db4cdb3094a0b6c9069998": "1",
  "0xf6304e66f946aca8e34b6568d74203ff026e74d5": "1",
  "0x580146a0ca29680b83e0ff6340d3dd7c1d5b8d13": "1",
  "0xf09f1c8b54d5a09acbe6a607c85a81aed1bc5aee": "1",
  "0x68f66fac4b02419496a7c1d5ad5f093ae67e6e50": "1",
  "0x15360c4a979ddf1b888f2c6162211653fa98fb78": "1",
  "0x9eed555a7b54471a0808cec8d176980323674bc8": "1",
  "0x497336ea24aed7e66808be54eb5dfadb72769341": "1",
  "0xb4b38fbb72bcb2686202a9746c19521c24f0f35d": "1",
  "0xf33797902a452d02f06d6eef1adf7fce89630678": "1",
  "0x61d20712851c797a5aca1ea7cb2134cdebaa32ec": "1",
  "0xd434276ad656c193c5e8ef37f211c1ef9628ca44": "1",
  "0x175dd282356637a2e19c5e63f0c6fac0a3d70d50": "1",
  "0xebecc6f9340824fd34c563afe0c467b3f1bb054a": "1",
  "0xe99a6d034dbefedec203e1855439e12ce029a34a": "1",
  "0x91a0cacb38470b50e3117f114762f605c06a1c08": "1",
  "0x1cbc3d525753d86bffb0df61f48b9a73366addab": "1",
  "0x106f84da76bbabc5147c01630e7c47af8224f6df": "1",
  "0xc3b00cf5a879c1b02dbb48956f5857e9a249e317": "1",
  "0x881e45c2461ff3cdddeed76487ca61f714827738": "1",
  "0x05ecdac57567cfd675836d68abed110886d6a6eb": "1",
  "0xb548f3f553ee21169f56adb96195e6d3ce467f21": "1",
  "0xfc6953d844f0d9e177756096aa60af160488e07a": "1",
  "0x298f679bbccb589e0bfa3e4931e1208094011a8e": "1",
  "0x319e28897607a9d17d63dae63aca3cee45f5820a": "1",
  "0x2a613275bb355407bd90ea3e4e5ed0fcdb7107e8": "1",
  "0xac75f7fdf61f0bc91ff74175117e429178674090": "1",
  "0x27a69ffba1e939ddcfecc8c7e0f967b872bac65c": "1",
  "0x9d7bd1601aebe0083e38df6485be71afb05f9f8e": "1",
  "0xcdb232305c16c6876228ae6e23ee79b05eafae26": "1",
  "0x283ede7207fdcd6ff68b177aa13232e132b9faaf": "1",
  "0x05443a3c911854f82756721589cb55549499c770": "1",
  "0xdcd0cbc559c004248d542c98697a4355356c9971": "1",
  "0xc015967110635d982d1ffe21f91f2d50b28070a1": "1",
  "0x6248ad9091f0935610b58b58664755492bc3ead9": "1",
  "0xe3205ae46ba1fabb0dc2ce0d0d9c42dbaff3fd1b": "1",
  "0x7daef7c2ced6fe75b97f2edb7db302ef8b0e3230": "1",
  "0x070976b1c356ff67d03d4250d4c9f98cd13e0154": "1",
  "0x3c017ad71d301afca63ffae6396779fdac8092cb": "1",
  "0xc32c56439667e51303d1e682b89170452e73ce63": "1",
  "0x687d57a763c3928981601d58668de4e8cb3bde58": "1",
  "0x18740bf6abedb6ba75c00eef866acc269e437c7e": "1",
  "0xd9c8f840306bf50cc7b1cb45ab9cd043adf6af11": "1",
  "0x5ad9c2d12425db49f69d69b5dd601d939760dfb8": "1",
  "0x9ec02cf967d2790687eae3b400a7dd6a1558cb50": "1",
  "0x4e75e6a99d46e07b4871f3dbe63d313b7093f819": "1",
  "0xad55160a98e6011e281f55700966a32a22904d52": "1",
  "0xe2fbec87aaad3fb4fa8a4aebe63760cddefe6beb": "1",
  "0xf0422a73c0c9f6219fb02da06fbccadf01e2433b": "1",
  "0x452008779b6bd5b2bcdd113d1e3f10c5e27b5cf8": "1",
  "0x7d1b71a98d689ad670a2966837f83740cf5b4d60": "1",
  "0xb0deac064652083d2d39d331a9931218fac6c517": "1",
  "0x3a2b9ea02f3910b9e3f5cfe8722c00e55e2af7cc": "1",
  "0x0608ea05f2272bd4da79a8d8262ce9e3dfa5e3fa": "1",
  "0xbdb1f4e14f11dd6e74c050bf1678b46d7c1c3b72": "1",
  "0x0e0a285df1fd02bcdc2c8421bf72fc0591982f9f": "1",
  "0x99912c176b606aa3d3eb0056beb191db8cc4e977": "1",
  "0x0fb20260d3E8b9D3023Ca3A5d3423Da7C316e6a8": "1",
  "0x50Cb26A76c60A20e29e560ECD35A2C4cea59fb65": "1",
  "0xCd64B6d4FDB7129b0f4890DbA53b6aeeeAB06e92": "1",
  "0x353651A9e88ac04dC0AaFFBc24C7770e85AdF36d": "1",
  "0x4eD8E7Fea02cc7d3116a181ef76ff50671A7E07d": "1",
  "0xFf65189D2c8F748D721Ce310c6CFf775BFa374f7": "1",
    };

const dataUnion = dataOperators.Union([
      zkDeveloperContributorData0,
      jsonListData1,
    ]);

    return [
      {
        name: "ufo-15k-lens",
        timestamp: context.timestamp,
        description: "First 100 \"UFO 15K Lens\" NFT holders ",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};
export default generator;
