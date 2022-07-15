import FileStore from "../file-store";
import GroupStore from "../topics/group/group.store";
import localInfrastructureServices from "./local-infrastructure";

export type InfrastructureServices = {
  groupDataStore: FileStore;
  groupStore: GroupStore;
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
