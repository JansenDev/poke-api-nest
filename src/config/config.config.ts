// ->1. AGREGAR CONFIG*
// 2. AGREGAR VALIDATION*
// 3. AGREGAR CONSTANTE (OPCIONAL)
export const configs = () => ({
  DB: {
    MONGO: {
      URI: process.env.DB_MONGO_URI,
    },
  },
  APP: {
    PORT: process.env.APP_PORT,
    CORS: {
      ORIGIN: process.env.APP_CORS_ORIGIN,
      ALLOWEDHEADERS: process.env.APP_CORS_ALLOWEDHEADERS,
    },
  },
  CONSTANTS: {
    PAGINATION: {
      LIMIT: process.env.CONSTANTS_PAGINATION_LIMIT,
    },
  },
  TZ: process.env.TZ,
});
