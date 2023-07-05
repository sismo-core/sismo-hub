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
  updateGroupMetadataCmd,
} from "topics/group-generator/group-generator.commands";
import { indexGroupCmd } from "topics/group-indexer/group-indexer.commands";
import { makeGroupsAvailableCmd } from "topics/registry-tree/registry-tree.commands";

export const program = new Command();

program.addCommand(apiCmd);
program.addCommand(openApiCmd);
program.addCommand(generateGroupCmd);
program.addCommand(generateAllGroupsCmd);
program.addCommand(indexGroupCmd);
program.addCommand(makeGroupsAvailableCmd);
program.addCommand(generateAttestationsRegistryCreateAttributesTxCmd);
program.addCommand(generateAttestationsRegistrySetAttributesTxCmd);
program.addCommand(updateGroupMetadataCmd);
program.addCommand(deleteGroupCmd);
