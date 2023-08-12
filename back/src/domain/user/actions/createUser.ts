import { User } from '../aggregate';
import { UserEmail } from '../aggregate/email';
import { UserId } from '../aggregate/id';
import { UserName } from '../aggregate/name';

type CreateUserInput = {
  id: UserId;
  name: UserName;
  email: UserEmail;
};

export function createUser(input: CreateUserInput): User {
  const { id, name, email } = input;

  return {
    id,
    name,
    email,
    lastEvent: {
      kind: 'USER_CREATED',
      userId: id,
    },
  };
}
