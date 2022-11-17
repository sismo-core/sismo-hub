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
    return [
      {
        name: "dorg-members",
        timestamp: context.timestamp,
        data: {
          "0xf19e4D04fc26837dc5F2b3c606e281c865B87A51": "1",
          "0xa13Ee4362f171B5c62be230E5EB2fEe8C375b875": "1",
          "0xa9F8F9C0bf3188cEDdb9684ae28655187552bAE9": "1",
          "0x75D3a3e96314b656e5a06E82626f03a4B4D0EE77": "1",
          "0x978eB534b26CB8749D352a2C94EC21e659e4248d": "1",
          "0x44Ec8794D1bB7624c223203E64eaE927d2d46437": "1",
          "llc.manboy.eth": "1",
          "0xc8239197D58e719369dEF640eC34823bA6bacF53": "1",
          "0x03fAdCE719cA1cFE4F114E18c862Be25e40fbF3c": "1",
          "bhanu.eth": "1",
          "febres.eth": "1",
          "0x61FfE691821291D02E9Ba5D33098ADcee71a3a17": "1",
          "0x40a57a5d9b618b9A49307B530736B4f51E008741": "1",
          "0xaF42cE968cA530EC3f3e33838A9340a5EEdA8dBf": "1",
          "0x5E642f8C81DE40E7e49b6a2B606dFB94A005bC44": "1",
          "0xd9f6C8E49cD7B1a739d617FDB85fB1ADf1349991": "1",
          "fabiola.eth": "1",
          "0xd677facd47346Fd4477E515Ab09a342e1Ea8d9C9": "1",
          "0xD2A2C52e13E971B6cCaf225e012fBFf2aAC59cca": "1",
          "0x6b82276F12251F278707B64d1bD0426601F2ab2B": "1",
          "jessebmiller.eth": "1",
          "0x03a1D5511765FDdb973077E17b86dd9Bb78E109D": "1",
          "0xB1B7586656116D546033e3bAFF69BFcD6592225E": "1",
          "0x325FB0D23B9526e90477C74e18F47670CC996606": "1",
          "0x315bd14b67b0cd18dE87F1FBce533723c42b0DAE": "1",
          "0xe5a45516Df5D11e54E96557Fc128E8401d2b54cB": "1",
          "0xe08Ed12241EE7a9Fcaf04ef00a3A33E33478a707": "1",
          "0x7c418d7083f6c22b3d600b8fe4f0cf93564098dd": "1",
          "0x090588E2a33f776f279aE6bf6034884AbaaEcaCe": "1",
          "0xC3C54Ee8B495A5004602AFf40c5880fb8E375aaD": "1",
          "0xAbb9aC1F97FB9b40a538B41f7F5e3681d4495bE5": "1",
          "0x0EBcf026946A4de6155961d66D53b0100c6271a1": "1",
          "0x15960E78D5546DAca964045A3b39Cd9406906C53": "1",
          "0xBd13eA41066ed16d075B86B3082b3369814a1012": "1",
          "0xe96056A9936C58e89D1703cF6bD97F134341EE44": "1",
          "0xe0a57347AA9adCAD7c7c4190C32062Db5B84fc5F": "1",
          "0x0fF5DD837070C1bB1199F5c8A9d60148e2B05F26": "1",
          "0x74Fc1287d73869F795b1179576c7B1A99203eaf7": "1",
          "0xC5d5851A81aFC92D49266f73824c2701730b8A6d": "1",
          "0xBC514De784B49dC43282F8340EbC3aa7B86Da12A": "1",
          "c0rv0s.eth": "1",
          "0x2E7F4dD3acD226DdAe10246a45337F815CF6B3ff": "1",
          "nirajkamdar.eth": "1",
          "orishim.eth": "1",
          "0x622c9C19D0AC1494C8E2f9a0974bb9B10746454d": "1",
          "0xd9d41335FeE80edE3BA22f33100740C2858F761a": "1",
          "0xAa01DeC5307CF17F20881A3286dcaA062578cea7": "1",
          "lanski.eth": "1",
          "robols.eth": "1",
          "0x37341cbb14c5F128A70B149726ad8B2CE6F4C793": "1",
          "0x04181A9FeeC83a9692f2126333660e7A0CF13A73": "1",
          "0xBC0626c2cdB1EB99F5982b2bb726093b0c213aFE": "1",
          "0x9A4B0dA9E8e5c7135cd7188Bd2e84DAc513C594b": "1",
          "0x867a211DdFc04803A857844A012DEcA7EC54DB8e": "1",
        },
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
