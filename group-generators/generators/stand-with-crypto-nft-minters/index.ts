import { BigNumber } from "ethers";
import { dataOperators } from "@group-generators/helpers/data-operators";
import { UnionOption } from "@group-generators/helpers/data-operators/union";
import {BigQueryProvider} from "@group-generators/helpers/data-providers/big-query/big-query";
import {
  ValueType,
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

    // ##################
    // # GET PURCHASERS #
    // ##################

    const purchaseFunctionABI =
      "function purchase(uint256 quantity)";
    type purchaseFunctionArgs = {
      quantity: string;
    };

    // stand with crypto nft address
    const contractAddress = "0x9D90669665607F08005CAe4A7098143f554c59EF";
    const getPurchaseTransactions =
      await bigQueryProvider.getAllTransactionsForSpecificMethod<purchaseFunctionArgs>(
        {
          functionABI: purchaseFunctionABI,
          contractAddress,
          options: {
            functionArgs: true,
          }
        }
      );

    const purchasers: FetchedData = {};

    // console.log(getPurchaseTransactions);

    let count = BigNumber.from(0);

    // Sum the transactions for same address
    for (const transactions of getPurchaseTransactions) {
      console.log(transactions.args)
      // console.log(transactions.args?[0])
      count = BigNumber.from(count).add(BigNumber.from(transactions.args?.quantity));
      if(purchasers[transactions.from]) {
        purchasers[transactions.from] = BigNumber.from(purchasers[transactions.from]).add(BigNumber.from(transactions.args?.quantity)).toString();
      }
      else {
        purchasers[transactions.from] = BigNumber.from(transactions.args?.quantity).toString();
      }
    }

    console.log("Count:");
    console.log(BigNumber.from(count).toString());

    // display the sum of all the values of the addresses of data
    console.log(Object.values(purchasers).reduce((a, b) => BigNumber.from(a).add(BigNumber.from(b)).toString()));

    console.log(getPurchaseTransactions.length);


    // ##########################
    // # GET PRESALE PURCHASERS #
    // ##########################

    const purchasePresaleFunctionABI = "function purchasePresale(uint256 quantity, uint256 maxQuantity, uint256 pricePerToken, bytes32[] calldata merkleProof) external payable returns (uint256)";
    type purchasePresaleFunctionArgs = {
      quantity: string;
      maxQuantity: string;
      pricePerToken: string;
      merkleProof: string[];
    };

    const getPurchasePresaleTransactions =
      await bigQueryProvider.getAllTransactionsForSpecificMethod<purchasePresaleFunctionArgs>(
        {
          functionABI: purchasePresaleFunctionABI,
          contractAddress,
          options: {
            functionArgs: true,
          }
        }
      );

    const presalePurchasers: FetchedData = {};

    // Sum the transactions for same address
    for (const transactions of getPurchasePresaleTransactions) {
      if(presalePurchasers[transactions.from]) {
        presalePurchasers[transactions.from] = BigNumber.from(presalePurchasers[transactions.from]).add(BigNumber.from(transactions.args?.quantity)).toString();
      }
      else {
        presalePurchasers[transactions.from] = BigNumber.from(transactions.args?.quantity).toString();
      }
    }

    console.log(presalePurchasers);

    // ##################
    // # GET ADMIN MINT #
    // ##################

    const adminMintFunctionABI = "function adminMint(address recipient, uint256 quantity)";
    type adminMintFunctionArgs = {
      recipient: string;
      quantity: string;
    };

    const getAdminMintTransactions =
      await bigQueryProvider.getAllTransactionsForSpecificMethod<adminMintFunctionArgs>(
        {
          functionABI: adminMintFunctionABI,
          contractAddress,
          options: {
            functionArgs: true,
          }
        }
      );

    const adminMinters: FetchedData = {};

    // Sum the transactions for same address
    for (const transaction of getAdminMintTransactions) {
      if(transaction.args?.recipient) {
        if(adminMinters[transaction.args?.recipient]) {
          adminMinters[transaction.args?.recipient] = BigNumber.from(adminMinters[transaction.args?.recipient]).add(BigNumber.from(transaction.args?.quantity)).toString();
        }
        else {
          adminMinters[transaction.args?.recipient] = BigNumber.from(transaction.args?.quantity).toString();
        }
      }
    }

    console.log("adminMinters");
    console.log(adminMinters);

    // ##########################
    // # GET ADMIN AIRDROP MINT #
    // ##########################

    const adminMintAirdropFunctionABI = "function adminMintAirdrop(address[] calldata recipients)";
    type adminMintAirdropFunctionArgs = {
      recipients: string[];
    };

    const getAdminMintAirdropTransactions =
      await bigQueryProvider.getAllTransactionsForSpecificMethod<adminMintAirdropFunctionArgs>(
        {
          functionABI: adminMintAirdropFunctionABI,
          contractAddress,
          options: {
            functionArgs: true,
          }
        }
      );

    const adminAirdropMinters: FetchedData = {};

    // Sum the transactions for same address
    for (const transaction of getAdminMintAirdropTransactions) {
      if(transaction.args?.recipients) {
        // loop on recipients and add the quantity to the address
        for (const recipient of transaction.args.recipients) {
          if(adminAirdropMinters[recipient]) {
            adminAirdropMinters[recipient] = BigNumber.from(adminAirdropMinters[recipient]).add(BigNumber.from(1)).toString();
          }
          else {
            adminAirdropMinters[recipient] = BigNumber.from(1).toString();
          }
        }
      }
    }

    console.log("adminAirdropMinters");
    console.log(adminAirdropMinters);

    let allPurchasers = {};

    // // display the sum of all the values of the addresses of purchasesPresale
    // if(Object.keys(presalePurchasers).length > 0) {
    //   allPurchasers = dataOperators.Union([purchasers, presalePurchasers, adminMinters, adminAirdropMinters], UnionOption.Sum);
    // }
    // else {
    //   allPurchasers = purchasers;
    // }

    allPurchasers = dataOperators.Union([purchasers, presalePurchasers, adminMinters, adminAirdropMinters], UnionOption.Sum);

    console.log(Object.values(allPurchasers).reduce((a, b) => BigNumber.from(a).add(BigNumber.from(b)).toString()));

    return [
      {
        name: "stand-with-crypto-nft-minters",
        timestamp: context.timestamp,
        description: "Minters of the \"Stand With Crypto\" NFT, initiative lead by coinbase: https://zora.co/collect/eth:0x9d90669665607f08005cae4a7098143f554c59ef",
        specs: "",
        data: allPurchasers,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [],
      },
    ];
  },
};

export default generator;
