/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Box, Flex, FormLabel } from '@chakra-ui/react';
import { UseQueryResult } from '@tanstack/react-query';
import ReactJson from 'react-json-view';
import { StatusTag } from './components/StatusTag';

type DebugQueryCardProps = {
  endpointName?: string;
  queryResult: UseQueryResult<unknown, unknown>;
};

export const DebugQueryCard = ({ queryResult, endpointName }: DebugQueryCardProps) => {
  const data: any = queryResult.data;
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding={'1em'}
      bg={'whiteAlpha.900'}
    >
      <Flex>
        <FormLabel>Endpoint:</FormLabel>
        <FormLabel fontWeight={'bold'}>{endpointName}</FormLabel>
      </Flex>
      <Flex>
        <FormLabel>Query status:</FormLabel>
        <StatusTag status={queryResult.status} />
      </Flex>
      <Box>
        <FormLabel>Data:</FormLabel>
        {/* @ts-ignore: TS2339 */}
        <ReactJson
          src={data?.body || queryResult.error}
          //   src={(queryResult.data as any)?.body || queryResult.error}
          name={false}
          theme={'flat'}
          displayDataTypes={false}
          onEdit={false}
          onDelete={false}
          displayObjectSize={false}
        />
      </Box>
    </Box>
  );
};
