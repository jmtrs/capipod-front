import React from "react";
import { Center, Spinner, Text } from "@chakra-ui/react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <Center flexDirection="column" height="100vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text mt={4}>{message}</Text>
    </Center>
  );
};

export default Loading;
