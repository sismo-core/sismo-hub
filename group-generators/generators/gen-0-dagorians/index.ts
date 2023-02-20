
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
      "0x489711Fd9edFDFa452Fd9f256447Fe8808c7a233": "1",
      "0x0667cDBdf5C103d10f246B5Ee4De01f95DF0B6BF": "1",
      "0x76D6317147c85Dbc39a4941152Be5793E5d9efD3": "1",
      "0x38DBB36943416582e328F8Af04f7468Af09ACF2E": "1",
      "0x28f9e0440274c0Ed6B69769c74FF8c532FC18F21": "1",
      "0x8Eb7Cf1880E7170042Cf4b7F5AE40c3e4d429163": "1",
      "0x26199b5dD7637D8dDd76fcfe31ec1EaDEe25e275": "1",
      "0xAcE58f7084cBC3d2e1C178ce4B038Bb84053352b": "1",
      "0xB479cEb3FA4eC82E4Ace4b54BbCfbb9B3f7d8665": "1",
      "0x5d47e5D242a8F66a6286b0a2353868875F5d6068": "1",
      "0xed9A912182745fE101ecb4291D00b802d982Ba0F": "1",
      "0x48a78A1a2D5E02302285cd3d41336D1e54E2F018": "1",
      "0x59992E3626D6d5471D676f2de5A6e6dcF0e06De7": "1",
      "0x5473580406D12E1cBD4c00B77e158FfF0CE9424e": "1",
      "0x18677585f024A5f93Cf17808313168603f6Dc8a4": "1",
      "0x8cce8eeF33e74EA5E52d8c3D2Af3376fb55dA34f": "1",
      "0x968a0e5603c5D4dbF24cbd7df562921d158aD19C": "1",
      "0xe2665c6b02ea68e0cf3ef1a74b88155ef10243a0": "1",
      "0x59992e3626d6d5471d676f2de5a6e6dcf0e06de7": "1",
      "0x201ca1bee52ae4ac7052e4f46c0660203c5b5974": "1",
      "0x01a719a37c75f63968c0e597318914fb3210608f": "1",
      "0x9c34b52a141ab459df631101f290c9f5b31a790d": "1",
      "0x203caf8b8264302e6328f6b2fdd14ed328e01ed0": "1",
      "0x5e4bee9ce3c96a51905bc0d2db5f802568df6703": "1",
      "0x72311e6e51d06b29fe27a6bb0c474af8178db2e4": "1",
      "0x0cdafe37a134c2204dbe628bd769a000b6459722": "1",
      "0x968406c26e1048d63b76b5897abae680da611c9c": "1",
      "0xaeb3746ca5ce3592c904b2777f2e7b577b64c655": "1",
      "0x6fe84ee8769ffba1eefa6e1f0f3e2cdf6bc09068": "1",
      "0xc08f1f50b7d926d0c60888220176c27ce55da926": "1",
      "0x489711fd9edfdfa452fd9f256447fe8808c7a233": "1",
      "0x136d54e730ad568cf49f8d7b8d36e1b079f37e1e": "1",
      "0xca11134ae391db92a9f999438ef5e3ff075bbe6d": "1",
      "0xa65eef5d0566ef2ed242d8719111e3116333278d": "1",
      "0x1bcfbbd79b4d70243880713a44194a14cdd1a8b9": "1",
      "0x76d6317147c85dbc39a4941152be5793e5d9efd3": "1",
      "0x73042028ac89f7a5cd19345257639613919cda22": "1",
      "0xaf17d2da0ccfc4382ba48554be601f28903d3eda": "1",
      "0x5473580406d12e1cbd4c00b77e158fff0ce9424e": "1",
      "0x6e71ea384655db9914afb7eee3e9f80b62a51587": "1",
      "0x73c7391894beb4be3344fddcff10607781ee924b": "1",
      "0x1d1a39d0c43a194987941e3645243d3aafcf6323": "1",
      "0xf88c86725328b868befab84a309b7d6e07c655d1": "1",
      "0x8841e5a990f242fdfd24413969f214b28ccc6161": "1",
      "0xa3d2170c75c5f26f6c9f47c2d653f1e10db605d5": "1",
      "0xb5c1213ee9ddf312c98f6e94caf5c421c86abff3": "1",
      "0xf8452f2993b9ea99364f24b11c5792fe35c614e3": "1",
      "0x363ac2b69ab48357fba86b2e7791eb41b0d5973e": "1",
      "0xba477c35dcbd1eefb8cfcfee2bd6097479a4e15d": "1",
      "0x0cdb58985a7149f9428e627e1b6a75b2f369de9f": "1",
      "0x28f9e0440274c0ed6b69769c74ff8c532fc18f21": "1",
      "0x968a0e5603c5d4dbf24cbd7df562921d158ad19c": "1",
      "0xe90dbae0242b4f970481eb2133960f5d32e5ca88": "1",
      "0x8896f2ac1f668d0cdaf6fa097ca36aecc663570d": "1",
    };

    return [
      {
        name: "gen-0-dagorians",
        timestamp: context.timestamp,
        description: "Join dAgora guild, hold a dAgora NFT or mirror entry; before Jan. 4th",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
