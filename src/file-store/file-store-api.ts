import { FileStore } from "./file-store";
import { fileStoreSchemas } from "./file-store.api.schema";
import { Api } from "api";
import { notFoundResponse } from "api/api.responses";

export abstract class FileStoreApi extends FileStore {
  public url(filename: string) {
    return `/file-store/${this.prefix}/${filename}`;
  }

  async readFromUrl(url: string): Promise<any> {
    return this.read(url.substring(`/file-store/${this.prefix}/`.length));
  }

  public registerRoutes() {
    return async (api: Api) => {
      api.get(`/file-store/${this.prefix}/*`, { schema: fileStoreSchemas.get }, async (req, res) =>
        (await this.exists(req.params["*"]))
          ? await this.read(req.params["*"])
          : notFoundResponse(res, "File not found")
      );
    };
  }
}
