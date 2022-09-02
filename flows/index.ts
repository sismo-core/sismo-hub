import { localFlows } from "./local-flows";
import { prodFlows } from "./prod-flows";
import { sandboxFlows } from "./sandbox-flows";
import { Flow } from "topics/flow";

export enum FlowType {
  Prod = "prod",
  Sandbox = "sandbox",
  Local = "local",
}

export const flows: { [flowName in FlowType]: Flow[] } = {
  [FlowType.Prod]: prodFlows,
  [FlowType.Sandbox]: sandboxFlows,
  [FlowType.Local]: localFlows,
};
