import Medusa from '@medusajs/js-sdk';

const medusaClient = new Medusa({
  baseUrl: 'http://localhost:9000',
  debug: process.env.NODE_ENV === 'development',
  auth: {
    type: 'session',
  },
  apiKey: 'sk_56f8f58b0ab5c9c9567df090b622b82de5c79e1ff64d426a099a867cdc64467b',
});

export default medusaClient;
