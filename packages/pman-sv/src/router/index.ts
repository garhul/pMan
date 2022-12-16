import * as express from 'express';
import { join } from 'path';
import { nextTick } from 'process';
import cfg from '../config';
const router = express.Router();
import {
  TagsController,
  PackagesController,
  PartsController,
} from '../controllers/';

import { logger } from '../services/logger';

const exCatcher = (fn) => async (req, res, next) => {
  try {
    fn(req, res).catch((err) => next(err));
  } catch (ex) {
    console.log('y?');
  }
};

const notFoundHandler = (_req: express.Request, res: express.Response) => {
  res.status(404).send('Nope');
};

router.use('/assets', express.static(join(__dirname, 'assets')));

/** Tag ROUTES */
router.get('/tags', exCatcher(TagsController.getList));
router.get('/tags/:id', exCatcher(TagsController.get));
router.post('/tags', exCatcher(TagsController.create));
router.delete('/tags', exCatcher(TagsController.remove));

/** Package routes */
router.get('/packages', exCatcher(PackagesController.getList));
router.get('/packages/:id', exCatcher(PackagesController.get));
router.post('/packages', exCatcher(PackagesController.create));
router.delete('/packages', exCatcher(PackagesController.remove));

/** Part routes */
router.get('/parts', exCatcher(PartsController.getList));
router.get('/parts/:id', exCatcher(PartsController.get));
router.post('/parts', exCatcher(PartsController.create));
router.delete('/parts', exCatcher(PartsController.remove));

/** Document routes */

/** Admin routes */

// Misc
router.get('/cfg', (_req, res) => res.json(cfg));

router.get('*', notFoundHandler);

export default router;
