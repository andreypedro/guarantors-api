import { Router } from "express";
import { validateAddressController } from "../controllers/validateAddressController";

const router = Router();

// POST method to validate addresses
router.post("/validate-address", validateAddressController);

export default router;
