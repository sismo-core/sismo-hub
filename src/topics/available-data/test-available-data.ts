import { Network } from "topics/attester";
import { AvailableData } from "topics/available-data";

export const testAvailableData: { [name: string]: AvailableData } = {
  attester1_0: {
    attesterName: "attester1",
    network: Network.Test,
    timestamp: 1,
    identifier: "0x10",
    isOnChain: true,
    transactionHash: "0x1000",
  },
  attester1_1: {
    attesterName: "attester1",
    network: Network.Test,
    timestamp: 2,
    identifier: "0x11",
    isOnChain: false,
  },
  attester1_2: {
    attesterName: "attester1",
    network: Network.Local,
    timestamp: 3,
    identifier: "0x12",
    isOnChain: true,
    transactionHash: "0x1001",
  },
  attester2_0: {
    attesterName: "attester2",
    network: Network.Test,
    timestamp: 3,
    identifier: "0x21",
    isOnChain: false,
  },
};
