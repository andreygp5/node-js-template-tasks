import Joi from 'joi';

const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(4000),

  TYPEORM_CONNECTION: Joi.string().default('postgres'),
  TYPEORM_HOST: Joi.string().default('localhost'),
  TYPEORM_USERNAME: Joi.string().default('postgres'),
  TYPEORM_PASSWORD: Joi.string().default('secret'),
  TYPEORM_DATABASE: Joi.string().default('trello-competitor'),
  TYPEORM_PORT: Joi.number().default(5432),
  TYPEORM_LOGGING: Joi.boolean().default(true),
  TYPEORM_ENTITIES: Joi.string().default('src-nest/**/*.entity{ .ts,.js})'),
  TYPEORM_MIGRATIONS: Joi.string().default('migrations/*.ts'),

  JWT_SECRET_KEY: Joi.string(),
})

export { configSchema };
