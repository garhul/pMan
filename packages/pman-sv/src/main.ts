import * as express from 'express';
import { logger, httpLogger } from './services/logger';
import cfg from './config';
import router from './router';

const app = express();

app.use(httpLogger);
app.use(router);

const server = app.listen(cfg.server.port, () => {
  console.log(`Listening at http://localhost:${cfg.server.port}/api`);
});


server.on('error', console.error);

process.on('uncaughtExceptionMonitor', (err) => {
  logger.error(err);
});