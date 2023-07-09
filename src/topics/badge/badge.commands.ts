/* istanbul ignore file */

import { Option } from "commander";
import { formatBytes32String } from "ethers/lib/utils";
import { SismoHubCmd, GlobalOptions } from "cli/command";
import { abiEncode, computeSolidityFunctionSignature } from "helpers/solidity-helpers";
import { ConfigurationDefaultEnv, createConfiguration, ServiceFactory } from "service-factory";
import {
  BadgeAttribute,
  badgeAttributeIndexes,
  BadgeAttributeValue,
  badgeAttributeValues,
} from "topics/badge/badge-attributes";
import { Network } from "topics/registry-tree/networks";

type AttestationsRegistrySetAttributeTransactionArgs = {
  collectionIds: number[];
  attributesIndexes: number[];
  attributesValues: number[];
};

type AttestationsRegistryCreateAttributesTransactionArgs = {
  badgeAttributeIndexes: number[];
  attributesNames: string[];
};

export const generateAttestationsRegistryCreateAttributesTx = async (
  attributesIndexes: string
): Promise<{
  calldata: string;
  args: AttestationsRegistryCreateAttributesTransactionArgs;
}> => {
  const parsedAttributesIndexes = attributesIndexes
    .split(",")
    .map((attributeIndex) => parseInt(attributeIndex));

  const attributesNames = Object.keys(badgeAttributeIndexes);

  const attributesNamesFiltered = attributesNames
    .filter((attributeName) => {
      return parsedAttributesIndexes.includes(badgeAttributeIndexes[attributeName]);
    })
    .map((attributeName) => {
      return formatBytes32String(attributeName);
    });

  if (attributesNamesFiltered.length !== parsedAttributesIndexes.length) {
    throw new Error(
      "You are trying to create an attribute that does not exist in the Sismo Hub. Please check the list of available attributes in https://github.com/sismo-core/sismo-hub/blob/main/src/topics/badge/badge-attributes.ts."
    );
  }

  const calldataWithoutFunctionSignature = abiEncode(
    ["uint8[]", "bytes32[]"],
    [parsedAttributesIndexes, attributesNamesFiltered]
  );

  return {
    args: {
      badgeAttributeIndexes: parsedAttributesIndexes,
      attributesNames: attributesNamesFiltered,
    },
    calldata:
      computeSolidityFunctionSignature("createNewAttributes(uint8[],bytes32[])") +
      calldataWithoutFunctionSignature.slice(2),
  };
};

export const generateAttestationsRegistryCreateAttributesTxCmd = new SismoHubCmd(
  "generate-attestations-registry-create-attributes-tx"
);
generateAttestationsRegistryCreateAttributesTxCmd.arguments("attributesIndexes");

generateAttestationsRegistryCreateAttributesTxCmd.action(
  async (attributesIndexes: string, options: GlobalOptions) => {
    const { calldata, args } = await generateAttestationsRegistryCreateAttributesTx(
      attributesIndexes
    );
    options.logger.info("Etherscan args for creating attributes: ", {
      ...args,
    });
    options.logger.info("\ncalldata for creating attributes: ", calldata);
  }
);

export const generateAttestationsRegistrySetAttributeArgs = async (
  network: Network,
  collectionId: number
): Promise<AttestationsRegistrySetAttributeTransactionArgs> => {
  const badgeService = new ServiceFactory(
    createConfiguration(ConfigurationDefaultEnv.Prod, {})
  ).getBadgeService();

  const badgesCollection = badgeService.badgesCollections
    .filter((collection) => collection.collectionIdFirst <= collectionId)
    .slice(-1)[0];

  const badge = badgesCollection.badges.filter(
    (badge) => badge.internalCollectionId === collectionId - badgesCollection.collectionIdFirst
  )[0];

  if (!badge) {
    throw new Error(
      `Badge with collectionId ${collectionId} not found in the ${ConfigurationDefaultEnv.Prod} environment`
    );
  }

  if (!badge.networks.includes(network)) {
    throw new Error(
      `Badge with collectionId ${collectionId} is not available on the ${network} network in the ${ConfigurationDefaultEnv.Prod} environment`
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

  if (attributesIndexes.length === 0 || attributesValues.length === 0) {
    throw new Error(`Badge with collectionId ${collectionId} does not have any curated attributes`);
  }

  return {
    collectionIds: Array(attributesIndexes.length).fill(collectionId),
    attributesIndexes,
    attributesValues,
  };
};

export const generateAttestationsRegistrySetAttributesTx = async (
  network: Network,
  options: { collectionIds: string }
): Promise<{
  calldata: string;
  args: AttestationsRegistrySetAttributeTransactionArgs;
}> => {
  let args: AttestationsRegistrySetAttributeTransactionArgs = {
    collectionIds: [],
    attributesIndexes: [],
    attributesValues: [],
  };

  let parsedCollectionIds: number[] = [];
  if (options.collectionIds === "all" || !options.collectionIds) {
    const badgeService = new ServiceFactory(
      createConfiguration(ConfigurationDefaultEnv.Prod, {})
    ).getBadgeService();

    for (const collection of badgeService.badgesCollections) {
      if (collection.badges.length === 0) {
        continue;
      }
      parsedCollectionIds.push(
        ...collection.badges
          .filter((badge) => {
            return badge.networks.includes(network) && badge.curatedAttributes;
          })
          .map((badge) => {
            return badge.internalCollectionId + collection.collectionIdFirst;
          })
      );
    }
  } else {
    parsedCollectionIds = options.collectionIds
      .split(",")
      .map((collectionId) => parseInt(collectionId));
  }

  for (const collectionId of parsedCollectionIds) {
    args = {
      collectionIds: [
        ...args.collectionIds,
        ...(await generateAttestationsRegistrySetAttributeArgs(network, collectionId))
          .collectionIds,
      ],
      attributesIndexes: [
        ...args.attributesIndexes,
        ...(await generateAttestationsRegistrySetAttributeArgs(network, collectionId))
          .attributesIndexes,
      ],
      attributesValues: [
        ...args.attributesValues,
        ...(await generateAttestationsRegistrySetAttributeArgs(network, collectionId))
          .attributesValues,
      ],
    };
  }

  const calldataWithoutFunctionSignature = abiEncode(
    ["uint256[]", "uint8[]", "uint8[]"],
    [args.collectionIds, args.attributesIndexes, args.attributesValues]
  );

  return {
    calldata:
      computeSolidityFunctionSignature(
        "setAttributesValuesForAttestationsCollections(uint256[],uint8[],uint8[])"
      ) + calldataWithoutFunctionSignature.slice(2),
    args,
  };
};

export const generateAttestationsRegistrySetAttributesTxCmd = new SismoHubCmd(
  "generate-attestations-registry-set-attributes-tx"
);
generateAttestationsRegistrySetAttributesTxCmd.arguments("network");
generateAttestationsRegistrySetAttributesTxCmd.addOption(
  new Option(
    "--collectionIds <string>",
    "Collection ids of badges we want to set attributes for"
  ).default("all")
);

generateAttestationsRegistrySetAttributesTxCmd.action(
  async (network: Network, options: Pick<GlobalOptions, "logger"> & { collectionIds: string }) => {
    const { calldata, args } = await generateAttestationsRegistrySetAttributesTx(network, options);
    options.logger.info("Etherscan args for setting attributes: ", {
      ...args,
    });
    options.logger.info("\ncalldata for setting attributes: ", calldata);
  }
);
