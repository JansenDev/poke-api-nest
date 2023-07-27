// 1. AGREGAR CONFIG*
// 2. AGREGAR VALIDATION*
// ->3. AGREGAR CONSTANTE (OPCIONAL)
export const configDefaultValues = () => ({
  DB: {
    MONGO: {
      URI: 'mongodb://127.0.0.1:27017/nest-pokemon',
    },
  },
  APP: {
    PORT: 3000,
    CORS: {
      ORIGIN: '*',
      ALLOWEDHEADERS: '*',
    },
  },
  CONSTANTS: {
    PAGINATION: {
      LIMIT: 5,
    },
  },
  TZ: 'America/Lima',
});
