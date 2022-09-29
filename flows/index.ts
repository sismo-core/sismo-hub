import { liveFlows } from "./live";
import { localFlows } from "./local";
import { playgroundFlows } from "./playground";
import { stagingFlows } from "./staging";
import { Flow } from "topics/flow";

export enum FlowType {
  Live = "live",
  Playground = "playground",
  Local = "local",
  Staging = "staging",
}

export const flows: { [flowName in FlowType]: Flow[] } = {
  [FlowType.Live]: liveFlows,
  [FlowType.Playground]: playgroundFlows,
  [FlowType.Local]: localFlows,
  [FlowType.Staging]: stagingFlows,
};
