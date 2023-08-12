import { Tag, TagLabel } from '@chakra-ui/react';
import { QueryStatus } from '@tanstack/react-query';

type StatusTagProps = {
  status?: QueryStatus | 'UNKNOWN';
};

export const StatusTag = ({ status = 'UNKNOWN' }: StatusTagProps) => {
  let colorScheme = 'gray';
  if (status === 'success') colorScheme = 'green';
  if (status === 'error') colorScheme = 'red';
  if (status === 'loading') colorScheme = 'gray';

  return (
    <Tag borderRadius="full" variant="solid" colorScheme={colorScheme}>
      <TagLabel>{status}</TagLabel>
    </Tag>
  );
};
