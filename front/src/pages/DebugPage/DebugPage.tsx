import { Box, Text, Code, Table, Tbody, TableContainer } from '@chakra-ui/react';
import { config } from '../../config';
import { client } from '../../services/api';
import { DebugQueryCard } from '../../components/DebugQueryCard/DebugQueryCard';

export const DebugPage = () => {
  const queryResult = client.healthcheck.useQuery(['healthcheck']);

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
        Debug page
      </Text>
      <Text fontSize="lg" fontWeight="bold">
        Config
      </Text>
      <TableContainer>
        <Table>
          <Tbody>
            {Object.entries(config).map(([key, value]) => (
              <tr key={key}>
                <td>
                  <Code>{key}</Code>
                </td>
                <td>
                  <Code>{value}</Code>
                </td>
              </tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box marginTop={'1em'}>
        <DebugQueryCard endpointName={'GET healtheck/'} queryResult={queryResult} />
      </Box>
    </Box>
  );
};
