import { BigNumber } from "ethers";
import { dataOperators } from "@group-generators/helpers/data-operators";
import BigQueryProvider from "@group-generators/helpers/data-providers/big-query/big-query";
//import * as fs from 'fs';

import {
  ValueType,
  Tags,
  FetchedData,
  GroupWithData,
  AccountSource,
} from "topics/group";
import {
  GenerationContext,
  GenerationFrequency,
  GroupGenerator,
} from "topics/group-generator";

const generator: GroupGenerator = {
  generationFrequency: GenerationFrequency.Daily,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const bigQueryProvider = new BigQueryProvider();

    //Mainnet Aztec V1 contract address
    const contractAddressV1 = "0x737901bea3eeb88459df9ef1BE8fF3Ae1B42A2ba";
    //Mainnet Aztec V2 contract address
    const contractAddressV2 = "0xFF1F2B4ADb9dF6FC8eAFecDcbF96A2B351680455";

    // TODO: Dai support
    //Mainnet Aztec V2 dai contract address
    //const contractAddressV2Dai = "0xf4f1e0b0b93b7b2b7b6992b99f2a1678b07cd70c";
    //"function depositPendingFundsPermitNonStandard(uint256 assetId, uint256 amount, address owner, uint256 nonce, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external payable";


// #####################
// Start of ETH Deposit list creation
// #####################
// Call google for ETH Deposits for Aztec V1
    const depositFunctionEthV1ABI =
      "function depositPendingFunds(uint256 assetId, uint256 amount, address depositorAddress) external payable";
    type DepositFunctionTypeV1 = {
      assetId: string;
      amount: string;
      address: string;
    };
    const getAztecV1DepositTransactions =
      await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunctionTypeV1>(
        {
          functionABI: depositFunctionEthV1ABI,
          contractAddress: contractAddressV1,
          options: {
            functionArgs: true,
          },
        }
      );

// Call google for ETH Deposits for Aztec V2
    const depositFunctionEthV2ABI =
      "function depositPendingFunds(uint256 assetId, uint256 amount, address owner, bytes32 proofHash) external payable";
    type DepositFunctionTypeV2 = {
      assetId: string;
      amount: string;
      address: string;
      proof: string;
    };

    const getAztecV2DepositTransactions =
      await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunctionTypeV2>(
        {
          functionABI: depositFunctionEthV2ABI,
          contractAddress: contractAddressV2,
          options: {
            functionArgs: true,
          },
        }
      );


// USED FOR DEBUGGING
//    const getAztecV1DepositTransactions = JSON.parse(
//      fs.readFileSync("aztecv1.json").toString()
//    );
//    const getAztecV2DepositTransactions = JSON.parse(
//      fs.readFileSync("aztecv2.json").toString()
//    );
//console.log("Full V1: " + Object.keys(getAztecV1DepositTransactions).length);
//console.log("Full V2: " + Object.keys(getAztecV2DepositTransactions).length);
// END OF DEBUGGING


    // V1 Eth deposits must sum to 0.1 ETH or more
    // Make sure the sum of deposits is at least 0.1 Ether.
    const ethMinAmountV1: FetchedData = {};
    for (const transaction of getAztecV1DepositTransactions ) {
      ethMinAmountV1[transaction.from] = BigNumber.from(
        ethMinAmountV1[transaction.from]
          ? ethMinAmountV1[transaction.from]
          : BigNumber.from(0)
      ).add(transaction.value);
    }

    const ethMinAmountV1List: FetchedData = {};
    const minAmountV1OfDeposit = BigNumber.from(10).pow(17); // 0.1 Ether
    for (const address of Object.keys(ethMinAmountV1)) {
      if (
        BigNumber.from(ethMinAmountV1[address]).gte(minAmountV1OfDeposit)
      ) {
        ethMinAmountV1List[address] = 1;
      }
    }

    //console.log("V1 After: " + Object.keys(ethMinAmountV1List).length);

    // V2 Eth deposits with at least 3 deposits. 
    const numberOfEthDepositsByAddress: FetchedData = {};
    for (const transaction of getAztecV2DepositTransactions) {
      numberOfEthDepositsByAddress[transaction.from] = numberOfEthDepositsByAddress[
        transaction.from
      ]
        ? BigNumber.from(numberOfEthDepositsByAddress[transaction.from]).add(1)
        : BigNumber.from(1);
    }

    const ethMinDepositList: FetchedData = {};
    const minNumberOfDeposits = 3;
    for (const address of Object.keys(numberOfEthDepositsByAddress)) {
      if (
        BigNumber.from(numberOfEthDepositsByAddress[address]).gte(
          minNumberOfDeposits
        )
      ) {
        ethMinDepositList[address] = 1;
      }
    }

    //console.log("V2 3 deposit: " + Object.keys(ethMinDepositList).length);

    // V2 Eth deposits must sum to 0.1 ETH or more
    // Make sure the sum of deposits is at least 0.1 Ether.
    const ethMinAmount: FetchedData = {};
    for (const transaction of getAztecV2DepositTransactions ) {
      ethMinAmount[transaction.from] = BigNumber.from(
        ethMinAmount[transaction.from]
          ? ethMinAmount[transaction.from]
          : BigNumber.from(0)
      ).add(transaction.value);
    }

    const ethMinAmountList: FetchedData = {};
    const minAmountOfDeposit = BigNumber.from(10).pow(17); // 0.1 Ether
    for (const address of Object.keys(ethMinAmount)) {
      if (
        BigNumber.from(ethMinAmount[address]).gte(minAmountOfDeposit)
      ) {
        ethMinAmountList[address] = 1;
      }
    }

    //console.log("V2 min amount: " + Object.keys(ethMinAmountList).length);

    // Intersect the min amount and 3 deposit group
    // Doesn't work
    //     Object.keys(groupData2).map((addr) => addr.toLowerCase())
    //		TypeError: Cannot convert undefined or null to object
    //const ethV2Intersection = dataOperators.Intersection([
    //    ethMinAmountList,
    //    ethMinDepositList,
    //]);
    const ethV2Intersection: FetchedData = {};
    for (const address1 of Object.keys(ethMinDepositList) ) {
	for (const address2 of Object.keys(ethMinAmountList) ) {
		if (address1 == address2) {
			// Both addresses in same list
			ethV2Intersection[address1] = 1;
		}
	}
    }

    //console.log("V2 after: " + Object.keys(ethV2Intersection).length);

    // Combine the V1 list with the V2 list.
    const dataFinal = dataOperators.Union([
      ethMinAmountV1List,
      ethV2Intersection,
    ]);

    //console.log("Final: " + Object.keys(dataFinal).length);

/* #####################
/* End of ETH Section
/* #####################
*/
//
// TODO: Get Dai parsing working.
//
//    const data: FetchedData = {};
//    for (const transaction of getAztecV2DepositTransactions) {
//	    console.log(transaction);
//	    console.log(transaction.args?.assetId);
//	    console.log(BigNumber.from(transaction.args?.assetId).toString());
//	    console.log(BigNumber.from(transaction.args?.amount).toString());
//	    data[transaction.args?.assetId] = BigNumber.from(
//		    data[transaction.args?.assetId]);
//		    console.log(data[transaction.args?.assetId]);
//   }


    return [
      {
        name: "aztec-connect-depositors",
        timestamp: context.timestamp,
        description: "Aztec V1 (Early eligibility): Deposit(s) totalling 0.1 ETH or greater. Aztec V2 (Ongoing): 3 Ethereum L1 Deposits (NOT DEFI DEPOSITS) totalling 0.1 ETH or greater. Dai deposits are not eligible.",
        specs: "The badge was botted and more strict requirements are enforced now. Early V1 Aztec users must have deposited at least 0.1 ETH (e.g 1 transaction of 0.1 ETH, or 4 transactions of 0.025 ETH. V2 Aztec users must have 3 deposits and those 3 deposits must total 0.1 ETH (e.g 3 transactions of 0.0333 ETH). Dai deposits are not supported.",
        data: dataFinal,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Eth2],
      },
    ];
  },
};

export default generator;
