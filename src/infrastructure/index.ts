import localInfrastructureServices from "./local-infrastructure";
import { InfrastructureServices } from "./infrastructure.types";
import { LocalGroupStore } from "./group-store";

export const localInfrastructure: InfrastructureServices = {
  groupStore: new LocalGroupStore(),
};

export default class Infrastructure {
  protected static _services?: InfrastructureServices;

  public static get services(): InfrastructureServices {
    if (!Infrastructure._services) {
      throw Error("Infrastructure services must be init before use!");
    }
    return Infrastructure._services;
  }

  public static async init(
    services?: InfrastructureServices
  ): Promise<InfrastructureServices> {
    if (services) {
      Infrastructure._services = services;
    } else {
      Infrastructure._services = process.env.INFRASTRUCTURE_IMPORT_PATH
        ? (await import(process.env.INFRASTRUCTURE_IMPORT_PATH)).default
        : localInfrastructureServices;
    }
    return Infrastructure.services;
  }

  public static reset() {
    Infrastructure._services = undefined;
  }
}

export * from "./infrastructure.types";
