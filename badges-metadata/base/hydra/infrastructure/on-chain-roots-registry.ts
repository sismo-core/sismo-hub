import { Contract, ethers, providers, Signer } from "ethers";
import { IRootsRegistry } from "@badges-metadata/base/hydra";
import { Network } from "topics/registry-tree";
import { getSigner } from "topics/registry-tree/signers";

interface RootsRegistryContract extends Contract {
  registerRootForAttester: (
    attesterAddress: string,
    root: string,
    { gasLimit }?: { gasLimit?: number }
  ) => Promise<providers.TransactionResponse>;
  unregisterRootForAttester: (
    attesterAddress: string,
    root: string,
    { gasLimit }?: { gasLimit?: number }
  ) => Promise<providers.TransactionResponse>;
  isRootAvailableForAttester: (
    attesterAddress: string,
    root: string
  ) => Promise<boolean>;
  registerRoot: (
    root: string,
    { gasLimit }?: { gasLimit?: number }
  ) => Promise<providers.TransactionResponse>;
  unregisterRoot: (
    root: string,
    { gasLimit }?: { gasLimit?: number }
  ) => Promise<providers.TransactionResponse>;
  isRootAvailable: (
    root: string
  ) => Promise<boolean>;
}

export class OnChainRootsRegistry implements IRootsRegistry {
  network: Network;
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
    
    const tx = this.attesterAddress ? await contract.registerRootForAttester(
      this.attesterAddress,
      root,
    ) : await contract.registerRoot(root);
    await tx.wait();
    return tx.hash;
  }

  async unregister(root: string): Promise<string> {
    const contract = await this.contract;
    const tx = this.attesterAddress ? await contract.unregisterRootForAttester(
      this.attesterAddress,
      root
    ) : await contract.unregisterRoot(root);
    await tx.wait();
    return tx.hash;
  }

  async isAvailable(root: string): Promise<boolean> {
    const contract = await this.contract;
    return this.attesterAddress ? contract.isRootAvailableForAttester(this.attesterAddress, root) : contract.isRootAvailable(root);
  }

  private async _getContract(): Promise<RootsRegistryContract> {
    return new ethers.Contract(
      this.rootsRegistryAddress,
      [
        "function registerRootForAttester(address attester, uint256 root) external",
        "function registerRoot(uint256 root) external",
        "function unregisterRootForAttester(address attester, uint256 root) external",
        "function unregisterRoot(uint256 root) external",
        "function isRootAvailableForAttester(address attester, uint256 root) external view returns (bool)",
        "function isRootAvailable(uint256 root) external view returns (bool)",
        "event RegisteredRootForAttester(address attester, uint256 root)",
        "event RegisteredRoot(uint256 root)",
        "event UnregisteredRootForAttester(address attester, uint256 root)",
        "event UnregisteredRoot(uint256 root)",
      ],
      await this._getSigner()
    ) as RootsRegistryContract;
  }

  /* istanbul ignore next  */
  protected async _getSigner(): Promise<Signer> {
    return getSigner(this.network);
  }
}
