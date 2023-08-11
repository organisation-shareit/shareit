import { DatabaseError, RowNotMatchingSchemaError } from '@utils/database';
import { User } from '../aggregate';
import { UserId } from '../aggregate/id';

export type CannotGetUserError = DatabaseError | RowNotMatchingSchemaError;

export type UserNotFoundError =
  | CannotGetUserError
  | {
      kind: 'userNotFound';
      userId: UserId;
    };

export type CannotSaveUserError = {
  kind: 'cannotSaveUser';
  user: User;
  error: unknown;
};
