
import { Tags, ValueType, GroupWithData, AccountSource } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
    generationFrequency: GenerationFrequency.Once,
  
    generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
      return [
        {
          name: "rhinofi-power-users",
          timestamp: context.timestamp,
          data: {
            "0xd69005F707ed755D530FbA0FBEa9eDe0749F9832": 1,
            "0xE514f01213d3Fb8B2ce34e1dE3010fbf49f39452": 1,
            "0x033A9eeCE0e010aaE3813d86Bfa9c6Abf596C154": 1,
            "0x0099F5326F05Fb8B3f541997526e9D9224a88147": 1,
            "0xbd3F6560472350d505aC1bBa85725Bb92f7a55Bb": 1,
            "0xFdB50E91bD993bd6b8b971c89EA51540270e53A9": 1,
            "0x7b6aceC5eA36DD5ef5b0639B8C1d0Dab59DdcF03": 1,
            "0x3061046845618529F12aaeD09A5C7d7E72b72Fc2": 1,
            "0xFA989408352D7c760636B068CAbfF051aBE35f15": 1,
            "0x0d88aBf9BBd27d8f50a60129634E4A02Da09DE33": 1,
            "0x7C9CFCf64A02200f0b3fa4FFd1773758Fc082749": 1,
            "0x00158A74921620b39E5c3aFE4dca79feb2c2C143": 1,
            "0x4aD76991795EBFc1751e075Caee4cCFc60381D5e": 1,
            "0xe72d3e3a0f67f2fc6689a2a61fb0e1496e072c5d": 1,
            "0x24caa4399334777F99DE433Fc62C60F43b10c082": 1,
            "0x92A0b2C089733beF43Ac367D2CE7783526AEA590": 1,
          },
          accountSources: [AccountSource.ETHEREUM],
          valueType: ValueType.Score,
          tags: [Tags.User],
          
        },
      ];
    },
  };
  
  export default generator;
