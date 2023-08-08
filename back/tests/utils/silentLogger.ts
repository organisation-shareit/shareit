import { Logger } from "../../src/utils/logger";

export const silentLogger: Logger = {
  info: () => {},
  error: () => {},
}