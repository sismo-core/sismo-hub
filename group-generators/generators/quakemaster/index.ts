
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
      "0x6febc32b23f5a9f110b2d9e6f4a7d1e6125ee206": "1",
      "0xa4adb3365e0c8b240c982b7f79c184f472e06c9f": "1",
      "0x3465570083a435ba8ffa4a2d4ff90783b420c232": "1",
      "0x532744d3ee047210bde929fac52751739784ab42": "1",
      "0x2da68dd46ff1fac8bd81fae86f1f9a4639c81917": "1",
      "0x49d1978dce1a788a0e33ac59c004e5fee4093e95": "1",
      "0xe56b8925a911599f84b38bd10eb9cc2a0421e0fa": "1",
      "0x65aa70fc515578410598f3812a18e02c88ba6aa7": "1",
      "0xba507c0f357b806ec57c311998c7ebc5dea3d5e7": "1",
      "0x89e408bcbfe98708df3a76efe79692385cc62b18": "1",
      "0xe64f23df6176fb4c72478aeacbc6520b0cf335b2": "1",
      "0xc22fa161047135dd0a0bad933e85c20020b69023": "1",
      "0x4c0898580774ce157217c7308cd8de0afd4b9584": "1",
      "0xa61c114e38ceac5bde6325956f4e808582690329": "1",
      "0xaac75aee1d3dac4e6a5435c589f36fe4f042fd1d": "1",
      "0x10f5cd5559583d3850fa0401552011731ed64bd3": "1",
      "0x374acc8f1b7e115b34cecb7edf84ec468e79e994": "1",
      "0x4f0d41bdcbc009cbca3b79ff697bbdd5e3c7b91c": "1",
      "0xc1041aa65deee9d2a70bd255d18783f55507eecc": "1",
      "0x12ed17d0061c89362a1fd0ba9aa960d68b97bd79": "1",
      "0xb07de04404abccdadb5c12a4ee00cb3b48a786c2": "1",
      "0x50cb26a76c60a20e29e560ecd35a2c4cea59fb65": "1",
      "0x227812f11313682cee661f7bd1951c5321c712d6": "1",
      "0x6df4c597045649b8407c60e2563778b1d2114e00": "1",
      "0xd51be729978e0bcf6dcb1a8fd7d3d83323534d80": "1",
      "0x058c964742d5cb6e87b1a4dd8b4e66f9c2990b81": "1",
      "0xff6f8df2ee37b5a3835ace99f3fe04f5dc40638e": "1",
      "0xf0b1626f9eb72d94b02d8e33d6c8260e94526fcd": "1",
      "0xceb3c03083cf80cde017c52ebae8dcbeb508084e": "1",
    };

    return [
      {
        name: "quakemaster",
        timestamp: context.timestamp,
        description: "The badge is awarded to members who have subscribed to our guild. https://guild.xyz/alpha-research",
        specs: "",
        data: jsonListData0,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
