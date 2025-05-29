import { NextFunction, Request, Response } from 'express';
import { validateAddress } from '../services/addressService';

// controller responsible for validating addresses
export const validateAddressController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { address } = req.body;

    if (!address || typeof address !== 'string') {
        res.status(400).json({ error: 'Address must be provided as a string' });
        return;
    }

    try {

        // calling the service responsible to validating addresses.
        const result = await validateAddress(address);
        res.json(result);
    } catch (error) {
        next(error);
    }
};