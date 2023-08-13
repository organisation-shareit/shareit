import { Box, Center, Spinner, Text, useColorModeValue } from '@chakra-ui/react';

const LoadingOverlay = () => {
  const backgroundColor = useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(0, 0, 0, 0.8)');

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      backgroundColor={backgroundColor}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      zIndex={9999}
    >
      <Center mb={4}>
        <Spinner size="xl" color="purple.500" />
      </Center>
      <Box bgGradient="linear(to-r, purple.500, teal.500)" bgClip="text" display="inline-block">
        <Text fontSize="2xl" bg="linear(to-l, #7928CA, #FF0080)">
          Share It. is loading...
        </Text>
      </Box>
    </Box>
  );
};

export default LoadingOverlay;
