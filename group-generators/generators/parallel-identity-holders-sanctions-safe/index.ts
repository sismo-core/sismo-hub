import { ethers } from "ethers";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const alchemyProvider = new dataProviders.AlchemyProvider();
    const address = `0x9ec6232742b6068ce733645AF16BA277Fa412B0A`;

    //first get tokenids from the contract
    const tokenIds = await alchemyProvider.getTokenIdsOfContract({
      chain: "eth-mainnet",
      contractAddress: address,
    });
    //remove tokenId 92 because it is erraneous
    tokenIds.splice(
      tokenIds.indexOf(
        "0x0000000000000000000000000000000000000000000000000000000000000092"
      ),
      1
    );

    // then check which are safe from sanctions
    const rpcProvider = new ethers.AnkrProvider(
      "homestead",
      process.env.ANKR_API_KEY
    );

    const abi = [
      "function isSanctionsSafe(uint256 _tokenId) view returns (bool)",
    ];
    const contract = new ethers.Contract(address, abi, rpcProvider);

    const promises = tokenIds.map(async (tokenId) => {
      const tokenCall = await contract.isSanctionsSafe(tokenId);
      const tokenRes = await tokenCall;
      return {
        tokenId,
        isSafe: tokenRes,
      };
    });

    const results = await Promise.all(promises);

    const safeTokenIds = results
      .filter((result) => result.isSafe)
      .map((result) => result.tokenId);

    //then get owners of safe tokenIds
    const owners = await alchemyProvider.getOwnersOfTokenIds({
      contractAddress: address,
      chain: "eth-mainnet",
      tokenIds: safeTokenIds,
    });

    return [
      {
        name: "parallel-identity-holders-sanctions-safe",
        timestamp: context.timestamp,
        description:
          "get parallel identity holders safe from international sanctions",
        specs:
          "get parallel identity holders safe from international sanctions",
        data: owners,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};
export default generator;