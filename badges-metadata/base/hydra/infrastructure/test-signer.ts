import { ethers, Signer } from "ethers";
import { provider } from "ganache";

export const MEMORY_ATTESTER_ADDRESS =
  "0x4e7A051E8DCb7651Bbd1b682dF41b525f48B83FF";
export const MEMORY_ROOTS_REGISTRY_ADDRESS =
  "0x347fFe3C2F756FE0b36a52e49AB48E85a37e6e06";

/*
contract AvailableRootsRegistry {
  mapping(address => mapping(uint256 => bool)) public _roots;

  event RegisteredRootForAttester(address attester, uint256 root);
  event UnregisteredRootForAttester(address attester, uint256 root);

  constructor() {}

  function registerRootForAttester(address attester, uint256 root) external {
    _roots[attester][root] = true;
    emit RegisteredRootForAttester(attester, root);
  }

  function unregisterRootForAttester(address attester, uint256 root) external {
    _roots[attester][root] = false;
    emit UnregisteredRootForAttester(attester, root);
  }

  function isRootAvailableForAttester(address attester, uint256 root) external view returns (bool) {
    return _roots[attester][root];
  }
}
*/

export const mockRootsRegistryBytesCodeContract =
  "0x608060405234801561001057600080fd5b50610220806100206000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80632f56be56146100515780634e473f8f1461006657806380b404ce146100b1578063ebea45cb146100dc575b600080fd5b61006461005f3660046101b2565b6100ef565b005b61009d6100743660046101b2565b6001600160a01b0391909116600090815260208181526040808320938352929052205460ff1690565b604051901515815260200160405180910390f35b61009d6100bf3660046101b2565b600060208181529281526040808220909352908152205460ff1681565b6100646100ea3660046101b2565b610156565b6001600160a01b038216600081815260208181526040808320858452825291829020805460ff19166001179055815192835282018390527f21cdff046578afe71b78f95ac4891306af3a9b9eb71e2f0ef380b35b487d2f1291015b60405180910390a15050565b6001600160a01b038216600081815260208181526040808320858452825291829020805460ff19169055815192835282018390527fba8195cc62a4086b7cd93d22db90e43ae42d8b5febd8c66b3453771e455b7a33910161014a565b600080604083850312156101c557600080fd5b82356001600160a01b03811681146101dc57600080fd5b94602093909301359350505056fea2646970667358221220d96b73aa20aa97a51b4e974972d67b92b6df597b3f7dc858452b124502d9583d64736f6c634300080e0033";

export const getTestSigner = async (): Promise<Signer> => {
  const signer = new ethers.providers.Web3Provider(
    provider({
      wallet: {
        // sismo shared mnemonic for deterministic signers
        seed: "analyst decade album recall stem run cage ozone human pepper once insect",
      },
      logging: {
        quiet: true,
      },
    }) as unknown as ethers.providers.ExternalProvider
  ).getSigner(0);
  await new ethers.ContractFactory(
    [],
    mockRootsRegistryBytesCodeContract,
    signer
  ).deploy();
  return signer;
};
