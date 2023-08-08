export type Logger = {
  info: (serviceName: string, message: string, metadata: object) => void;
  error: (serviceName: string, message: string, metadata: object) => void;
};
