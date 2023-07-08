/* istanbul ignore file */

import { Option } from "commander";
import { groupGenerators } from "@group-generators/generators";
import { SismoHubCmd, GlobalOptions } from "cli/command";
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

type UpdateGroupsMetadataOptions = Pick<
  GlobalOptions,
  "groupStore" | "groupSnapshotStore" | "groupGeneratorStore" | "logger"
>;

type DeleteGroupOptions = Pick<
  GlobalOptions,
  "groupStore" | "groupSnapshotStore" | "groupGeneratorStore" | "logger"
>;

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

  // Some generators may have active handles that prevent the process from exiting
  // Calling process.exit(0) will force the process to exit
  // E.g: TelegramResolver uses a TelegramClient that takes 1 minute to close
  process.exit(0);
};

export const generateGroupCmd = new SismoHubCmd("generate-group");
generateGroupCmd.arguments("generator-name");
generateGroupCmd.addOption(
  new Option("--timestamp <number>", "Use custom timestamp for generation").argParser(parseInt)
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

export const generateAllGroupsCmd = new SismoHubCmd("generate-all-groups");
generateAllGroupsCmd.addOption(
  new Option(
    "--frequency <frequency>",
    "Generate groups with the chosen generationFrequency" + "e.g: `daily`"
  ).env("SH_GENERATE_GROUPS_FREQUENCY")
);
generateAllGroupsCmd.addOption(
  new Option("--timestamp <number>", "Use custom timestamp for generation").argParser(parseInt)
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

export const updateGroupsMetadata = async (
  generatorNames: string,
  { groupStore, groupSnapshotStore, groupGeneratorStore, logger }: UpdateGroupsMetadataOptions
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
  await service.updateGroupsMetadata(generatorNames);
};

export const updateGroupsMetadataCmd = new SismoHubCmd("update-groups-metadata");
updateGroupsMetadataCmd.arguments("generator-names");
updateGroupsMetadataCmd.action(updateGroupsMetadata);

export const deleteGroups = async (
  groupNames: string,
  { groupStore, groupSnapshotStore, groupGeneratorStore, logger }: DeleteGroupOptions
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
  await service.deleteGroups(groupNames);
};

export const deleteGroupCmd = new SismoHubCmd("delete-groups");
deleteGroupCmd.arguments("group-names");
deleteGroupCmd.action(deleteGroups);
