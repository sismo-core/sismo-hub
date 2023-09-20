import { BigNumber } from "ethers";
import { dataOperators } from "@group-generators/helpers/data-operators";
import { UnionOption } from "@group-generators/helpers/data-operators/union";
import {BigQueryProvider} from "@group-generators/helpers/data-providers/big-query/big-query";
import {
  ValueType,
  FetchedData,
  GroupWithData,
  AccountSource,
  Tags,
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

    // stand with crypto nft address
    const contractAddress = "0x9D90669665607F08005CAe4A7098143f554c59EF";

    // ##################
    // # GET PURCHASERS #
    // ##################

    const purchaseFunctionABI =
      "function purchase(uint256 quantity)";
    type purchaseFunctionArgs = {
      quantity: string;
    };

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

    for (const transactions of getPurchaseTransactions) {
      if(purchasers[transactions.from]) {
        purchasers[transactions.from] = BigNumber.from(purchasers[transactions.from]).add(BigNumber.from(transactions.args?.quantity)).toString();
      }
      else {
        purchasers[transactions.from] = BigNumber.from(transactions.args?.quantity).toString();
      }
    }

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

    for (const transactions of getPurchasePresaleTransactions) {
      if(presalePurchasers[transactions.from]) {
        presalePurchasers[transactions.from] = BigNumber.from(presalePurchasers[transactions.from]).add(BigNumber.from(transactions.args?.quantity)).toString();
      }
      else {
        presalePurchasers[transactions.from] = BigNumber.from(transactions.args?.quantity).toString();
      }
    }

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

    for (const transaction of getAdminMintAirdropTransactions) {
      if(transaction.args?.recipients) {
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

    let allPurchasers = {};

    allPurchasers = dataOperators.Union([purchasers, presalePurchasers, adminMinters, adminAirdropMinters], UnionOption.Sum);

    return [
      {
        name: "stand-with-crypto-nft-minters",
        timestamp: context.timestamp,
        description: "Data Group of all \"Stand With Crypto\" NFT minters",
        specs: "Contains all \"Stand With Crypto\" NFT minters: https://zora.co/collect/eth:0x9d90669665607f08005cae4a7098143f554c59ef. Value for each group member is the number of NFT minted",
        data: allPurchasers,
        accountSources: [AccountSource.ETHEREUM],
        valueType: ValueType.Score,
        tags: [Tags.Maintained, Tags.Maintained],
      },
    ];
  },
};

export default generator;
