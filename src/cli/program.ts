import { Command } from "commander";
import { apiCmd } from "api";
import { generateGroupCmd } from "topics/group-generator/group-generator.commands";

export const program = new Command();

program.addCommand(generateGroupCmd);
program.addCommand(apiCmd);
