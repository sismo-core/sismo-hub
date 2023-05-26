import { ethers, Contract } from "ethers";
import { Tags, ValueType, GroupWithData, FetchedData } from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

async function getTotalSupply(contract: Contract): Promise<number> {
  try {
    const totalSupply = await contract.totalSupply();
    return totalSupply.toNumber();
  } catch (error) {
    throw new Error(`Failed to get total supply ${error}`);
  }
}

async function getOwners(
  contract: Contract,
  totalSupply: number
): Promise<string[]> {
  const ownersListPromises = [];

  for (let i = 1; i <= totalSupply; i++) {
    const promise = contract.ownerOf(i);
    ownersListPromises.push(promise);
  }

  try {
    const ownersList = await Promise.all(ownersListPromises);
    return ownersList;
  } catch (error) {
    throw new Error(`Failed to get owners from tokenId ${error}`);
  }
}

async function checkValidity(
  contract: Contract,
  ownersList: string[]
): Promise<boolean[]> {
  const checkValidityPromises = ownersList.map((owner) =>
    contract.hasValidToken(owner)
  );

  try {
    const validityList = await Promise.all(checkValidityPromises);
    return validityList;
  } catch (error) {
    throw new Error(`Failed to check validity for ${error}`);
  }
}

function filterValidOwners(ownersList: string[]): string[] {
  return ownersList.filter(
    (owner) => owner !== "0x0000000000000000000000000000000000000000"
  );
}

function aggregateData(
  ownersList: string[],
  validityList: boolean[],
  groupData: FetchedData
) {
  validityList.forEach((validity, index) => {
    if (validity) {
      groupData[ownersList[index]] = 1;
    }
  });
}

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    //CONSTANTS - valid for both Polygon & CELO
    const validMembers: FetchedData = {};
    const ADDRESS = "0x205E10d3c4C87E26eB66B1B270b71b7708494dB9";
    const ABI = [
      "function totalSupply() public view returns (uint256)",
      "function ownerOf(uint256 tokenId) public view returns (address)",
      "function hasValidToken(address owner) public view returns (bool)",
    ];

    const polygonRpcUrl = `https://rpc.ankr.com/polygon/${process.env.ANKR_API_KEY}`;
    const polygonRpcProvider = new ethers.providers.JsonRpcProvider(
      polygonRpcUrl
    );
    const polygonContract = new Contract(ADDRESS, ABI, polygonRpcProvider);
    const polygonTotalSupply = await getTotalSupply(polygonContract);
    const polygonOwnersList = await getOwners(
      polygonContract,
      polygonTotalSupply
    );
    const filteredPolygonOwnersList = filterValidOwners(polygonOwnersList);
    const polygonValidityList = await checkValidity(
      polygonContract,
      filteredPolygonOwnersList
    );
    
    aggregateData(filteredPolygonOwnersList, polygonValidityList, validMembers);

    
    const celoRpcUrl = `https://rpc.ankr.com/celo/${process.env.ANKR_API_KEY}`;
    const celoRpcProvider = new ethers.providers.JsonRpcProvider(celoRpcUrl);
    const celoContract = new Contract(ADDRESS, ABI, celoRpcProvider);
    const celoTotalSupply = await getTotalSupply(celoContract);
    const celoOwnersList = await getOwners(celoContract, celoTotalSupply);
    const filteredCeloOwnersList = filterValidOwners(celoOwnersList);
    const celoValidityList = await checkValidity(
      celoContract,
      filteredCeloOwnersList
    );

    aggregateData(filteredCeloOwnersList, celoValidityList, validMembers);

    return [
      {
        name: "kycdao-valid-members",
        timestamp: context.timestamp,
        description: "valid kycdao members on Polygon and CELO",
        specs: "valid kycdao members on Polygon and CELO",
        data: validMembers,
        valueType: ValueType.Score,
        tags: [Tags.Factory],
      },
    ];
  },
};
export default generator;
