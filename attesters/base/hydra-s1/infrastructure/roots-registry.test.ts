import {
  MEMORY_ATTESTER_ADDRESS,
  MEMORY_ROOTS_REGISTRY_ADDRESS,
} from "./test-signer";
import { MemoryRootsRegistry, OnChainRootsRegistry } from ".";
import { IRootsRegistry } from "@attesters/base/hydra-s1";
import { Network } from "topics/attester";

type RegistryGetter = () => IRootsRegistry;

describe("test memory roots registry", () => {
  const testCases: [RegistryGetter[], RegistryGetter[]] = [
    [() => new MemoryRootsRegistry()],
    [
      () =>
        new OnChainRootsRegistry(
          Network.Test,
          MEMORY_ATTESTER_ADDRESS,
          MEMORY_ROOTS_REGISTRY_ADDRESS
        ),
    ],
  ];

  it.each(testCases)("should not be available", async (registryGetter) => {
    expect(await registryGetter().isAvailable("0x0")).toEqual(false);
  });

  it.each(testCases)(
    "should register root and be available",
    async (registryGetter) => {
      const registry = registryGetter();
      await registry.register("0x0");
      expect(await registry.isAvailable("0x0")).toEqual(true);
    }
  );

  it.each(testCases)(
    "should register multiple roots and be available",
    async (registryGetter) => {
      const registry = registryGetter();
      await registry.register("0x0");
      await registry.register("0x1");
      expect(await registry.isAvailable("0x0")).toEqual(true);
      expect(await registry.isAvailable("0x1")).toEqual(true);
    }
  );

  it.each(testCases)(
    "should register/unregister root and not be available",
    async (registryGetter) => {
      const registry = registryGetter();
      await registry.register("0x0");
      await registry.unregister("0x0");
      expect(await registry.isAvailable("0x0")).toEqual(false);
    }
  );
});
