import { FastifyInstance, FastifyRequest } from "fastify";
import { Group, GroupStore, GroupSearch, ValueType, Tags } from "./";

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

const serialize = (groupStore: GroupStore, group: Group): GroupAPIType => {
  return {
    name: group.name,
    timestamp: group.timestamp,
    valueType: group.valueType,
    tags: group.tags,
    dataUrl: groupStore.dataUrl(group),
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
      items: (await fastify.services.groupStore.search(groupSearch)).map(
        (group) => serialize(fastify.services.groupStore, group)
      ),
    };
  });

  fastify.get("/groups/latests", async () => {
    const groups = await fastify.services.groupStore.latests();
    const items: { [groupName: string]: GroupAPIType } = {};
    for (const groupName in groups) {
      items[groupName] = serialize(
        fastify.services.groupStore,
        groups[groupName]
      );
    }
    return {
      items: items,
    };
  });
};

export default routes;
