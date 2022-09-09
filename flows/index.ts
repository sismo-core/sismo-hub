import { localFlows } from "./local-flows";
import { polygonFlows } from "./polygon-flows";
import { polygonPlaygroundFlows } from "./polygon-playground-flows";
import { rinkebyFlows } from "./rinkeby-flows";
import { Flow } from "topics/flow";

export enum FlowType {
  Polygon = "polygon",
  PolygonPlayground = "polygon-playground",
  Local = "local",
  Rinkeby = "rinkeby",
}

export const flows: { [flowName in FlowType]: Flow[] } = {
  [FlowType.Polygon]: polygonFlows,
  [FlowType.PolygonPlayground]: polygonPlaygroundFlows,
  [FlowType.Local]: localFlows,
  [FlowType.Rinkeby]: rinkebyFlows,
};
