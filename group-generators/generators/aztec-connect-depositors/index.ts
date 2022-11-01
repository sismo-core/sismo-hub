import BigQueryProvider from "@group-generators/helpers/data-providers/big-query/big-query";
import { dataOperators } from "@group-generators/helpers/data-operators";
import { BigNumber } from "ethers";

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


// #####################
// Start of ETH Deposit list creation
// #####################


const runETH = 1;
if ( runETH == 1 ) {
// Call google for ETH Deposits for Aztec V1
    const depositFunctionEthV1ABI =
      "function depositPendingFunds(uint256 assetId, uint256 amount, address depositorAddress) external payable";
    type DepositFunctionTypeV1 = {
      assetId: string;
      amount: string;
      address: string;
      proof: string;
      index: string;
    };
    const getAztecV1DepositTransactions =
      await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunctionTypeV1>(
        {
          functionABI: depositFunctionEthV1ABI,
          contractAddress: contractAddressV1,
          options: {
            functionArgs: false,
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
      index: string;
    };

    const getAztecV2DepositTransactions =
      await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunctionTypeV2>(
        {
          functionABI: depositFunctionEthV2ABI,
          contractAddress: contractAddressV2,
          options: {
            functionArgs: false,
          },
        }
      );


// Combine the output from google query into one object.
	const ethCombinedQuery = {}; 
	let key;
	for (key in getAztecV1DepositTransactions) {
		if (getAztecV1DepositTransactions.hasOwnProperty(key)) {
			ethCombinedQuery[key] = getAztecV1DepositTransactions[key];
		}
	}
	for (key in getAztecV2DepositTransactions) {
		if (getAztecV2DepositTransactions.hasOwnProperty(key)) {
			ethCombinedQuery[key] = getAztecV2DepositTransactions[key];
		}
	}

	console.log(ethCombinedQuery)

    // Make sure the address has done at least 5 deposits. 
    const numberOfEthDepositsByAddress: FetchedData = {};
    for (const transaction of ethCombinedQuery) {
      numberOfEthDepositsByAddress[transaction.from] = numberOfEthDepositsByAddress[
        transaction.from
      ]
        ? BigNumber.from(numberOfEthDepositsByAddress[transaction.from]).add(1)
        : BigNumber.from(1);
    }

    const ethMinDepositList: FetchedData = {};
    const minNumberOfDeposits = 5;
    for (const address of Object.keys(numberOfEthDepositsByAddress)) {
      if (
        BigNumber.from(numberOfEthDepositsByAddress[address]).gte(
          minNumberOfDeposits
        )
      ) {
        ethMinDepositList[address] = 1;
      }
    }

    console.log(Object.keys(ethMinDepositList));

    // Make sure the sum of deposits is at least 0.1 Ether.
    const ethMinAmount: FetchedData = {};
    for (const transaction of ethCombinedQuery) {
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

    console.log(Object.keys(ethMinAmountList));
   
   // Find addresses from the first list that is also in the second list.
    const ethFinalList: FetchedData = {};
    for (const address1 of Object.keys(ethMinDepositList) ) {
	for (const address2 of Object.keys(ethMinAmountList) ) {
		if (address1 == address2) {
			// Both addresses in same list
			ethFinalList[address1] = 1;
		}

	}

    }

    console.log(Object.keys(ethFinalList));
}
/* #####################
/* End of ETH Section
/* #####################
*/


/* #####################
/* Start of Dai Deposit list creation
/* #####################
*/
const runDai = 0;
if ( runDai == 1 ) {
// Call google for DAI Deposits for Aztec V1
    const depositFunctionDaiV1ABI =
      "function depositPendingFunds(uint256 assetId, uint256 amount, address depositorAddress) external payable";
    type DepositFunctionTypeV1 = {
      assetId: 1;
      amount: string;
      address: string;
      proof: string;
      index: string;
    };
    const getAztecDaiV1DepositTransactions =
      await bigQueryProvider.getAllTransactionsForSpecificMdaiod<DepositFunctionTypeV1>(
        {
          functionABI: depositFunctionDaiV1ABI,
          contractAddress: contractAddressV1,
          options: {
            functionArgs: false,
          },
        }
      );


// Call google for DAI Deposits for Aztec V2
//    const depositFunctionDaiV2ABI =
//      "function depositPendingFundsPermitNonStandard(uint256 assetId, uint256 amount, address owner, uint256 nonce, uint256 deadline, uint8 v, bytes32 r, bytes32 s) external payable";
//    type DepositFunctionTypeV2 = {
//    const depositFunctionABI =
//      "function depositPendingFunds(uint256 assetId, uint256 amount, address owner, bytes32 proofHash) external payable";
//    type DepositFunctionType = {
//      assetId: string;
//      amount: string;
//      address: string;
//      proof: string;
//      index: string;
//    };
//
//    const getAztecDaiV2DepositTransactions =
//      await bigQueryProvider.getAllTransactionsForSpecificMdaiod<DepositFunctionTypeV2>(
//        {
//          functionABI: depositFunctionDaiV2ABI,
//          contractAddress: contractAddressV2,
//          options: {
//            functionArgs: false,
//    // Mainnet Aztec Connect contract address
//    const contractAddress = "0xFF1F2B4ADb9dF6FC8eAFecDcbF96A2B351680455";
//    const getAztecDepositTransactions =
//      await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunctionType>(
//        {
//          functionABI: depositFunctionABI,
//          contractAddress,
//          options: {
//            functionArgs: true,
//          },
//        }
//      );
//
//// Combine the output from google query into one object.
//	const v1dai = JSON.parse(getAztecDaiV1DepositTransactions);
//	const v2dai = JSON.parse(getAztecDaiV2DepositTransactions);
//	const daiCombinedQuery = {
//		...v1dai,
//		...v2dai,
//	};
//
//    // Make sure the address has done at least 5 deposits. 
//    const numberOfDaiDepositsByAddress: FetchedData = {};
//    for (const transaction of getAztecCombinedDepositTransactions) {
//      numberOfDaiDepositsByAddress[transaction.from] = numberOfDaiDepositsByAddress[
//        transaction.from
//      ]
//        ? BigNumber.from(numberOfDaiDepositsByAddress[transaction.from]).add(1)
//        : BigNumber.from(1);
//    }
//
//    const daiMinDepositList: FetchedData = {};
//    const minNumberOfDeposits = 5;
//    for (const address of Object.keys(numberOfDaiDepositsByAddress)) {
//      if (
//        BigNumber.from(numberOfDaiDepositsByAddress[address]).gte(
//          minNumberOfDeposits
//        )
//      ) {
//        daiMinDepositList[address] = 1;
//      }
//    }
//
//    console.log(Object.keys(daiMinDepositList));
//
//    // Make sure the sum of deposits is at least 0.1 Daier.
//    const daiMinAmount: FetchedData = {};
//    for (const transaction of getAztecCombinedDepositTransactions) {
//      daiMinAmount[transaction.from] = BigNumber.from(
//        daiMinAmount[transaction.from]
//          ? daiMinAmount[transaction.from]
//          : BigNumber.from(0)
//      ).add(transaction.value);
//    }
//
//    const daiMinAmountList: FetchedData = {};
//    const minAmountOfDeposit = BigNumber.from(10).pow(17); // 0.1 Daier
//    for (const address of Object.keys(daiMinAmount)) {
//      if (
//        BigNumber.from(daiMinAmount[address]).gte(minAmountOfDeposit)
//      ) {
//        daiMinAmountList[address] = 1;
//      }
//    }
//
//    console.log(Object.keys(daiMinAmountList));
//   
//   // Find addresses from the first list that is also in the second list.
//    const daiFinalList: FetchedData = {};
//    for (const address1 of Object.keys(daiMinDepositList) ) {
//	for (const address2 of Object.keys(daiMinAmountList) ) {
//		if (address1 == address2) {
//			// Both addresses in same list
//			daiFinalList[address1] = 1;
//		}
//
//	}
//
//    }

//    console.log(Object.keys(daiFinalList));
}
/* #####################
/* End of DAI Section
/* #####################
*/

    const data: FetchedData = {};

    // Sum the transactions for same address
    for (const transactions of getAztecDepositTransactions) {
	data[transactions.from] = 1;
    }

    return [
      {
        name: "aztec-v2-depositors",
        timestamp: context.timestamp,
        data: ethFinalList,
        data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Eth2],
      },
    ];
  },
};

export default generator;
