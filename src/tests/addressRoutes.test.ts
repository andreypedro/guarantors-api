import request from 'supertest';
import app from '../app';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('POST /validate-address', () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({
            data: [
                {
                    address: {
                        road: 'Main St',
                        house_number: '123',
                        city: 'Mulberry Grove',
                        state: 'IL',
                        postcode: '62701',
                    },
                    display_name: '123 Main St, Mulberry Grove, IL',
                },
            ],
        });
    });

    it('should return a valid address structure for a valid input', async () => {
        const response = await request(app)
            .post('/validate-address')
            .send({ address: '123 Main St, Mulberry Grove, IL' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('street', 'Main St');
        expect(response.body).toHaveProperty('number', '123');
        expect(response.body).toHaveProperty('city', 'Mulberry Grove');
        expect(response.body).toHaveProperty('state', 'IL');
        expect(response.body).toHaveProperty('zip', '62701');
        expect(response.body.status).toBe('valid');
    });

    it('should return 400 for invalid input', async () => {
        const response = await request(app)
            .post('/validate-address')
            .send({ address: 123 });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Address must be provided as a string');
    });

    it('should handle unverifiable addresses gracefully', async () => {
        mockedAxios.get.mockResolvedValue({ data: [] });

        const response = await request(app)
            .post('/validate-address')
            .send({ address: 'Unverifiable Address' });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('unverifiable');
    });
});
