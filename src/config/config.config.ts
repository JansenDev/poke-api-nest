export const configs = () => ({
  DB: {
    MONGO: {
      URI: process.env.DB_MONGO_URI || 'DB_MONGO_URI',
    },
  },
  APP: {
    PORT: process.env.APP_PORT || 'APP_PORT',
    CORS: {
      ORIGIN: process.env.APP_CORS_ORIGIN || '*',
      ALLOWEDHEADERS: process.env.APP_CORS_ALLOWEDHEADERS || '*',
    },
    TZ: process.env.TZ || 'America/Lima',
  },
});
