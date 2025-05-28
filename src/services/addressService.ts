import axios from 'axios';
import { IAddress } from '../utils/types';

export async function validateAddress(address: string): Promise<IAddress> {
    const url = 'https://nominatim.openstreetmap.org/search';
    const params = {
        q: address,
        countrycodes: 'us',
        format: 'json',
        addressdetails: 1,
        limit: 1,
    };

    try {
        const response = await axios.get(url, { params, headers: { 'User-Agent': 'guarantors-api/1.0' } });

        const data = response.data;

        if (!Array.isArray(data) || data.length === 0) {
            return {
                status: 'unverifiable',
                originalInput: address,
            };
        }

        const addr = data[0].address || {};
        const structured: IAddress = {
            street: addr.road,
            number: addr.house_number,
            city: addr.city || addr.town || addr.village,
            state: addr.state,
            zip: addr.postcode,
            status: 'valid',
            originalInput: address,
        };

        if (data[0].display_name && data[0].display_name.toLowerCase() !== address.toLowerCase()) {
            structured.status = 'corrected';
            structured.correctedInput = data[0].display_name;
        }

        return structured;
    } catch (error) {
        throw new Error('Failed to validate address');
    }
}