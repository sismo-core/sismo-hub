import { S3FileStore } from "infrastructure/file-store/s3-file-store";
import { defaultLocalS3Options } from "infrastructure/file-store/s3-file-store-local-options";

describe("test S3 file store", () => {
  const fileStore = new S3FileStore("tests-file-store", defaultLocalS3Options);

  beforeEach(async () => {
    await fileStore.reset();
  });

  it("Should store a file and read it", async () => {
    await fileStore.write("test_file1", { "0x1": 1 });

    expect(await fileStore.exists("test_file1")).toBe(true);

    const data = await fileStore.read("test_file1");
    expect(data).toEqual({ "0x1": 1 });
  });

  it("Should throw if the file does not exist", async () => {
    await expect(fileStore.read("test_file3")).rejects.toThrow(
      "The specified key does not exist."
    );
  });

  it("Should store a file and get its url", async () => {
    await fileStore.write("test_file1", { "0x1": 1 });

    expect(await fileStore.url("test_file1")).toBe(
      "http://127.0.0.1:9002/local/tests-file-store/test_file1"
    );
  });
});
