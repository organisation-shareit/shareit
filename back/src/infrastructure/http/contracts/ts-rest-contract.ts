import { initContract } from '@ts-rest/core';
import {
  HEALTHCHEK_METHOD,
  HEALTHCHEK_ROUTE,
  healthcheckResponseSchema,
} from './misc/healthcheck.get';
import {
  CREATE_USER_METHOD,
  CREATE_USER_ROUTE,
  createUserRequestSchema,
  createUserResponseSchema,
} from './aggregates/user/write/user.create';
import {
  UPDATE_USER_METHOD,
  UPDATE_USER_ROUTE,
  updateUserRequestSchema,
  updateUserResponseSchema,
} from './aggregates/user/write/user.update';
import {
  LIST_ALL_USERS_METHOD,
  LIST_ALL_USERS_ROUTE,
  listAllUsersResponseSchema,
} from './aggregates/user/read/user.listAll';
import {
  CREATE_ITEM_METHOD,
  CREATE_ITEM_ROUTE,
  createItemRequestSchema,
  createItemResponseSchema,
} from './aggregates/item/write/item.create';
import {
  UPDATE_ITEM_METHOD,
  UPDATE_ITEM_ROUTE,
  updateItemRequestSchema,
  updateItemResponseSchema,
} from './aggregates/item/write/item.update';

const tsRest = initContract();

export const tsRestContract = tsRest.router({
  healthcheck: {
    method: HEALTHCHEK_METHOD,
    path: HEALTHCHEK_ROUTE,
    responses: healthcheckResponseSchema,
    summary: 'Healthcheck of the API',
  },
  createUser: {
    method: CREATE_USER_METHOD,
    path: CREATE_USER_ROUTE,
    body: createUserRequestSchema,
    responses: createUserResponseSchema,
    summary: 'Creating a new user',
  },
  updateUser: {
    method: UPDATE_USER_METHOD,
    path: UPDATE_USER_ROUTE,
    body: updateUserRequestSchema,
    responses: updateUserResponseSchema,
    summary: 'Updating an existing user',
  },
  listAllUsers: {
    method: LIST_ALL_USERS_METHOD,
    path: LIST_ALL_USERS_ROUTE,
    responses: listAllUsersResponseSchema,
    summary: 'Listing all users',
  },
  createItem: {
    method: CREATE_ITEM_METHOD,
    path: CREATE_ITEM_ROUTE,
    body: createItemRequestSchema,
    responses: createItemResponseSchema,
    summary: 'Creating a new item',
  },
  updateItem: {
    method: UPDATE_ITEM_METHOD,
    path: UPDATE_ITEM_ROUTE,
    body: updateItemRequestSchema,
    responses: updateItemResponseSchema,
    summary: 'Updating an existing item',
  },
});
