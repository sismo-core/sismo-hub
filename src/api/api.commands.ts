/* istanbul ignore file */
import "@fastify/swagger";
import { Command, Option } from "commander";
import { DataSourcesCmd, GlobalOptions } from "cli/command";
import { ConfigurationDefault, ServiceFactory } from "service-factory";

export type ApiOptions = Pick<
  GlobalOptions,
  "availableDataStore" | "availableGroupStore" | "flows" | "groupStore"
> & {
  staticUrl?: string;
};

type ApiStartOptions = ApiOptions & {
  port: number;
};

export const startApi = async ({
  availableDataStore,
  availableGroupStore,
  flows,
  groupStore,
  staticUrl,
  port,
}: ApiStartOptions): Promise<void> => {
  const apiService = ServiceFactory.withDefault(ConfigurationDefault.Local, {
    availableDataStore,
    availableGroupStore,
    flows,
    groupStore,
  }).getApiService(true, staticUrl);
  await apiService.start(port);
};

const addCommonOptions = (cmd: DataSourcesCmd) => {
  cmd.addOption(
    new Option(
      "--static-url <string>",
      "Static URL. If set, static assets won't be served by this API."
    ).env("DS_STATIC_URL")
  );
};

export const apiCmd = new DataSourcesCmd("api");
addCommonOptions(apiCmd);
apiCmd.addOption(
  new Option("--port <number>", "Listen to specific port")
    .default(8000)
    .argParser(parseInt)
);

apiCmd.action(startApi);

export const lambdaApiCmd = new DataSourcesCmd("api");
addCommonOptions(lambdaApiCmd);

// eslint-disable-next-line @typescript-eslint/no-empty-function
lambdaApiCmd.action(() => {});

export const openApiCmd = new Command("generate-openapi");
openApiCmd.action(async () => {
  const apiService = ServiceFactory.withDefault(
    ConfigurationDefault.Local,
    {}
  ).getApiService(false);
  console.log(JSON.stringify(await apiService.getOpenApiSchema()));
});
