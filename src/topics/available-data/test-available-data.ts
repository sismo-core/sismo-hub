import { AvailableData } from "topics/available-data";
import { Network } from "topics/registry-tree";

export const testAvailableData: { [name: string]: AvailableData } = {
  attester1_0: {
    registryTreeName: "attester1",
    network: Network.Test,
    timestamp: 1,
    identifier: "0x10",
    isOnChain: true,
    transactionHash: "0x1000",
  },
  attester1_1: {
    registryTreeName: "attester1",
    network: Network.Test,
    timestamp: 2,
    identifier: "0x11",
    isOnChain: false,
  },
  attester1_2: {
    registryTreeName: "attester1",
    network: Network.Local,
    timestamp: 3,
    identifier: "0x12",
    isOnChain: true,
    transactionHash: "0x1001",
  },
  attester2_0: {
    registryTreeName: "attester2",
    network: Network.Test,
    timestamp: 3,
    identifier: "0x21",
    isOnChain: false,
  },
};
