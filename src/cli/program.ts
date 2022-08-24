import { Command } from "commander";
import { apiCmd, openApiCmd } from "api/api.commands";
import { computeAttesterCmd } from "topics/attester/attester.commands";
import { generateGroupCmd } from "topics/group-generator/group-generator.commands";

export const program = new Command();

program.addCommand(apiCmd);
program.addCommand(openApiCmd);
program.addCommand(generateGroupCmd);
program.addCommand(computeAttesterCmd);
