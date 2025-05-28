import { Router } from 'express';
import { validateAddressController } from '../controllers/validateAddressController';

const router = Router();

router.post('/validate-address', validateAddressController);

export default router;