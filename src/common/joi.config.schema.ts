import Joi from 'joi';

const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(4000),
  JWT_SECRET_KEY: Joi.string(),
  TYPEORM_CONNECTION: Joi.string(),
  TYPEORM_HOST: Joi.string(),
  TYPEORM_PORT: Joi.number(),
  TYPEORM_USERNAME: Joi.string(),
  TYPEORM_PASSWORD: Joi.string(),
  TYPEORM_DATABASE: Joi.string(),
  TYPEORM_ENTITIES: Joi.string(),
  TYPEORM_MIGRATIONS: Joi.string(),
});

export { configSchema };
