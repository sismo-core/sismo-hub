import { localFlows } from "./local-flows";
import { prodFlows } from "./prod-flows";
import { Flow } from "topics/flow";

export enum FlowType {
  Prod = "prod",
  Local = "local",
}

export const flows: { [flowName in FlowType]: Flow[] } = {
  [FlowType.Prod]: prodFlows,
  [FlowType.Local]: localFlows,
};
