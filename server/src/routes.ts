import { z } from 'zod';
import { FastifyInstance } from "fastify";

export async function routes(app: FastifyInstance) {
  app.post('/devices', async (request) => {
    const createDevicesBody = z.object({
      unformattedDevices: z.string(),
      lanTemplate: z.string(),
      wirelessTemplate: z.string(),
    });

    return createDevicesBody.parse(request.body);
  });
}