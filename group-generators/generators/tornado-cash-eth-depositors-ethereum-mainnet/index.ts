import { BigNumber } from "ethers";
import { BigQueryProvider } from "@group-generators/helpers/data-providers/big-query/big-query";

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

    const ethDepositors: FetchedData = {};

    const multiplier = BigNumber.from(10).pow(18);

    const getNewBalance = (address: string, newDeposit: number) => {
      let curBalance = ethDepositors[address];
      let newDepositWei;

      if(curBalance) {
        curBalance = BigNumber.from(curBalance);
      }
      else {
        curBalance = BigNumber.from(0);
      }

      if(newDeposit == 0.1) {
        newDepositWei = BigNumber.from(10).pow(17);
      }
      else {
        newDepositWei = BigNumber.from(newDeposit).mul(multiplier);
      }
      return curBalance.add(newDepositWei).toString();
    };

    // Get all 0.1ETH Deposits on Tornado Cash
    const getTornadoCash01DepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunction>(
      {
        functionABI: depositFunctionEthABI,
        contractAddress: tornadoCashDepositors01ETH,
      }
    );
    getTornadoCash01DepositTransactions.forEach((transaction) => {
      ethDepositors[transaction.from] = getNewBalance(transaction.from, 0.1);
    });

    // Get all 1ETH Deposits on Tornado Cash
    const getTornadoCash1DepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunction>(
      {
        functionABI: depositFunctionEthABI,
        contractAddress: tornadoCashDepositors1ETH,
      }
    );
    getTornadoCash1DepositTransactions.forEach((transaction) => {
      ethDepositors[transaction.from] = getNewBalance(transaction.from, 1);
    });

    // Get all 10ETH Deposits on Tornado Cash
    const getTornadoCash10DepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunction>(
      {
        functionABI: depositFunctionEthABI,
        contractAddress: tornadoCashDepositors10ETH,
      }
    );
    getTornadoCash10DepositTransactions.forEach((transaction) => {
      ethDepositors[transaction.from] = getNewBalance(transaction.from, 10);
    });

    // Get all 100ETH Deposits on Tornado Cash
    const getTornadoCash100DepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<DepositFunction>(
      {
        functionABI: depositFunctionEthABI,
        contractAddress: tornadoCashDepositors100ETH,
      }
    );
    getTornadoCash100DepositTransactions.forEach((transaction) => {
      ethDepositors[transaction.from] = getNewBalance(transaction.from, 100);
    });

    return [
      {
        name: "tornado-cash-eth-depositors-ethereum-mainnet",
        timestamp: context.timestamp,
        description: "All ETH Tornado Cash depositors on Ethereum mainnet",
        specs: "Deposit 0.1 or 1 or 10 or 100 ETH on Tornado Cash on Ethereum mainnet",
        data: ethDepositors,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Privacy, Tags.User],
      },
    ];
  },
};

export default generator;