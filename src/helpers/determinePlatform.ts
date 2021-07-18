export const isFastify = (): boolean => {
  const { env } = process;
  const { USE_FASTIFY } = env;

  return !!USE_FASTIFY;
};
