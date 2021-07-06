import Joi from 'joi';

const configSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(4000),
  JWT_SECRET_KEY: Joi.string(),
})

export { configSchema };
