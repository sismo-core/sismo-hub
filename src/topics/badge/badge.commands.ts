/* istanbul ignore file */

import { DataSourcesCmd } from "cli/command";
import { CommonConfiguration } from "service-factory";

type GenerateSetAttributesTx = Pick<CommonConfiguration, "badgesCollections">;

export const generateAttestationsRegistrySetAttributeTx = async (
  network: string,
  { badgesCollections }: GenerateSetAttributesTx
): Promise<void> => {
  console.log("network", network);
  console.log("badgesCollections", badgesCollections);
};

export const generateAttestationsRegistrySetAttributesTxCmd =
  new DataSourcesCmd("generate-attestations-registry-set-attributes-tx");
generateAttestationsRegistrySetAttributesTxCmd.arguments("network");

generateAttestationsRegistrySetAttributesTxCmd.action(
  generateAttestationsRegistrySetAttributeTx
);
