import { container, DependencyContainer, Lifecycle } from "tsyringe";
import GroupStore from "../topics/group/group.store";
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

export const getLocalContainer = (): DependencyContainer => container;
export const getMemoryContainer = (): DependencyContainer => memoryContainer;
