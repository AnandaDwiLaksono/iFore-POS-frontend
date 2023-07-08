export const API_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://ifore-api.up.railway.app'
    : 'http://localhost:3002';
