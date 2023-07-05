import { SismoHubCmd } from "cli/command";

export const indexGroup = async (groupName: string): Promise<void> => {
  console.log(`indexing group ${groupName}`);
};

export const indexGroupCmd = new SismoHubCmd("index-group");
indexGroupCmd.arguments("group-name");
indexGroupCmd.action(indexGroup);
