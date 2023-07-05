import { SismoHubCmd } from "cli/command";

export const indexGroup = async (): Promise<void> => {
  console.log("indexing groups...");
};

export const indexGroupCmd = new SismoHubCmd("index-group");
indexGroupCmd.action(indexGroup);