import {
  CommonConfiguration,
  ConfigurationDefault,
  createConfiguration,
} from ".";
import { ApiService } from "api";
import { FileStore } from "file-store";
import { AttesterService, AttestersLibrary } from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import { BadgeService } from "topics/badge";
import { Flow, FlowService } from "topics/flow";
import { GroupStore } from "topics/group";
import {
  GroupGeneratorService,
  GroupGeneratorsLibrary,
} from "topics/group-generator";

export class ServiceFactory {
  attesters: AttestersLibrary;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStore;
  flows: Flow[];
  groupStore: GroupStore;
  groupGenerators: GroupGeneratorsLibrary;

  constructor(configuration: CommonConfiguration) {
    this.attesters = configuration.attesters;
    this.availableDataStore = configuration.availableDataStore;
    this.availableGroupStore = configuration.availableGroupStore;
    this.flows = configuration.flows;
    this.groupStore = configuration.groupStore;
    this.groupGenerators = configuration.groupGenerators;
  }

  public getApiService(log?: boolean, staticPrefix?: string): ApiService {
    return new ApiService({
      attesterService: this.getAttesterService(),
      badgeService: this.getBadgeService(),
      flowService: this.getFlowService(),
      groupGeneratorService: this.getGroupGeneratorsService(),
      availableDataStore: this.availableDataStore,
      availableGroupStore: this.availableGroupStore,
      groupStore: this.groupStore,
      log: log,
      staticPrefix: staticPrefix,
    });
  }

  public getAttesterService(): AttesterService {
    return new AttesterService({
      attesters: this.attesters,
      availableDataStore: this.availableDataStore,
      availableGroupStore: this.availableGroupStore,
      groupStore: this.groupStore,
    });
  }

  public getBadgeService(): BadgeService {
    return new BadgeService(this.attesters);
  }

  public getFlowService(): FlowService {
    return new FlowService(this.flows);
  }

  public getGroupGeneratorsService(): GroupGeneratorService {
    return new GroupGeneratorService({
      groupGenerators: this.groupGenerators,
      groupStore: this.groupStore,
    });
  }

  public static withDefault(
    type: ConfigurationDefault,
    configuration: Partial<CommonConfiguration>
  ): ServiceFactory {
    return new ServiceFactory(createConfiguration(type, configuration));
  }
}
