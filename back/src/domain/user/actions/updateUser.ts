import { User, UserWithoutEvent } from '../aggregate';

type UpdateUserInput = {
  previousUser: UserWithoutEvent;
  newUser: UserWithoutEvent;
};

export function updateUser(input: UpdateUserInput): User {
  const { previousUser, newUser } = input;

  return {
    ...previousUser,
    ...newUser,
    lastEvent: {
      kind: 'USER_UPDATED',
      userId: previousUser.id,
    },
  };
}
