# Guarantors API

## Overview

This API validates and standardizes property addresses. It exposes a single endpoint:

### Endpoint

`POST /validate-address`

### Input

```json
{
  "address": "123 Main St, Mountain View, IL"
}
```

### Output

```json
{
  "street": "Main St",
  "number": "123",
  "city": "Mountain View",
  "state": "IL",
  "zip": "62701",
  "status": "valid",
  "originalInput": "123 Main St, Mountain View, IL"
}
```

- **status**: Indicates whether the address is `valid`, `corrected`, or `unverifiable`.

## Thought Process

1. **Design**: Focused on clean code, clear error handling, and modular structure.
2. **Address Validation**: Used Nominatim (OpenStreetMap) API to validate and standardize addresses.
3. **Edge Cases**: Handled partial addresses, typos, and unverifiable inputs gracefully.

## Tools Used

- **Node.js**: Backend runtime.
- **Express**: Web framework.
- **Axios**: HTTP client for API requests.
- **TypeScript**: Type-safe development.
- **Nominatim API**: External address validation.
- **AI Assistance**: Used AI prompts to aid in writing tests, documenting, fixing code, and improving best practices.

## How to Run Locally

### Prerequisites

- Node.js installed.
- NPM installed.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/andreypedro/guarantors-api
   cd guarantors-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Test the endpoint using a tool like Postman or Curl:
   ```bash
   curl -X POST http://localhost:3000/validate-address -H "Content-Type: application/json" -d '{"address": "1600 Amphitheatre Parkway, Mountain View, CA"}'
   ```

## Running Tests

To run the tests for the `/validate-address` endpoint, use the following command:

```bash
npm run test
```

### Example Output

The tests include:

- Validating a correct address structure.
- Handling invalid input gracefully.
- Managing unverifiable addresses.

The tests use mocked responses from the Nominatim API to ensure consistent results without relying on external services.
