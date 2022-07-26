import { Attester } from "./attester";

/**
 * An object that contains all the attesters for a network.
 * The key is the attester name.
 */
export type NetworkAttesters = {
  [key: string]: Attester;
};

/**
 * An object that contains all the networks and their attesters.
 * The key is the network name.
 */
export type NetworksAttesters = {
  [key: string]: NetworkAttesters;
};
