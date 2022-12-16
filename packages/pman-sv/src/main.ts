import * as express from 'express';
import { logger, httpLogger } from './services/logger';
import cfg from './config';
import router from './router';

const app = express();
app.use(express.json());
// app.use(express.urlencoded());
// app.use(httpLogger);
const errHandler = (
  err: Error,
  _req: express.Request,
  res: express.Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: express.NextFunction
) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
};

app.use(router);
const server = app.listen(cfg.server.port, () => {
  logger.info(`Listening at http://localhost:${cfg.server.port}/api`);
});

app.use(errHandler);

server.on('error', logger.error);

process.on('uncaughtExceptionMonitor', (err) => {
  logger.error(`Uncaught error ${err}`);
});
