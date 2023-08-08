import signale from 'signale';
import { Logger } from '.';

export function buildSignaleLogger(): Logger {
  function info(serviceName: string, message: string, metadata: object) {
    signale.info(`[${serviceName}]: ${message}`, { ...metadata, env: process.env.NODE_ENV });
  }

  function error(serviceName: string, message: string, metadata: object) {
    signale.error(`[${serviceName}]: ${message}`, { ...metadata, env: process.env.NODE_ENV });
  }

  return {
    info,
    error,
  };
}
