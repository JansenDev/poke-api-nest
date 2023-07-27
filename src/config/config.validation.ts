import * as Joi from 'joi';
import { configDefaultValues } from './config.constants';
// 1. AGREGAR CONFIG*
// ->2. AGREGAR VALIDATION*
// 3. AGREGAR CONSTANTE (OPCIONAL)
const { string, number } = Joi.types();
const valueDefault = configDefaultValues();

export const configSchema = Joi.object({
  DB_MONGO_URI: string.default(valueDefault.DB.MONGO.URI),
  APP_PORT: number.default(valueDefault.APP.PORT),
  APP_CORS_ORIGIN: string.default(valueDefault.APP.CORS.ORIGIN),
  APP_CORS_ALLOWEDHEADERS: string.default(valueDefault.APP.CORS.ALLOWEDHEADERS),
  TZ: string.default(valueDefault.TZ),
  CONSTANTS_PAGINATION_LIMIT: string.default(
    valueDefault.CONSTANTS.PAGINATION.LIMIT,
  ),
});
