import { initQueryClient } from '@ts-rest/react-query';
import { tsRestContract } from '../../../back/src/infrastructure/http/contracts/ts-rest-contract';
import { config } from '../config';

export const client = initQueryClient(tsRestContract, {
  baseUrl: config.api_url,
  baseHeaders: {},
});

export const initUserAfterSignUp = async (userId: string, email: string | null, displayName: string | null) => {
  // @ts-ignore
  client.createUser.mutation({ body: { id: userId, name: displayName, email: email } }).then((res) => {
    console.log(res);
  }
  ).catch((err) => {
    console.log(err);
  });
}