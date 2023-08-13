import { initQueryClient } from '@ts-rest/react-query';
import { tsRestContract } from '../../../back/src/infrastructure/http/contracts/ts-rest-contract';
import { config } from '../config';

export const client = initQueryClient(tsRestContract, {
  baseUrl: config.api_url,
  baseHeaders: {},
});