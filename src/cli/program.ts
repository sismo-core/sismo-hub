import { Command } from "commander";
import { apiCmd } from "api";
import { computeAttesterCmd } from "topics/attester/attester.commands";
import { generateGroupCmd } from "topics/group-generator/group-generator.commands";

export const program = new Command();

program.addCommand(apiCmd);
program.addCommand(generateGroupCmd);
program.addCommand(computeAttesterCmd);
