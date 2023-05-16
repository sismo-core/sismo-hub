import { dataOperators } from "@group-generators/helpers/data-operators";
import {BigQueryProvider} from "@group-generators/helpers/data-providers/big-query/big-query";

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

    // Mainnet Tornado Cash contract address: 0.1ETH
    const tornadoCashDepositors01ETH = "0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc";
    // Mainnet Tornado Cash contract address: 1ETH
    const tornadoCashDepositors1ETH = "0x47CE0C6eD5B0Ce3d3A51fdb1C52DC66a7c3c2936";
    // Mainnet Tornado Cash contract address: 10ETH
    const tornadoCashDepositors10ETH = "0x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF";
    // Mainnet Tornado Cash contract address: 100ETH
    const tornadoCashDepositors100ETH = "0xA160cdAB225685dA1d56aa342Ad8841c3b53f291";

    const depositFunctionEthABI =
    "function deposit(bytes32 _commitment) external payable nonReentrant";
    type DepositFunction = {
    _commitment: string;
    };

    // Get all 0.1ETH Deposits on Tornado Cash
    const getTornadoCash01DepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunction>(
      {
        functionABI: depositFunctionEthABI,
        contractAddress: tornadoCashDepositors01ETH,
      }
    );
    const ethereum01Depositors: FetchedData = {};
    getTornadoCash01DepositTransactions.forEach((transaction) => {
      ethereum01Depositors[transaction.from] = 0.1;
    });

    // Get all 1ETH Deposits on Tornado Cash
    const getTornadoCash1DepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunction>(
      {
        functionABI: depositFunctionEthABI,
        contractAddress: tornadoCashDepositors1ETH,
      }
    );
    const ethereum1Depositors: FetchedData = {};
    getTornadoCash1DepositTransactions.forEach((transaction) => {
      ethereum1Depositors[transaction.from] = 1;
    });

    // Get all 10ETH Deposits on Tornado Cash
    const getTornadoCash10DepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunction>(
      {
        functionABI: depositFunctionEthABI,
        contractAddress: tornadoCashDepositors10ETH,
      }
    );
    const ethereum10Depositors: FetchedData = {};
    getTornadoCash10DepositTransactions.forEach((transaction) => {
      ethereum10Depositors[transaction.from] = 10;
    });

    // Get all 100ETH Deposits on Tornado Cash
    const getTornadoCash100DepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunction>(
      {
        functionABI: depositFunctionEthABI,
        contractAddress: tornadoCashDepositors100ETH,
      }
    );
    const ethereum100Depositors: FetchedData = {};
    getTornadoCash100DepositTransactions.forEach((transaction) => {
      ethereum100Depositors[transaction.from] = 100;
    });
    

    const tornadoCashDepositors = dataOperators.Union([
      ethereum01Depositors,
      ethereum1Depositors,
      ethereum10Depositors,
      ethereum100Depositors
    ]);

    return [
      {
        name: "tornado-cash-depositors-ethereum-mainnet",
        timestamp: context.timestamp,
        description: "All ETH Tornado Cash depositors on Ethereum mainnet",
        specs: "Deposit 0.1 or 1 or 10 or 100 ETH on Tornado Cash on Ethereum mainnet",
        data: tornadoCashDepositors,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Privacy, Tags.User],
      },
    ];
  },
};

export default generator;
