/* istanbul ignore file */

import { Option } from "commander";
import { groupGenerators } from "@group-generators/generators";
import { DataSourcesCmd, GlobalOptions } from "cli/command";
import { GroupGeneratorService } from "topics/group-generator";
import { GlobalResolver } from "topics/resolver/global-resolver";

type GenerateGroupOptions = Pick<
  GlobalOptions,
  "groupStore" | "groupSnapshotStore" | "groupGeneratorStore" | "logger"
> & {
  timestamp?: number;
  additionalData?: string;
  lastGenerationTimeInterval?: number;
  firstGenerationOnly?: boolean;
};

type GenerateAllGroupsOptions = Pick<
  GlobalOptions,
  "groupStore" | "groupSnapshotStore" | "groupGeneratorStore" | "logger"
> & {
  frequency?: string;
  timestamp?: number;
  additionalData?: string;
  lastGenerationTimeInterval?: number;
  firstGenerationOnly?: boolean;
};

export const generateGroup = async (
  generatorName: string,
  {
    groupStore,
    groupSnapshotStore,
    groupGeneratorStore,
    logger,
    timestamp,
    additionalData,
    lastGenerationTimeInterval,
    firstGenerationOnly,
  }: GenerateGroupOptions
): Promise<void> => {
  const globalResolver = new GlobalResolver();
  const service = new GroupGeneratorService({
    groupGenerators,
    groupStore,
    groupSnapshotStore,
    groupGeneratorStore,
    globalResolver,
    logger,
  });
  await service.generateGroups(generatorName, {
    timestamp,
    additionalData: additionalData
      ? GroupGeneratorService.parseAdditionalData(additionalData)
      : undefined,
    lastGenerationTimeInterval,
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
generateGroupCmd.addOption(
  new Option(
    "--last-generation-time-interval <number>",
    "Prevent generating groups if the last generation was less than the given number of seconds ago"
  )
    .env("SH_LAST_GENERATION_TIME_INTERVAL")
    .argParser(parseInt)
);
generateGroupCmd.action(generateGroup);

export const generateAllGroups = async ({
  groupStore,
  groupSnapshotStore,
  groupGeneratorStore,
  logger,
  frequency,
  timestamp,
  additionalData,
  lastGenerationTimeInterval,
  firstGenerationOnly,
}: GenerateAllGroupsOptions): Promise<void> => {
  const globalResolver = new GlobalResolver();
  const service = new GroupGeneratorService({
    groupGenerators,
    groupStore,
    groupSnapshotStore,
    groupGeneratorStore,
    globalResolver,
    logger,
  });
  await service.generateAllGroups({
    frequency,
    timestamp,
    additionalData: additionalData
      ? GroupGeneratorService.parseAdditionalData(additionalData)
      : undefined,
    lastGenerationTimeInterval,
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
generateAllGroupsCmd.addOption(
  new Option(
    "--last-generation-time-interval <number>",
    "Prevent generating groups if the last generation was less than the given number of seconds ago"
  )
    .env("SH_LAST_GENERATION_TIME_INTERVAL")
    .argParser(parseInt)
);
generateAllGroupsCmd.action(generateAllGroups);
