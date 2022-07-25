import { container, DependencyContainer, Lifecycle } from "tsyringe";
import { GroupStore } from "../topics/group";
import { LocalGroupStore, MemoryGroupStore } from "./group-store";

container.register<GroupStore>("GroupStore", {
  useValue: new LocalGroupStore(),
});

const memoryContainer = container.createChildContainer();
memoryContainer.register<GroupStore>(
  "GroupStore",
  {
    useClass: MemoryGroupStore,
  },
  { lifecycle: Lifecycle.Singleton }
);

const testLocalContainer = container.createChildContainer();
testLocalContainer.register<GroupStore>("GroupStore", {
  useFactory: () => {
    const groupStore = new LocalGroupStore("tests-group-store");
    groupStore.reset();
    return groupStore;
  },
});

export const getLocalContainer = (): DependencyContainer => container;
export const getMemoryContainer = (): DependencyContainer => memoryContainer;
export const getTestLocalContainer = (): DependencyContainer =>
  testLocalContainer;
