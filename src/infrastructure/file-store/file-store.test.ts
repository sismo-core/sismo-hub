import Fastify, { FastifyInstance } from "fastify";
import request from "supertest";
import { LocalFileStore, MemoryFileStore } from ".";
import { FileStoreApi } from "file-store";

const getApi = async (store: FileStoreApi): Promise<FastifyInstance> => {
  const api = Fastify({ logger: false });
  api.register(store.registerRoutes());
  await api.ready();
  return api;
};

describe("test file store", () => {
  const localFileStore = new LocalFileStore("tests-file-store");
  const memoryFileStore = new MemoryFileStore("tests-file-store");
  const testCases: [[LocalFileStore], [MemoryFileStore]] = [
    [localFileStore],
    [memoryFileStore],
  ];

  beforeEach(async () => {
    localFileStore.reset();
    memoryFileStore.reset();
  });

  it.each(testCases)("Should store a file and retrieve", async (store) => {
    await store.write("test_file", "test_data");
    expect(await store.read("test_file")).toBe("test_data");
  });

  it.each(testCases)("Should return true for existing file", async (store) => {
    await store.write("test_file", "test_data");
    expect(await store.exists("test_file")).toBeTruthy();
  });

  it.each(testCases)(
    "Should return false for not existing file",
    async (store) => {
      expect(await store.exists("test_file")).toBeFalsy();
    }
  );

  it.each(testCases)(
    "Should throw an error while reading not existing file",
    async (store) => {
      await expect(async () => {
        await store.read("not_existing_file");
      }).rejects.toThrow();
    }
  );

  it.each(testCases)("Should have a valid url", async (store) => {
    expect(store.url("test_file")).toBe(
      "/file-store/tests-file-store/test_file"
    );
  });

  it.each(testCases)(
    "should return 404 while retrieving not existing file",
    async (store) => {
      const api = await getApi(store);
      const response = await request(api.server).get(
        "/file-store/tests-file-store/test_file"
      );
      expect(response.status).toBe(404);
    }
  );

  it.each(testCases)("Should store a file and delete it", async (store) => {
    await store.write("test_file1", { "0x1": 1 });
    expect(await store.exists("test_file1")).toBe(true);
    await store.delete("test_file1");
    expect(await store.exists("test_file1")).toBe(false);
  });

  it.each(testCases)("should return valid file", async (store) => {
    await store.write("sub_directory/test_file", { test: "test_data" });
    const api = await getApi(store);
    const response = await request(api.server).get(
      "/file-store/tests-file-store/sub_directory/test_file"
    );
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ test: "test_data" });
  });
});
