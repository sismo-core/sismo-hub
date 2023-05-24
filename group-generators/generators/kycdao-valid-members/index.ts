import { Contract } from "ethers";
import { dataProviders } from "@group-generators/helpers/data-providers";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const polygonRpcUrl = `https://rpc.ankr.com/polygon/${process.env.ANKR_API_KEY}`;
    const polygonRpcProvider = new dataProviders.JsonRpcProvider(polygonRpcUrl); //polygon

    // const celoRpcUrl = `https://rpc.ankr.com/celo/${process.env.ANKR_API_KEY}`;
    // const celoRpcProvider = new dataProviders.JsonRpcProvider(celoRpcUrl); //celo

    //
    //
    const address = "0x205E10d3c4C87E26eB66B1B270b71b7708494dB9";
    const abi = [
      "function totalSupply() public view returns (uint256)",
      "function ownerOf(uint256 tokenId) public view returns (address)",
      "function hasValidToken(address owner) public view returns (bool)",
    ];
    const contract = new Contract(address, abi, polygonRpcProvider);
    const totalSupply = await contract.totalSupply();

    const ownerPromises = [];

    for (let i = 0; i <= totalSupply; i++) {
      const promise = contract.ownerOf(i);
      ownerPromises.push(promise);
    }

    const owners = await Promise.all(ownerPromises);
    console.log("owners", owners);

    const validTokenPromises = [];
    const validOwners = [];
    for (let j = 0; j < owners.length; j++) {
      if (owners[j] !== "0x0000000000000000000000000000000000000000") {
        const promise = contract.hasValidToken(owners[j]);
        validTokenPromises.push(promise);
        validOwners.push(owners[j]);
      }
    }

    const validTokens = await Promise.all(validTokenPromises);
    console.log("validTokens", validTokens);

    const result = [];
    for (let k = 0; k < validOwners.length; k++) {
      if (validTokens[k]) {
        result.push(validOwners[k]);
      }
    }

    const validKycdaoMembers: FetchedData = {};

    return [
      {
        name: "kycdao-valid-members",
        timestamp: context.timestamp,
        description: "valid kycdao members on Polygon and CELO",
        specs: "valid kycdao members on Polygon and CELO",
        data: validKycdaoMembers,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};
export default generator;
