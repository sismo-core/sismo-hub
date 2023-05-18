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

    const ethWithdrawers: FetchedData = {};

    // Mainnet Tornado Cash contract address: 0.1ETH
    const tornadoCashPool01ETH = "0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc";
    // Mainnet Tornado Cash contract address: 1ETH
    const tornadoCashPool1ETH = "0x47CE0C6eD5B0Ce3d3A51fdb1C52DC66a7c3c2936";
    // Mainnet Tornado Cash contract address: 10ETH
    const tornadoCashPool10ETH = "0x910Cbd523D972eb0a6f4cAe4618aD62622b39DbF";
    // Mainnet Tornado Cash contract address: 100ETH
    const tornadoCashPool100ETH = "0xA160cdAB225685dA1d56aa342Ad8841c3b53f291";

    const multiplier = BigNumber.from(10).pow(18);

    const getNewBalance = (address: string, newWithdraw: number) => {
      // Get the current balance of the address in wei
      const curBalance = ethWithdrawers[address] ? BigNumber.from(ethWithdrawers[address]) : BigNumber.from(0);
      // Convert the new deposit to wei
      const newWithdrawWei = (newWithdraw === 0.1) ? BigNumber.from(10).pow(17) : BigNumber.from(newWithdraw).mul(multiplier);
      // Return the new balance as a string in wei
      return curBalance.add(newWithdrawWei).toString();
    };

    const setCorrespondingBalance = (pool: string, address: string): void => {
      switch(pool) {
        case tornadoCashPool01ETH:
          ethWithdrawers[address] = getNewBalance(address, 0.1);
          break;
        case tornadoCashPool1ETH:
          ethWithdrawers[address] = getNewBalance(address, 1);
          break;
        case tornadoCashPool10ETH:
          ethWithdrawers[address] = getNewBalance(address, 10);
          break;
        case tornadoCashPool100ETH:
          ethWithdrawers[address] = getNewBalance(address, 100);
          break;
      }
    }

    // #########################################################
    // # GET TORNADO CASH WITHDRAWERS FROM OLD ROUTER CONTRACT #
    // #########################################################

    const tornadoCashOldRouter = "0x905b63Fff465B9fFBF41DeA908CEb12478ec7601";

    const oldRouterWithdrawFunctionABI = "function withdraw(address _tornado, bytes calldata _proof, bytes32 _root, bytes32 _nullifierHash, address payable _recipient, address payable _relayer, uint256 _fee, uint256 _refund) external payable"
    type oldRouterWithdrawFunctionArgs = {
      _tornado: string;
      _proof: string;
      _root: string;
      _nullifierHash: string;
      _recipient: string;
      _relayer: string;
      _fee: BigNumber;
      _refund: BigNumber;
    };

    const tornadoCashOldRouterWithdrawTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<oldRouterWithdrawFunctionArgs>(
      {
        functionABI: oldRouterWithdrawFunctionABI,
        contractAddress: tornadoCashOldRouter,
        options: {
          functionArgs: true
        },
      }
    );
    
    for (const transaction of tornadoCashOldRouterWithdrawTransactions) {
      if(transaction?.args?._tornado) {
        setCorrespondingBalance(transaction.args._tornado, transaction.from);
      }
    }


    // #####################################################
    // # GET TORNADO CASH WITHDRAWERS FROM ROUTER CONTRACT #
    // #####################################################

    const tornadoCashRouter = "0xd90e2f925da726b50c4ed8d0fb90ad053324f31b";

    const routerWithdrawFunctionABI = "function withdraw(address _tornado, bytes calldata _proof, bytes32 _root, bytes32 _nullifierHash, address payable _recipient, address payable _relayer, uint256 _fee, uint256 _refund) external payable"
    type routerWithdrawFunctionArgs = {
      _tornado: string;
      _proof: string;
      _root: string;
      _nullifierHash: string;
      _recipient: string;
      _relayer: string;
      _fee: BigNumber;
      _refund: BigNumber;
    };

    const tornadoCashRouterWithdrawTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<routerWithdrawFunctionArgs>(
      {
        functionABI: routerWithdrawFunctionABI,
        contractAddress: tornadoCashRouter,
        options: {
          functionArgs: true
        },
      }
    );

    for (const transaction of tornadoCashRouterWithdrawTransactions) {
      if(transaction?.args?._tornado) {
        setCorrespondingBalance(transaction.args._tornado, transaction.from);
      }
    }

    
    // ###############################################
    // # GET TORNADO CASH WITHDRAWERS FROM ETH POOLS #
    // ###############################################

    const poolsWithdrawFunctionEthABI =
    "function withdraw(bytes calldata _proof, bytes32 _root, bytes32 _nullifierHash, address payable _recipient, address payable _relayer, uint256 _fee, uint256 _refund) external payable nonReentrant";
    type poolsWithdrawFunctionArgs = {
      _proof: string;
      _root: string;
      _nullifierHash: string;
      _recipient: string;
      _relayer: string;
      _fee: BigNumber;
      _refund: BigNumber;
    };

    // Get all 0.1ETH Withdraws on Tornado Cash
    const getTornadoCash01WithdrawTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<poolsWithdrawFunctionArgs>(
      {
        functionABI: poolsWithdrawFunctionEthABI,
        contractAddress: tornadoCashPool01ETH,
      }
    );
    getTornadoCash01WithdrawTransactions.forEach((transaction) => {
      ethWithdrawers[transaction.from] = getNewBalance(transaction.from, 0.1);
    });

    // Get all 1ETH Withdraws on Tornado Cash
    const getTornadoCash1WithdrawTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<poolsWithdrawFunctionArgs>(
      {
        functionABI: poolsWithdrawFunctionEthABI,
        contractAddress: tornadoCashPool1ETH,
      }
    );
    getTornadoCash1WithdrawTransactions.forEach((transaction) => {
      ethWithdrawers[transaction.from] = getNewBalance(transaction.from, 1);
    });

    // Get all 10ETH Withdraws on Tornado Cash
    const getTornadoCash10WithdrawTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<poolsWithdrawFunctionArgs>(
      {
        functionABI: poolsWithdrawFunctionEthABI,
        contractAddress: tornadoCashPool10ETH,
      }
    );
    getTornadoCash10WithdrawTransactions.forEach((transaction) => {
      ethWithdrawers[transaction.from] = getNewBalance(transaction.from, 10);
    });

    // Get all 100ETH Withdraws on Tornado Cash
    const getTornadoCash100WithdrawTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<poolsWithdrawFunctionArgs>(
      {
        functionABI: poolsWithdrawFunctionEthABI,
        contractAddress: tornadoCashPool100ETH,
      }
    );
    getTornadoCash100WithdrawTransactions.forEach((transaction) => {
      ethWithdrawers[transaction.from] = getNewBalance(transaction.from, 100);
    });

    return [
      {
        name: "tornado-cash-eth-withdrawers-ethereum-mainnet",
        timestamp: context.timestamp,
        description: "All ETH Tornado Cash withdrawers on Ethereum mainnet",
        specs: "Withdraw 0.1 or 1 or 10 or 100 ETH on Tornado Cash on Ethereum mainnet",
        data: ethWithdrawers,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Privacy, Tags.User],
      },
    ];
  },
};

export default generator;