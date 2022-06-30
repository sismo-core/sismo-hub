import { FetchedData } from "../group";
import { DataStoreReference } from "../../../src/utils/data/store-data";

export type AvailableGroupConstructor<T> = {
  id?: string;
  data?: AvailableGroupData;
  properties?: T;
};

export type AvailableGroupData = {
  content?: FetchedData;
  storeReference?: DataStoreReference;
};
