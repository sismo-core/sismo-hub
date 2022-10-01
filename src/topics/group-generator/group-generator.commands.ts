/* istanbul ignore file */

import { Option } from "commander";
import { groupGenerators } from "@group-generators/generators";
import { DataSourcesCmd, GlobalOptions } from "cli/command";
import { GroupGeneratorService } from "topics/group-generator";

type GenerateGroupOptions = Pick<
  GlobalOptions,
  "groupStore" | "groupGeneratorStore" | "logger"
> & {
  timestamp?: number;
  blockNumber?: number;
  additionalData?: string;
  firstGenerationOnly?: boolean;
};

type GenerateAllGroupsOptions = Pick<
  GlobalOptions,
  "groupStore" | "groupGeneratorStore" | "logger"
> & {
  frequency?: string;
  timestamp?: number;
  blockNumber?: number;
  additionalData?: string;
  firstGenerationOnly?: boolean;
};

export const generateGroup = async (
  generatorName: string,
  {
    groupStore,
    groupGeneratorStore,
    logger,
    timestamp,
    blockNumber,
    additionalData,
    firstGenerationOnly,
  }: GenerateGroupOptions
): Promise<void> => {
  const service = new GroupGeneratorService({
    groupGenerators,
    groupStore,
    groupGeneratorStore,
    logger,
  });
  await service.generateGroups(generatorName, {
    timestamp,
    blockNumber,
    additionalData: additionalData
      ? GroupGeneratorService.parseAdditionalData(additionalData)
      : undefined,
    firstGenerationOnly,
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
    "--first-generation-only <yes|no>",
    "Generate the group only if it has not been generated yet"
  )
    .env("SH_FIRST_GENERATION_ONLY")
    .argParser((value) => value === "yes")
);
generateGroupCmd.addOption(
  new Option(
    "--additional-data <additional-data>",
    "Add additional data in generated groups. Multiple addresses must be seperated by a coma. " +
      "If no value is set, it defaults to 1." +
      "eg: `0x123,0x456=2`"
  ).env("SH_ADDITIONAL_DATA")
);
generateGroupCmd.action(generateGroup);

export const generateAllGroups = async ({
  groupStore,
  groupGeneratorStore,
  logger,
  frequency,
  timestamp,
  blockNumber,
  additionalData,
  firstGenerationOnly,
}: GenerateAllGroupsOptions): Promise<void> => {
  const service = new GroupGeneratorService({
    groupGenerators,
    groupStore,
    groupGeneratorStore,
    logger,
  });
  await service.generateAllGroups({
    frequency,
    timestamp,
    blockNumber,
    additionalData: additionalData
      ? GroupGeneratorService.parseAdditionalData(additionalData)
      : undefined,
    firstGenerationOnly,
  });
};

export const generateAllGroupsCmd = new DataSourcesCmd("generate-all-groups");
generateAllGroupsCmd.addOption(
  new Option(
    "--frequency <frequency>",
    "Generate groups with the chosen generationFrequency" + "e.g: `daily`"
  ).env("SH_GENERATE_GROUPS_FREQUENCY")
);
generateAllGroupsCmd.addOption(
  new Option(
    "--timestamp <number>",
    "Use custom timestamp for generation"
  ).argParser(parseInt)
);
generateAllGroupsCmd.addOption(
  new Option(
    "--block-number <number>",
    "Use custom block number for generation"
  ).argParser(parseInt)
);
generateAllGroupsCmd.addOption(
  new Option(
    "--additional-data <additional-data>",
    "Add additional data in generated groups. Multiple addresses must be seperated by a coma. " +
      "If no value is set, it defaults to 1." +
      "eg: `0x123,0x456=2`"
  ).env("SH_ADDITIONAL_DATA")
);
generateAllGroupsCmd.addOption(
  new Option(
    "--first-generation-only <yes|no>",
    "Generate the group only if it has not been generated yet"
  )
    .env("SH_FIRST_GENERATION_ONLY")
    .argParser((value) => value === "yes")
);
generateAllGroupsCmd.action(generateAllGroups);
