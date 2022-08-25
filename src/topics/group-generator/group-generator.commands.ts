/* istanbul ignore file */

import { Option } from "commander";
import { groupGenerators } from "@group-generators/generators";
import { DataSourcesCmd, GlobalOptions } from "cli/command";
import { GroupGeneratorService } from "topics/group-generator";

type GenerateGroupOptions = Pick<GlobalOptions, "groupStore"> & {
  timestamp?: number;
  blockNumber?: number;
  additionalData?: string;
};

export const generateGroup = async (
  generatorName: string,
  { groupStore, timestamp, blockNumber, additionalData }: GenerateGroupOptions
): Promise<void> => {
  const service = new GroupGeneratorService({ groupGenerators, groupStore });
  await service.generateGroups(generatorName, {
    timestamp,
    blockNumber,
    additionalData: additionalData
      ? GroupGeneratorService.parseAdditionalData(additionalData)
      : undefined,
  });
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
generateGroupCmd.addOption(
  new Option(
    "--additional-data <additional-data>",
    "Add additional data in generated groups. Multiple addresses must be seperated by a coma. " +
      "If no value is set, it defaults to 1." +
      "eg: `0x123,0x456=2`"
  ).env("DS_ADDITIONAL_DATA")
);
generateGroupCmd.action(generateGroup);
