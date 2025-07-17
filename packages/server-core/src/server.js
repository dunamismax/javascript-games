import Fastify from 'fastify';
import { Server } from 'socket.io';

export function createServer(options = {}) {
  const fastify = Fastify({
    logger: options.logger || true,
    ...options.fastifyOptions,
  });

  const io = new Server(fastify.server, {
    cors: {
      origin: options.corsOrigin || 'http://localhost:3000',
      methods: ['GET', 'POST'],
    },
    ...options.socketOptions,
  });

  fastify.register(async function (fastify) {
    await fastify.register(import('@fastify/static'), {
      root: options.staticPath || process.cwd(),
      prefix: '/',
    });

    fastify.get('/health', async (request, reply) => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    });

    fastify.get('/api/status', async (request, reply) => {
      return {
        status: 'running',
        connectedClients: io.engine.clientsCount,
        timestamp: new Date().toISOString(),
      };
    });
  });

  return { fastify, io };
}

export async function startServer(server, port = 3000, host = '0.0.0.0') {
  try {
    await server.listen({ port, host });
    console.log(`Server running at http://${host}:${port}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

export function setupGracefulShutdown(server) {
  const gracefulShutdown = async signal => {
    console.log(`Received ${signal}, shutting down gracefully...`);

    try {
      await server.close();
      console.log('Server closed successfully');
      process.exit(0);
    } catch (err) {
      console.error('Error during shutdown:', err);
      process.exit(1);
    }
  };

  process.on('SIGTERM', gracefulShutdown);
  process.on('SIGINT', gracefulShutdown);
}
