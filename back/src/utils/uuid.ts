import { v4 as uuidV4, v5 as uuidV5 } from 'uuid';

export type UuidGenerator = {
  generate: (domain: string, name?: string) => string;
};

const NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';

export const uuidGenerator: UuidGenerator = {
  generate: (domain: string, name?: string) => {
    if (name) {
      return uuidV5(`${domain}-${name}`, NAMESPACE);
    }
    return uuidV4();
  },
};
