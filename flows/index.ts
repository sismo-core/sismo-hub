import { localFlows } from "./local";
import { mainFlows } from "./main";
import { playgroundFlows } from "./playground";
import { stagingFlows } from "./staging";
import { Flow } from "topics/flow";

export enum FlowType {
  Main = "main",
  Playground = "playground",
  Local = "local",
  Staging = "staging",
}

export const flows: { [flowName in FlowType]: Flow[] } = {
  [FlowType.Main]: mainFlows,
  [FlowType.Playground]: playgroundFlows,
  [FlowType.Local]: localFlows,
  [FlowType.Staging]: stagingFlows,
};
