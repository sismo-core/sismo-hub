/* istanbul ignore file */

import "@fastify/swagger";
import { Command, Option } from "commander";
import { ApiConfigurationDefault, ApiService } from "./api";
import { DataSourcesCmd, GlobalOptions } from "cli/command";

type ApiOptions = Pick<
  GlobalOptions,
  "availableDataStore" | "availableGroupStore" | "groupStore"
> & {
  port: number;
  staticUrl?: string;
};

export const startApi = async ({
  availableDataStore,
  availableGroupStore,
  groupStore,
  staticUrl,
  port,
}: ApiOptions): Promise<void> => {
  const apiService = ApiService.fromDefault(ApiConfigurationDefault.Local, {
    availableDataStore,
    availableGroupStore,
    groupStore,
    ...(staticUrl ? { staticPrefix: staticUrl } : {}),
  });
  await apiService.start(port);
};

export const apiCmd = new DataSourcesCmd("api");
apiCmd.addOption(
  new Option("--port <number>", "Listen to specific port")
    .default(8000)
    .argParser(parseInt)
);
apiCmd.addOption(
  new Option(
    "--static-url <string>",
    "Static URL. If set, static assets won't be served by this API."
  )
);
apiCmd.action(startApi);

export const lambdaApiCmd = new DataSourcesCmd("api");
lambdaApiCmd.addOption(
  new Option(
    "--static-url <string>",
    "Static URL. If set, static assets won't be served by this API."
  )
);
// eslint-disable-next-line @typescript-eslint/no-empty-function
lambdaApiCmd.action(() => {});

export const openApiCmd = new Command("generate-openapi");
openApiCmd.action(async () => {
  const apiService = ApiService.fromDefault(ApiConfigurationDefault.Local);
  console.log(JSON.stringify(apiService.getOpenApiSchema()));
});
