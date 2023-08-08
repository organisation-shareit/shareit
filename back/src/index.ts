import { getContainer } from '@container/index';
import { buildAgnosticReads, buildAgnosticWrites } from '@infrastructure/http/agnostic';
import { buildFastifyServer } from '@infrastructure/http/fastify';

(async () => {
  const dependencies = getContainer();

  const agnosticReads = buildAgnosticReads(dependencies);
  const agnosticWrites = buildAgnosticWrites(dependencies);

  const fastifyServer = buildFastifyServer({
    ...dependencies,
    agnosticReads,
    agnosticWrites,
  });

  const port = Number(process.env.PORT || 8081);
  const host = process.env.ADDRESS || '127.0.0.1';

  fastifyServer.listen({ port, host }, (err, address) => {
    if (err) {
      dependencies.logger.error('FASTIFY SERVER', 'Server exit with error', { err });
      process.exit(1);
    }
    dependencies.logger.info('FASTIFY SERVER', `Server listening at ${address}`, {});
  });
})();
