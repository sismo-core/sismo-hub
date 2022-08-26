import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "defender-relay-client/lib/ethers";
import { Contract, ethers, providers, Signer } from "ethers";
import { IRootsRegistry } from "@attestations-collections/base/hydra-s1";
import { Network } from "topics/attester";

interface RootsRegistryContract extends Contract {
  registerRootForAttester: (
    attesterAddress: string,
    root: string
  ) => Promise<providers.TransactionResponse>;
  unregisterRootForAttester: (
    attesterAddress: string,
    root: string
  ) => Promise<providers.TransactionResponse>;
  isRootAvailableForAttester: (
    attesterAddress: string,
    root: string
  ) => Promise<boolean>;
}

export class OnChainRootsRegistry implements IRootsRegistry {
  network: string;
  attesterAddress: string;
  rootsRegistryAddress: string;
  private readonly contract: Promise<RootsRegistryContract>;

  constructor(
    network: Network,
    attesterAddress: string,
    rootsRegistryAddress: string
  ) {
    this.network = network;
    this.attesterAddress = attesterAddress;
    this.rootsRegistryAddress = rootsRegistryAddress;
    this.contract = this._getContract();
  }

  async register(root: string): Promise<string> {
    const contract = await this.contract;
    const tx = await contract.registerRootForAttester(
      this.attesterAddress,
      root
    );
    await tx.wait();
    return tx.hash;
  }

  async unregister(root: string): Promise<string> {
    const contract = await this.contract;
    const tx = await contract.unregisterRootForAttester(
      this.attesterAddress,
      root
    );
    await tx.wait();
    return tx.hash;
  }

  async isAvailable(root: string): Promise<boolean> {
    const contract = await this.contract;
    return contract.isRootAvailableForAttester(this.attesterAddress, root);
  }

  private async _getContract(): Promise<RootsRegistryContract> {
    return new ethers.Contract(
      this.rootsRegistryAddress,
      [
        "function registerRootForAttester(address attester, uint256 root) external",
        "function unregisterRootForAttester(address attester, uint256 root) external",
        "function isRootAvailableForAttester(address attester, uint256 root) external view returns (bool)",
        "event RegisteredRootForAttester(address attester, uint256 root)",
        "event UnregisteredRootForAttester(address attester, uint256 root)",
      ],
      await this._getSigner()
    ) as RootsRegistryContract;
  }

  /* istanbul ignore next  */
  protected async _getSigner(): Promise<Signer> {
    return this.network == Network.Local
      ? this._getLocalSigner()
      : this._getRelayedSigner();
  }

  /* istanbul ignore next  */
  private async _getLocalSigner(): Promise<Signer> {
    return new ethers.providers.JsonRpcProvider(
      "http://localhost:8545"
    ).getSigner(
      // address owner local
      "0xb01ee322C4f028B8A6BFcD2a5d48107dc5bC99EC"
    );
  }

  /* istanbul ignore next  */
  private async _getRelayedSigner(): Promise<Signer> {
    const { DS_RELAY_DEFENDER_API_KEY, DS_RELAY_DEFENDER_API_SECRET } =
      process.env;
    if (!DS_RELAY_DEFENDER_API_KEY || !DS_RELAY_DEFENDER_API_SECRET) {
      throw new Error(
        "DS_RELAY_DEFENDER_API_KEY or DS_RELAY_DEFENDER_API_SECRET env variables missing."
      );
    }
    const credentials = {
      apiKey: DS_RELAY_DEFENDER_API_KEY,
      apiSecret: DS_RELAY_DEFENDER_API_SECRET,
    };
    return new DefenderRelaySigner(
      credentials,
      new DefenderRelayProvider(credentials),
      { speed: "fast" }
    );
  }
}
