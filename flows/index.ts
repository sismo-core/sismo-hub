import { localFlows } from "./local";
import { mainFlows } from "./main";
import { stagingFlows } from "./staging";
import { Flow } from "topics/flow";

export enum FlowType {
  Main = "main",
  Local = "local",
  Staging = "staging",
}

export const flows: { [flowName in FlowType]: Flow[] } = {
  [FlowType.Main]: mainFlows,
  [FlowType.Local]: localFlows,
  [FlowType.Staging]: stagingFlows,
};
