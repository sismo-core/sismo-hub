import BigQueryProvider from "@group-generators/helpers/data-providers/big-query/big-query";
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

    const depositFunctionABI =
      "function depositPendingFunds(uint256 assetId, uint256 amount, address owner, bytes32 proofHash) external payable";
    type DepositFunctionType = {
      assetId: string;
      amount: string;
      address: string;
      proof: string;
      index: string;
    };

    // Mainnet Aztec Connect contract address
    const contractAddress = "0xFF1F2B4ADb9dF6FC8eAFecDcbF96A2B351680455";
    const getAztecDepositTransactions =
      await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunctionType>(
        {
          functionABI: depositFunctionABI,
          contractAddress,
          options: {
            functionArgs: true,
          },
        }
      );

    const data: FetchedData = {};

    // Sum the transactions for same address
    for (const transactions of getAztecDepositTransactions) {
	data[transactions.from] = 1;
    }

    return [
      {
        name: "aztec-v2-depositors",
        timestamp: context.timestamp,
        data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Eth2],
      },
    ];
  },
};

export default generator;
