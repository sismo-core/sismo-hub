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

    const tornadoCashOldRouterWithdrawTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<routerWithdrawFunctionArgs>(
      {
        functionABI: routerWithdrawFunctionABI,
        contractAddress: tornadoCashOldRouter,
        options: {
          functionArgs: true
        },
      }
    );
    
    for (const transaction of tornadoCashOldRouterWithdrawTransactions) {
      if(transaction?.args?._tornado && transaction?.args?._recipient) {
        setCorrespondingBalance(transaction.args._tornado, transaction.args._recipient);
      }
    }


    // ###########################################################
    // # GET TORNADO CASH WITHDRAWERS FROM OLD ROUTER CONTRACT 2 #
    // ###########################################################

    const tornadoCashOldRouter2 = "0x722122dF12D4e14e13Ac3b6895a86e84145b6967";

    const tornadoCashOldRouter2WithdrawTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<routerWithdrawFunctionArgs>(
      {
        functionABI: routerWithdrawFunctionABI,
        contractAddress: tornadoCashOldRouter2,
        options: {
          functionArgs: true
        },
      }
    );
    
    for (const transaction of tornadoCashOldRouter2WithdrawTransactions) {
      if(transaction?.args?._tornado && transaction?.args?._recipient) {
        setCorrespondingBalance(transaction.args._tornado, transaction.args._recipient);
      }
    }


    // #####################################################
    // # GET TORNADO CASH WITHDRAWERS FROM ROUTER CONTRACT #
    // #####################################################

    const tornadoCashRouter = "0xd90e2f925da726b50c4ed8d0fb90ad053324f31b";

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
      if(transaction?.args?._tornado && transaction?.args?._recipient) {
        setCorrespondingBalance(transaction.args._tornado, transaction.args._recipient);
      }
    }


    // #####################################################
    // # GET TORNADO CASH WITHDRAWERS FROM MIXER1 CONTRACT #
    // #####################################################

    const tornadoCashMixer1 = "0x94A1B5CdB22c43faab4AbEb5c74999895464Ddaf";
    const mixer1WithdrawFunctionABI = "function withdraw(uint256[2] memory a, uint256[2][2] memory b, uint256[2] memory c, uint256[4] memory input) public"
    type mixer1WithdrawFunctionArgs = {
      a: BigNumber[];
      b: BigNumber[][];
      c: BigNumber[];
      input: BigNumber[];
    };

    const tornadoCashMixer1WithdrawTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<mixer1WithdrawFunctionArgs>(
      {
        functionABI: mixer1WithdrawFunctionABI,
        contractAddress: tornadoCashMixer1,
        options: {
          functionArgs: true
        },
      }
    );

    const evmAddressRegEx = new RegExp("^0x[a-fA-F0-9]{40}$")

    for (const transaction of tornadoCashMixer1WithdrawTransactions) {
      if(transaction?.args?.input && evmAddressRegEx.test(transaction?.args?.input[2]._hex.toString())) {
        ethWithdrawers[transaction?.args?.input[2]._hex.toString()] = getNewBalance(transaction?.args?.input[2]._hex.toString(), 0.1);
      }
    }


    // #####################################################
    // # GET TORNADO CASH WITHDRAWERS FROM MIXER2 CONTRACT #
    // #####################################################

    const tornadoCashMixer2 = "0xb541fc07bC7619fD4062A54d96268525cBC6FfEF";

    const tornadoCashMixer2WithdrawTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<mixer1WithdrawFunctionArgs>(
      {
        functionABI: mixer1WithdrawFunctionABI,
        contractAddress: tornadoCashMixer2,
        options: {
          functionArgs: true
        },
      }
    );

    for (const transaction of tornadoCashMixer2WithdrawTransactions) {
      if(transaction?.args?.input && evmAddressRegEx.test(transaction?.args?.input[2]._hex.toString())) {
        ethWithdrawers[transaction?.args?.input[2]._hex.toString()] = getNewBalance(transaction?.args?.input[2]._hex.toString(), 0.1);
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
        options: {
          functionArgs: true
        },
      }
    );
    getTornadoCash01WithdrawTransactions.forEach((transaction) => {
      if(transaction?.args?._recipient) {
        ethWithdrawers[transaction.args._recipient] = getNewBalance(transaction.args._recipient, 0.1);
      }
    });

    // Get all 1ETH Withdraws on Tornado Cash
    const getTornadoCash1WithdrawTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<poolsWithdrawFunctionArgs>(
      {
        functionABI: poolsWithdrawFunctionEthABI,
        contractAddress: tornadoCashPool1ETH,
        options: {
          functionArgs: true
        },
      }
    );
    getTornadoCash1WithdrawTransactions.forEach((transaction) => {
      if(transaction?.args?._recipient) {
        ethWithdrawers[transaction.args._recipient] = getNewBalance(transaction.args._recipient, 1);
      }
    });

    // Get all 10ETH Withdraws on Tornado Cash
    const getTornadoCash10WithdrawTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<poolsWithdrawFunctionArgs>(
      {
        functionABI: poolsWithdrawFunctionEthABI,
        contractAddress: tornadoCashPool10ETH,
        options: {
          functionArgs: true
        },
      }
    );
    getTornadoCash10WithdrawTransactions.forEach((transaction) => {
      if(transaction?.args?._recipient) {
        ethWithdrawers[transaction.args._recipient] = getNewBalance(transaction.args._recipient, 10);
      }
    });

    // Get all 100ETH Withdraws on Tornado Cash
    const getTornadoCash100WithdrawTransactions =
    await bigQueryProvider.getAllTransactionsForSpecificMethod<poolsWithdrawFunctionArgs>(
      {
        functionABI: poolsWithdrawFunctionEthABI,
        contractAddress: tornadoCashPool100ETH,
        options: {
          functionArgs: true
        },
      }
    );
    getTornadoCash100WithdrawTransactions.forEach((transaction) => {
      if(transaction?.args?._recipient) {
        ethWithdrawers[transaction.args._recipient] = getNewBalance(transaction.args._recipient, 100);
      }
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