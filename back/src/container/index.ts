import { loadInMemoryContainer } from './inMemory';
import { loadProductionContainer } from './production';
import { loadServiceTestContainer } from './service';
import { Container } from './types';

export function getContainer(): Container {
  if (process.env.NODE_ENV === 'IN_MEMORY') {
    return loadInMemoryContainer();
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    return loadProductionContainer();
  }

  if (process.env.NODE_ENV === 'SERVICE_TEST') {
    return loadServiceTestContainer();
  }

  return loadProductionContainer();
}
