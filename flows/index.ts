import { curatedFlows } from "./curated";
import { localFlows } from "./local";
import { playgroundFlows } from "./playground";
import { stagingFlows } from "./staging";
import { Flow } from "topics/flow";

export enum FlowType {
  Curated = "curated",
  Playground = "playground",
  Local = "local",
  Staging = "staging",
}

export const flows: { [flowName in FlowType]: Flow[] } = {
  [FlowType.Curated]: curatedFlows,
  [FlowType.Playground]: playgroundFlows,
  [FlowType.Local]: localFlows,
  [FlowType.Staging]: stagingFlows,
};
