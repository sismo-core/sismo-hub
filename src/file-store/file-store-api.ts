import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { FileStore } from "./file-store";

type FileStoreApiQuery = FastifyRequest<{
  Params: {
    "*": string;
  };
}>;

export abstract class FileStoreApi extends FileStore {
  public url(filename: string) {
    return `/file-store/${this.prefix}/${filename}`;
  }

  async readFromUrl(url: string): Promise<any> {
    return this.read(url.substring(`/file-store/${this.prefix}/`.length));
  }

  public registerRoutes() {
    return async (fastify: FastifyInstance) => {
      fastify.get(
        `/file-store/${this.prefix}/*`,
        async (req: FileStoreApiQuery, res: FastifyReply) => {
          const filename = req.params["*"];
          if (!(await this.exists(filename))) {
            res.status(404).send({
              error: "File not found",
            });
          }
          return await this.read(filename);
        }
      );
    };
  }
}
