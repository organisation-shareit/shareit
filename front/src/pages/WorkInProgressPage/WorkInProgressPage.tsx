import { Box, Text } from "@chakra-ui/react";

type WorkInProgressPageProps = {
  title: string;
};

export const WorkInProgressPage = ({
  title = "Work In Progress",
}: WorkInProgressPageProps) => {
  return (
    <Box>
      <Text fontSize="6xl">{title}</Text>
    </Box>
  );
};
