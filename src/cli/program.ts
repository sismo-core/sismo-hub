import { Command } from "commander";
import { apiCmd, openApiCmd } from "api/api.commands";
import { migrateGroupsCmd } from "migration/migrate-groups-dynamodb-10172022.commands";
import { computeAttesterCmd } from "topics/attester/attester.commands";
import {
  generateAllGroupsCmd,
  generateGroupCmd,
} from "topics/group-generator/group-generator.commands";

export const program = new Command();

program.addCommand(apiCmd);
program.addCommand(openApiCmd);
program.addCommand(generateGroupCmd);
program.addCommand(generateAllGroupsCmd);
program.addCommand(computeAttesterCmd);
program.addCommand(migrateGroupsCmd);
