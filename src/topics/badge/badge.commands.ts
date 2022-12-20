/* istanbul ignore file */

import { formatBytes32String } from "ethers/lib/utils";
import { DataSourcesCmd } from "cli/command";
import {
  abiEncode,
  computeSolidityFunctionSignature,
} from "helpers/solidity-helpers";
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

export const generateAttestationsRegistryCreateAttributesTx = async (
  attributesIndexes: string
): Promise<void> => {
  const parsedAttributesIndexes = attributesIndexes
    .split(",")
    .map((attributeIndex) => parseInt(attributeIndex));

  const attributesNames = Object.keys(badgeAttributeIndexes);

  const attributesNamesFiltered = parsedAttributesIndexes.map(
    (attributeIndex) => {
      return formatBytes32String(attributesNames[attributeIndex]);
    }
  );

  const calldataWithoutFunctionSignature = abiEncode(
    ["uint8[]", "bytes32[]"],
    [parsedAttributesIndexes, attributesNamesFiltered]
  );

  console.log("etherscanArgs for creating attributes:", {
    badgeAttributeIndexes: parsedAttributesIndexes,
    attributesNames: attributesNamesFiltered,
  });

  console.log(
    "\ncalldata for creating attributes: ",
    computeSolidityFunctionSignature("createNewAttributes(uint8[],bytes32[])") +
      calldataWithoutFunctionSignature.slice(2)
  );
};

export const generateAttestationsRegistryCreateAttributesTxCmd =
  new DataSourcesCmd("generate-attestations-registry-create-attributes-tx");
generateAttestationsRegistryCreateAttributesTxCmd.arguments(
  "attributesIndexes"
);

generateAttestationsRegistryCreateAttributesTxCmd.action(
  generateAttestationsRegistryCreateAttributesTx
);

export const generateAttestationsRegistrySetAttributeArgs = async (
  network: Network,
  collectionId: number
): Promise<AttestationsRegistrySetAttributeTransactionArgs> => {
  const badgeService = new ServiceFactory(
    createConfiguration(ConfigurationDefaultEnv.Prod, {})
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
      `Badge with collectionId ${collectionId} not found in the prod environment`
    );
  }

  if (!badge.networks.includes(network)) {
    throw new Error(
      `Badge with collectionId ${collectionId} is not available on the ${network} network in the prod environment`
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
            network,
            collectionId
          )
        ).collectionIds,
      ],
      attributesIndexes: [
        ...args.attributesIndexes,
        ...(
          await generateAttestationsRegistrySetAttributeArgs(
            network,
            collectionId
          )
        ).attributesIndexes,
      ],
      attributesValues: [
        ...args.attributesValues,
        ...(
          await generateAttestationsRegistrySetAttributeArgs(
            network,
            collectionId
          )
        ).attributesValues,
      ],
    };
  }

  const calldataWithoutFunctionSignature = abiEncode(
    ["uint256[]", "uint8[]", "uint8[]"],
    [args.collectionIds, args.attributesIndexes, args.attributesValues]
  );

  console.log("\netherscanArgs for setting attributes:", {
    ...args,
  });
  console.log(
    "\ncalldata for setting attributes: ",
    computeSolidityFunctionSignature(
      "setAttributesValuesForAttestationsCollections(uint256[],uint8[],uint8[])"
    ) + calldataWithoutFunctionSignature.slice(2)
  );
};

export const generateAttestationsRegistrySetAttributesTxCmd =
  new DataSourcesCmd("generate-attestations-registry-set-attributes-tx");
generateAttestationsRegistrySetAttributesTxCmd.arguments("network");
generateAttestationsRegistrySetAttributesTxCmd.arguments("collectionId");

generateAttestationsRegistrySetAttributesTxCmd.action(
  generateAttestationsRegistrySetAttributeTx
);
