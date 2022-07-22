import { FastifyInstance, FastifyRequest } from "fastify";
import { GroupSearch, ValueType, Tags } from "./group.types";
import { Group } from "./group";

type GroupRequestType = FastifyRequest<{
  Querystring: {
    groupName?: string;
    latest?: boolean;
  };
}>;

type GroupAPIType = {
  name: string;
  timestamp: number;
  valueType: ValueType;
  tags: Tags[];
  dataUrl: string;
};

const serialize = (group: Group): GroupAPIType => {
  return {
    name: group.name,
    timestamp: group.timestamp,
    valueType: group.valueType,
    tags: group.tags,
    dataUrl: group.dataUrl(),
  };
};

const routes = async (fastify: FastifyInstance) => {
  fastify.get("/groups", async (request: GroupRequestType, reply) => {
    const query = request.query;
    if (!query.groupName) {
      reply.code(400).send({
        error: "invalidRequest",
        message: "groupName is required",
      });
      return;
    }
    const groupSearch: GroupSearch = {
      groupName: query.groupName,
      latest: query.latest,
    };
    return {
      items: (await Group.store.search(groupSearch)).map((group) =>
        serialize(group)
      ),
    };
  });

  fastify.get("/groups/latests", async () => {
    const groups = await Group.store.latests();
    const items: { [groupName: string]: GroupAPIType } = {};
    for (const groupName in groups) {
      items[groupName] = serialize(groups[groupName]);
    }
    return {
      items: items,
    };
  });
};

export default routes;
