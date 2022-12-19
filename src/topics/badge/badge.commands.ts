/* istanbul ignore file */

import { ethers } from "ethers";
import { DataSourcesCmd } from "cli/command";
import {
  ConfigurationDefaultEnv,
  createConfiguration,
  ServiceFactory,
} from "service-factory";
import { Network } from "topics/attester/networks";
import {
  BadgeAttribute,
  badgeAttributeIndexes,
  BadgeAttributeValue,
  badgeAttributeValues,
} from "topics/badge/badge-attributes";

type AttestationsRegistrySetAttributeTransactionArgs = {
  collectionIds: number[];
  attributesIndexes: number[];
  attributesValues: number[];
};

export const generateAttestationsRegistrySetAttributeArgs = async (
  environment: ConfigurationDefaultEnv,
  network: Network,
  collectionId: number
): Promise<AttestationsRegistrySetAttributeTransactionArgs> => {
  const badgeService = new ServiceFactory(
    createConfiguration(environment, {})
  ).getBadgeService();

  const badgesCollection = badgeService.badgesCollections
    .filter((collection) => collection.collectionIdFirst < collectionId)
    .slice(-1)[0];

  const badge = badgesCollection.badges.filter(
    (badge) =>
      badge.internalCollectionId ===
      collectionId - badgesCollection.collectionIdFirst
  )[0];

  if (!badge) {
    throw new Error(
      `Badge with collectionId ${collectionId} not found in the ${environment} environment`
    );
  }

  if (!badge.networks.includes(network)) {
    throw new Error(
      `Badge with collectionId ${collectionId} is not available on the ${network} network in the ${environment} environment`
    );
  }

  const attributesIndexes: number[] = (
    Object.keys(badge.curatedAttributes ?? {}) as Array<BadgeAttribute>
  ).map((key) => {
    return badgeAttributeIndexes[key];
  });

  const attributesValues: number[] = (
    Object.values(badge.curatedAttributes ?? {}) as Array<BadgeAttributeValue>
  ).map((value) => {
    return badgeAttributeValues[value];
  });

  return {
    collectionIds: Array(attributesIndexes.length).fill(collectionId),
    attributesIndexes,
    attributesValues,
  };
};

export const generateAttestationsRegistrySetAttributeTx = async (
  environment: ConfigurationDefaultEnv,
  network: Network,
  collectionIds: string
): Promise<void> => {
  let args: AttestationsRegistrySetAttributeTransactionArgs = {
    collectionIds: [],
    attributesIndexes: [],
    attributesValues: [],
  };

  const parsedCollectionIds = collectionIds
    .split(",")
    .map((collectionId) => parseInt(collectionId));

  for (const collectionId of parsedCollectionIds) {
    args = {
      collectionIds: [
        ...args.collectionIds,
        ...(
          await generateAttestationsRegistrySetAttributeArgs(
            environment,
            network,
            collectionId
          )
        ).collectionIds,
      ],
      attributesIndexes: [
        ...args.attributesIndexes,
        ...(
          await generateAttestationsRegistrySetAttributeArgs(
            environment,
            network,
            collectionId
          )
        ).attributesIndexes,
      ],
      attributesValues: [
        ...args.attributesValues,
        ...(
          await generateAttestationsRegistrySetAttributeArgs(
            environment,
            network,
            collectionId
          )
        ).attributesValues,
      ],
    };
  }

  const etherscanArgs = {
    ...args,
  };

  const calldata = ethers.utils.solidityPack(
    ["uint256[]", "uint256[]", "uint256[]"],
    [args.collectionIds, args.attributesIndexes, args.attributesValues]
  );

  console.log("etherscanArgs:", etherscanArgs);
  console.log("calldata:", calldata);
};

export const generateAttestationsRegistrySetAttributesTxCmd =
  new DataSourcesCmd("generate-attestations-registry-set-attributes-tx");
generateAttestationsRegistrySetAttributesTxCmd.arguments("environment");
generateAttestationsRegistrySetAttributesTxCmd.arguments("network");
generateAttestationsRegistrySetAttributesTxCmd.arguments("collectionId");

generateAttestationsRegistrySetAttributesTxCmd.action(
  generateAttestationsRegistrySetAttributeTx
);
