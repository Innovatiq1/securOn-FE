export const environment = {
    production: false,
    baseUrl: 'http://localhost:8000',
    apiConfig: {
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        }
    }
};