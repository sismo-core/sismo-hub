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

  generate: async (
    context: GenerationContext,
    groupStore: GroupStore
  ): Promise<GroupWithData[]> => {
    const zkDeveloperContributorGroupLatest = await groupStore.latest(
      "zk-developer-contributor"
    );

    const zkDeveloperContributorData0 = dataOperators.Map(
      await zkDeveloperContributorGroupLatest.data(),
      1
    );

    const jsonListData1 = {
      "0xAe13152CDeD509CEd4e6452B464F0Fc49DAE0b8f": "1",
      "0x374AcC8f1b7e115B34CECb7eDF84eC468E79e994": "1",
      "0x5f509CE1252D25d14D3bCaFD7B3c7844b73392F2": "1",
      "0x9767D18e0F7596E14788Ce97c04288eAB692B13c": "1",
      "0x50a120029683AC4dc0e0dd36e4634A806fef8Ef3": "1",
      "0x940f5293be23c4d06F9F561F2Df79457D3782e1e": "1",
      "0x24695e871abef73E9C5eEeb674A681Ec40c074B8": "1",
      "0x92a030cDb61efa7F84174762A9584cdAF3f4D1Da": "1",
      "0x1Eb10f1442C23f970f57e727844f813D1ECB449E": "1",
      "0xea16d379883c83d4b2A5597431b15507145A124e": "1",
      "0x76BC0f1EafC820dd4c56B72D7adfB60dC2867Ea3": "1",
      "0x178ff8fCa7EE275F420C334338d2Fed9E6baeE4c": "1",
      "0xdF2aDF272e40fE277321B21AA58DDCcc3Bc648eE": "1",
      "0xCC09D6D8d704782E0B3b489038E80e4BaA08622E": "1",
      "0x7ebfb4537708D613d263578c0e34B559e8bc990b": "1",
      "0x61168d47ec95BfF7Bd2fF9Efa5Fe5C1e435841A9": "1",
      "0x89E408bCbfe98708df3A76eFE79692385cC62b18": "1",
      "0x38d24dc0a7d2e703bfce8b42ff736b8d9f2a15a9": "1",
      "0x9C53a8C73B0C7D52Af2f0FA6180a9349d11c748b": "1",
      "0x4b84C7ddC8c295FB3d2bfDe393B17D1c2e2Bd17d": "1",
      "0x30A6a0931195EC35aeEA531E74015a959CA73f9e": "1",
      "0xcF9225A613a03D405A1b8182FfCDEF9682fb59EC": "1",
      "0x79D6b65b48651D4D03cbe42Ca0B55C567593e67F": "1",
      "0x23b4c21e96BB213C1563F6f189131A570BA94718": "1",
      "0xc1377ebD880217969d662C23067Ca9F1674163f0": "1",
      "0xF11C19Ae9390392763Ed8E4c51BA4055e7C7C6f3": "1",
      "0x12Ed17d0061C89362A1fd0ba9aA960d68B97bD79": "1",
      "0x34b049931A5F75Aa77A1efc2A26c0B3cc03b85ab": "1",
      "0x79ce80e90bd630b0d98e99a66ac74a951391b7b1": "1",
      "0x1252cE90ad6a743ce9dddF41CB99d6319750d769": "1",
      "0xB5dF4f3AE95bEF6Ec11484f4CD8a6c5f939B2D55": "1",
      "0xc22Fa161047135dD0A0bAd933e85c20020B69023": "1",
      "0x4B192cA3BFdD9b27ef9D26b56d366842fBc813C4": "1",
      "0x45E1050507038A3773e3b4d4697330E58238BF86": "1",
      "0xFF6f8Df2Ee37B5a3835acE99F3Fe04f5dc40638E": "1",
      "0xB07de04404ABccdaDb5c12A4Ee00cB3b48A786C2": "1",
      "0x85332be5e648e37a6470e0e7cbf73df41852c7d6": "1",
      "0x0B72E905eD48beb207eC29bFac83b2b0Bc6f56f2": "1",
      "0x1028e9f9bC8Bce25eb476FC08c8BCF4Ea9222CDA": "1",
      "0xD512e0AeeA0228a35253ECE18e40192E434C61fd": "1",
      "0x49d1978DCe1a788A0e33Ac59C004e5fEe4093e95": "1",
      "0x9eB47A8C7D1fC465739597E6Ac46b2E86d736d76": "1",
      "0x09e3Ab1Ce8126bc411d7132cb4673409a60023cD": "1",
      "0x2Fea9De9fC21Fbd56D42Cf4dEA594E3E8F8287a6": "1",
      "0xC5b1ddB34cB01E3CA9Ae6dd7cD90DFf5606cb508": "1",
      "0x3FE0401E6758C5e0EC8c3EDa6bd85127E81124Ac": "1",
      "0x48a0096B26fe285138b294aFe0Eb1DD705071dcA": "1",
      "0xDf2eaf037782Dd5a32b01AAed579e3AA94eE8575": "1",
      "0x58113f3a846B4BC21330Bc49b71fFAF0dd029eda": "1",
      "0x7465a22BA37d72eD2995BE8D5e94AB1A39338F30": "1",
      "0xE398DE8393e15714BdD173Df9D8cf38546cdCBAD": "1",
      "0xB4f43c8c869928b09Af69F42e055934aF21a04CF": "1",
      "0xEE64a3e1088f9804c35346D3dE477c3133dFeBff": "1",
      "0x532744d3ee047210Bde929fac52751739784aB42": "1",
      "0xf85ceCcFe2112E88be58162C43f5Ec959672AB54": "1",
      "0x2Ba9B338a883621f3ebE882251a8Ff0A6612B9F6": "1",
      "0xa93d1fBeeE5E8ECE6be862Ab3bC65F643158b103": "1",
      "0x0fb20260d3E8b9D3023Ca3A5d3423Da7C316e6a8": "1",
      "0x50Cb26A76c60A20e29e560ECD35A2C4cea59fb65": "1",
      "0xCd64B6d4FDB7129b0f4890DbA53b6aeeeAB06e92": "1",
      "0x353651A9e88ac04dC0AaFFBc24C7770e85AdF36d": "1",
      "0x4eD8E7Fea02cc7d3116a181ef76ff50671A7E07d": "1",
      "0xFf65189D2c8F748D721Ce310c6CFf775BFa374f7": "1",
      "0x5750999c6f26e20A7DB2E3C96Fa516C945B74e69": "1",
      "0x955011f8aeD911501e60F970E0850C6105105BF5": "1",
      "0x2E180B4838948F338A75aF9687f6850D1b6df2B9": "1",
      "0x9E4080781cd8ca242B9b6A309A3EA79B40855f2E": "1",
      "0x85A2f00146d3Be7004234f6A663004C090E82357": "1",
      "0xe60362529AbdAF4bEC9784594395D70dcaaFEb69": "1",
      "0x0f299c536Ca8BBe849072858b49B79Fe0c67311E": "1",
      "0x23bEecc7b2d33C2cCf861Bb08bdDa469082A1aEd": "1",
      "0x6175844664837E4E5c678F83384D135873B095A5": "1",
      "0x2f8eC97A77B3a0F8bFC011ADb86353B2D8211BF1": "1",
      "0xA61C114E38cEAc5BDE6325956F4e808582690329": "1",
      "0xE21dfd855299F11534C5860E7159EE69820C9485": "1",
      "0x17e48dc273A96cC6E48920b78D3B1f22463eC2e5": "1",
      "0x799d076f0583d4D1177bAABDf1d1DE19e4B98F95": "1",
      "0x5293a2832FE611018707368364bA3Be34DbaAC53": "1",
      "0x39780C69E8c7850621146af3d227aD47df88e923": "1",
      "0xd969cb4923141027ddec64749b5083a541aaea12": "1",
      "0x46256ecad42c1772274ab1df561ef3d49832aee8": "1",
      "0x9a4ffd935e7b047beb05c8b62b193ca0dba6f95b": "1",
      "0x24Bbff32367F805289f43C9B33a94C7eB7098653": "1",
      "0x86C9FE3E71c70BE1d4f367f06B209598B717e1f4": "1",
      "0xC756d398AdDc797A96dd682E31dc968C190a856C": "1",
      "0x12739D8b1F511b589c45EC52aAE2CB95A4173932": "1",
      "0x01C98BD6a4f0DeD627881797aBb11e068bFC3A62": "1",
      "0xEF2A98E3e5db796B0B294890816Ae4C7e571C213": "1",
      "0x4Bcc662A854307099957826C2C55cEf2b13aF3aa": "1",
      "0x74dAf249F2762B8332BA6b6f24fe03F44794E272": "1",
      "0x39B23Dec93995a60f21D771aeC3A5A1Fbf2E646B": "1",
      "0x597cB8d70f15c06349950792E39202503Cff035d": "1",
    };

    const dataUnion = dataOperators.Union([
      zkDeveloperContributorData0,
      jsonListData1,
    ]);

    return [
      {
        name: "crypton-contributor",
        timestamp: context.timestamp,
        description: "Contribute to the bright future of zero-knowledge",
        specs: "The badge supports Github, Twitter and walletbased eligibility criteria. If you notice any missing group of individuals who are eligible to claim, feel free to reach out to me via submit a PR here: https://github.com/freshe4qa/zk-badge-eligible. We want to make sure everyone is recognized!",
        data: dataUnion,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};

export default generator;
