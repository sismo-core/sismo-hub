import { FastifyReply } from "fastify";

export const notFoundResponse = (reply: FastifyReply, message: string): void => {
  reply.code(404);
  reply.send({
    message,
  });
};
