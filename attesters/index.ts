import * as fs from "node:fs/promises";
import { ConstructAttesterFn } from "../src/topics/attester/types";

export const getNetworkAttester = async (
  networkName: string,
  attesterName: string
): Promise<ConstructAttesterFn | undefined> => {
  try {
    return (await import(`./${networkName}/${attesterName}`))?.default;
  } catch (e) {
    console.error(
      `Unable to find the attester ${attesterName} for network ${networkName}`
    );
  }
};

export const getNetworkAttesters = async (
  networkName: string,
  attesters: string[]
): Promise<Array<ConstructAttesterFn | undefined>> => {
  return Promise.all(
    attesters.map(async (attesterName) => {
      return getNetworkAttester(networkName, attesterName);
    })
  );
};

export const getNetworkAllAttesters = async (
  networkName: string
): Promise<Array<ConstructAttesterFn | undefined>> => {
  const attesters = await fs.readdir(`./attesters/${networkName}`);

  return getNetworkAttesters(networkName, attesters);
};

export const getAllAttesters = async () => {
  const attesters = await import("./");

  console.log(attesters);
};
