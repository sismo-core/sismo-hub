import { Option } from "commander";
import { DataSourcesCmd, GlobalOptions } from "cli/command";
import { getCurrentBlockNumber } from "helpers";
import { GenerationContext } from "topics/group-generator";

type GenerateGroupOptions = GlobalOptions & {
  timestamp?: number;
  blockNumber?: number;
};

export const generateGroup = async (
  generatorName: string,
  {
    groupStore,
    timestamp,
    blockNumber,
    groupGeneratorLibrary,
  }: GenerateGroupOptions
): Promise<void> => {
  const context = await createContext({ timestamp, blockNumber });
  const generator = (await groupGeneratorLibrary).create(
    generatorName,
    groupStore
  );
  const groups = await generator.generate(context);
  for (const group of groups) {
    await groupStore.save(group);
  }
};

type CreateContextType = {
  timestamp?: number;
  blockNumber?: number;
};

export const createContext = async ({
  timestamp,
  blockNumber,
}: CreateContextType): Promise<GenerationContext> => ({
  timestamp: timestamp ?? Math.floor(Date.now() / 1000),
  blockNumber: blockNumber ?? (await getCurrentBlockNumber()),
});

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
