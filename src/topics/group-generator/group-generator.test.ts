import "reflect-metadata";
import { getMemoryContainer } from "../../infrastructure";
import { createContext } from "../generation-context";
import TestGroupGenerator from "./test-group-generator";
import { GroupGenerator } from "./group-generator";

describe("test group generator", () => {
  test("Should generate a group with the generator", async () => {
    const generationContext = await createContext({ blockNumber: 123456789 });
    await getMemoryContainer()
      .resolve(TestGroupGenerator)
      .generate(generationContext);
  });

  test("Should throw error when generate function not defined", async () => {
    const generationContext = await createContext({ blockNumber: 123456789 });
    await expect(async () => {
      await getMemoryContainer()
        .resolve(GroupGenerator)
        .generate(generationContext);
    }).rejects.toThrow();
  });
});
