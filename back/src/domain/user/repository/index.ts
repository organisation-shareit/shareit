import { Result } from 'neverthrow';
import { User, UserWithoutEvent } from '../aggregate';
import { CannotSaveUserError, UserNotFoundError } from './errors';
import { UserId } from '../aggregate/id';

export type UserRepository = {
  getUserById(input: { userId: UserId }): Promise<Result<UserWithoutEvent, UserNotFoundError>>;
  saveUser(input: { user: User }): Promise<Result<void, CannotSaveUserError>>;
};
