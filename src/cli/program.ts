import { Command } from "commander";
import { apiCmd, openApiCmd } from "api/api.commands";
import {
  generateAttestationsRegistrySetAttributesTxCmd,
  generateAttestationsRegistryCreateAttributesTxCmd,
} from "topics/badge/badge.commands";
import {
  deleteGroupCmd,
  generateAllGroupsCmd,
  generateGroupCmd,
  updateGroupsMetadataCmd,
} from "topics/group-generator/group-generator.commands";
import { makeGroupsAvailableCmd } from "topics/registry-tree/registry-tree.commands";

export const program = new Command();

program.addCommand(apiCmd);
program.addCommand(openApiCmd);
program.addCommand(generateGroupCmd);
program.addCommand(generateAllGroupsCmd);
program.addCommand(makeGroupsAvailableCmd);
program.addCommand(generateAttestationsRegistryCreateAttributesTxCmd);
program.addCommand(generateAttestationsRegistrySetAttributesTxCmd);
program.addCommand(updateGroupsMetadataCmd);
program.addCommand(deleteGroupCmd);
