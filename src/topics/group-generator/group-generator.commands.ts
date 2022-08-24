/* istanbul ignore file */

import { Option } from "commander";
import { groupGenerators } from "@group-generators/generators";
import { DataSourcesCmd, GlobalOptions } from "cli/command";
import { GroupGeneratorService } from "topics/group-generator";

type GenerateGroupOptions = Pick<GlobalOptions, "groupStore"> & {
  timestamp?: number;
  blockNumber?: number;
};

export const generateGroup = async (
  generatorName: string,
  { groupStore, timestamp, blockNumber }: GenerateGroupOptions
): Promise<void> => {
  const service = new GroupGeneratorService({ groupGenerators, groupStore });
  await service.generateGroups(generatorName, { timestamp, blockNumber });
};

export const generateGroupCmd = new DataSourcesCmd("generate-group");
generateGroupCmd.arguments("generator-name");
generateGroupCmd.addOption(
  new Option(
    "--timestamp <number>",
    "Use custom timestamp for generation"
  ).argParser(parseInt)
);
generateGroupCmd.addOption(
  new Option(
    "--block-number <number>",
    "Use custom block number for generation"
  ).argParser(parseInt)
);
generateGroupCmd.action(generateGroup);
