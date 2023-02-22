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
  generationFrequency: GenerationFrequency.Once,

  generate: async (context: GenerationContext): Promise<GroupWithData[]> => {
    const bigQueryProvider = new BigQueryProvider();

    const depositFunctionABI =
      "function deposit(bytes calldata pubkey, bytes calldata withdrawal_credentials, bytes calldata signature, bytes32 deposit_data_root) external payable";
    type DepositFunctionType = {
      pubkey: string;
      withdrawal_credentials: string;
      amount: string;
      signature: string;
      index: string;
    };

    // Mainnet eth2 Deposit contract address
    const contractAddress = "0x00000000219ab540356cBB839Cbe05303d7705Fa";
    const getEth2DepositTransactions =
      await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunctionType>(
        {
          functionABI: depositFunctionABI,
          contractAddress,
          options: {
            functionArgs: false,
          },
        }
      );

    const data: FetchedData = {};

    // Sum the transactions for same address
    for (const transactions of getEth2DepositTransactions) {
      data[transactions.from] = 1;
      // data[transactions.from] = BigNumber.from(
      //   data[transactions.from] ? data[transactions.from] : 0
      // )
      //   .add(1)
      //   .toHexString();
      // frontend was only issuing badges with value 1
      // value should be thought as "tier" from now on
      // and suit a particular usecase
    }

    return [
      {
        name: "eth2-depositors",
        timestamp: context.timestamp,
        description: "Ethereum 2.0 depositors",
        specs: "",
        data,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Eth2],
      },
    ];
  },
};

export default generator;
