import { User } from '../aggregate';
import { UserAuthProviderId } from '../aggregate/authProviderId';
import { UserEmail } from '../aggregate/email';
import { UserId } from '../aggregate/id';
import { UserName } from '../aggregate/name';

type CreateUserInput = {
  id: UserId;
  name: UserName;
  email: UserEmail;
  authProviderId: UserAuthProviderId;
};

export function createUser(input: CreateUserInput): User {
  const { id, name, email, authProviderId } = input;

  return {
    id,
    name,
    email,
    authProviderId,
    lastEvent: {
      kind: 'USER_CREATED',
      userId: id,
    },
  };
}
