import { getFastify } from "./app";
import Infrastructure from "../infrastructure";

const PORT = Number(process.env.API_PORT || "8000");

const fastify = getFastify(true, {});

const start = async () => {
  try {
    await fastify.listen({ port: PORT });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  await Infrastructure.init();
};

start().then();
