import { logToFileSync } from './logToFile';

export const catchUncaught = (err: Error) => {
  const logStr = `${err.message} at ${new Date().toLocaleTimeString()}\n`;

  process.stdout.write(logStr);
  logToFileSync('uncaughtErrors', logStr);

  process.exit(1);
};
