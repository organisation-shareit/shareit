import { Outlet } from "react-router";
import { Box, Button, Container, Stack, Text } from "@chakra-ui/react";

import { Link } from "react-router-dom";

export const BasicLayout = () => {
  return (
    <>
      <Box minH="100vh" bg={"white"}>
        <Container
          id="main-container"
          padding={{ base: "5", md: "8", lg: "24" }}
        >
          {/* Box that create margin between button */}
          <Text>Basic Layout</Text>
          <Stack spacing={4} direction="row" mb={"8em"}>
            <Link to="/app/page-one">
              <Button colorScheme="blue">Page One</Button>
            </Link>
            <Link to="/app/page-two">
              <Button colorScheme="green">Page Two</Button>
            </Link>
            <Link to="/app/random-page">
              <Button colorScheme="red">Random Page</Button>
            </Link>
            <Link to="/app/debug">Debug page</Link>
          </Stack>
          <Outlet />
        </Container>
      </Box>
    </>
  );
};
