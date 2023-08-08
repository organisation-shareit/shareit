import { Box, List, ListItem, Text } from "@chakra-ui/react";
import { config } from "../../config";
export const DebugPage = () => {
  return (
    <Box>
      <List>
        <ListItem>
          <Text>Env name: {config.env_name}</Text>
        </ListItem>
        <ListItem>
          <Text>API url: {config.api_url}</Text>
        </ListItem>
      </List>
    </Box>
  );
};
