import { FileStoreApi } from "file-store";
import { ClassLibrary } from "helpers";
import { Attester } from "topics/attester";
import { AvailableDataStore } from "topics/available-data";
import { GroupStore } from "topics/group";
import { GroupGenerator } from "topics/group-generator";

export type CommonConfiguration = {
  attesterLibrary: ClassLibrary<Attester>;
  availableDataStore: AvailableDataStore;
  availableGroupStore: FileStoreApi;
  groupStore: GroupStore;
  groupGenerators: { [name: string]: GroupGenerator };
  staticPrefix: string;
};
