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

    const ethDepositors: FetchedData = {};

    const getNewBalanceRouters = (address: string, newDeposit: BigNumber) => {
      // Get the current balance of the address in wei
      const curBalance = ethDepositors[address] ? BigNumber.from(ethDepositors[address]) : BigNumber.from(0);
      // Return the new balance as a string in wei
      return curBalance.add(newDeposit).toString();
    };

    // ########################################################
    // # GET TORNADO CASH DEPOSITORS FROM OLD ROUTER CONTRACT #
    // ########################################################

    const tornadoCashOldRouter = "0x905b63Fff465B9fFBF41DeA908CEb12478ec7601";

    const oldRouterDepositFunctionABI = "function deposit(address _tornado, bytes32 _commitment, bytes calldata _encryptedNote) external payable"
    type oldRouterDepositFunctionArgs = {
      _tornado: string;
      _commitment: string;
      _encryptedNote: string;
    };

    const tornadoCashOldRouterDepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<oldRouterDepositFunctionArgs>(
      {
        functionABI: oldRouterDepositFunctionABI,
        contractAddress: tornadoCashOldRouter,
      }
    );
    
    for (const transaction of tornadoCashOldRouterDepositTransactions) {
      if(transaction.value._hex !== "0x00") {
        ethDepositors[transaction.from] = getNewBalanceRouters(transaction.from, transaction.value);
      }
    }


    // ####################################################
    // # GET TORNADO CASH DEPOSITORS FROM ROUTER CONTRACT #
    // ####################################################

    const tornadoCashRouter = "0xd90e2f925da726b50c4ed8d0fb90ad053324f31b";

    const routerDepositFunctionABI = "function deposit(address _tornado, bytes32 _commitment, bytes calldata _encryptedNote) public payable"
    type routerDepositFunctionArgs = {
      _tornado: string;
      _commitment: string;
      _encryptedNote: string;
    };

    const tornadoCashRouterDepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<routerDepositFunctionArgs>(
      {
        functionABI: routerDepositFunctionABI,
        contractAddress: tornadoCashRouter,
        options: {
          functionArgs: true
        }, 
      }
    );
    
    for (const transaction of tornadoCashRouterDepositTransactions) {
      if(transaction.value._hex !== "0x00") {
        ethDepositors[transaction.from] = getNewBalanceRouters(transaction.from, transaction.value);
      }
    }

    
    // ##############################################
    // # GET TORNADO CASH DEPOSITORS FROM ETH POOLS #
    // ##############################################

    // Mainnet Tornado Cash contract address: 0.1ETH
    const tornadoCashPool01ETH = "0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc";
    // Mainnet Tornado Cash contract address: 1ETH
    const tornadoCashPool1ETH = "0x47CE0C6eD5B0Ce3d3A51fdb1C52DC66a7c3c2936";
    // Mainnet Tornado Cash contract address: 10ETH
    const tornadoCashPool10ETH = "0x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF";
    // Mainnet Tornado Cash contract address: 100ETH
    const tornadoCashPool100ETH = "0xA160cdAB225685dA1d56aa342Ad8841c3b53f291";

    const poolsDepositFunctionEthABI =
    "function deposit(bytes32 _commitment) external payable nonReentrant";
    type poolsDepositFunctionArgs = {
    _commitment: string;
    };

    const multiplier = BigNumber.from(10).pow(18);

    const getNewBalance = (address: string, newDeposit: number) => {
      // Get the current balance of the address in wei
      const curBalance = ethDepositors[address] ? BigNumber.from(ethDepositors[address]) : BigNumber.from(0);
      // Convert the new deposit to wei
      const newDepositWei = (newDeposit === 0.1) ? BigNumber.from(10).pow(17) : BigNumber.from(newDeposit).mul(multiplier);
      // Return the new balance as a string in wei
      return curBalance.add(newDepositWei).toString();
    };

    // Get all 0.1ETH Deposits on Tornado Cash
    const getTornadoCash01DepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<poolsDepositFunctionArgs>(
      {
        functionABI: poolsDepositFunctionEthABI,
        contractAddress: tornadoCashPool01ETH,
      }
    );
    getTornadoCash01DepositTransactions.forEach((transaction) => {
      ethDepositors[transaction.from] = getNewBalance(transaction.from, 0.1);
    });

    // Get all 1ETH Deposits on Tornado Cash
    const getTornadoCash1DepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<poolsDepositFunctionArgs>(
      {
        functionABI: poolsDepositFunctionEthABI,
        contractAddress: tornadoCashPool1ETH,
      }
    );
    getTornadoCash1DepositTransactions.forEach((transaction) => {
      ethDepositors[transaction.from] = getNewBalance(transaction.from, 1);
    });

    // Get all 10ETH Deposits on Tornado Cash
    const getTornadoCash10DepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<poolsDepositFunctionArgs>(
      {
        functionABI: poolsDepositFunctionEthABI,
        contractAddress: tornadoCashPool10ETH,
      }
    );
    getTornadoCash10DepositTransactions.forEach((transaction) => {
      ethDepositors[transaction.from] = getNewBalance(transaction.from, 10);
    });

    // Get all 100ETH Deposits on Tornado Cash
    const getTornadoCash100DepositTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<poolsDepositFunctionArgs>(
      {
        functionABI: poolsDepositFunctionEthABI,
        contractAddress: tornadoCashPool100ETH,
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