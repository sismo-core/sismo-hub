import { FileStoreApi } from "file-store";
import { AttestersLibrary } from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import { GroupStore } from "topics/group";
import { GroupGenerator } from "topics/group-generator";

export type CommonConfiguration = {
  attesters: AttestersLibrary;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStoreApi;
  groupStore: GroupStore;
  groupGenerators: { [name: string]: GroupGenerator };
  staticPrefix: string;
};
