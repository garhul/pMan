import * as express from "express";
import { join } from 'path';
import cfg from '../config';
const router = express.Router();
import * as PartsController from '../controllers/partsController';

// Public static
router.use('/assets', express.static(join(__dirname, 'assets')));

// Parts controller
router.get('/parts', async (req, res) => {
  res.send(JSON.stringify(await PartsController.getList()));
});

router.get('/parts/:id', async(req, res)=>{
  res.send(JSON.stringify(await PartsController.get(req.params.id)));
});

router.delete('/parts/:id', async (req, res) => {
  // Delete part
    await PartsController.remove(parseInt(req.params.id));
  // Delete associated documents
  
  res.json('ok');
});

router.post('/parts', async (req, res)=> {
  res.json(req.body);
});

// Documents controller

router.get('/docs/', async (req,res) => {
  
});

router.get('/docs/:id', async(req, res) => {
  res.json(req.params);

});




// Misc
router.get('/health', (_req,res) => {
  res.json(Date.now());
});

router.get('/cfg', (_req, res) => {
  res.json(cfg);  
});

router.get('*', (_req, res) => {
  res.status(404);
  res.send('Not here');
});

export default router;