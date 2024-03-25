import React from "react";
import {
  Box,
  Flex,
  Text,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
  Icon,
  Progress,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import usePodcastStore from "../store/podcastStore.js";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("whiteAlpha.700", "blackAlpha.800");
  const textColor = useColorModeValue("gray.800", "white");
  const isLoading = usePodcastStore((state) => state.isLoading);

  return (
    <Box as="header" position="fixed" w="full" zIndex="banner">
      <Flex
        bg={bgColor}
        css={{
          backdropFilter: "blur(5px)",
          WebkitBackdropFilter: "blur(5px)",
        }}
        color={textColor}
        p={4}
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight="bold" as={RouterLink} to="/">
          CapiPod
        </Text>
        <Box display="flex" alignItems="center">
          <Link
            as={RouterLink}
            to="/"
            px={2}
            _hover={{ textDecoration: "none" }}
            fontWeight={500}
          >
            Inicio
          </Link>
          <IconButton
            aria-label="Toggle dark mode"
            icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
            ml={4}
            colorScheme={useColorModeValue("purple", "orange")}
          />
        </Box>
      </Flex>
      <Progress
        size="xs"
        isIndeterminate
        colorScheme="teal"
        visibility={isLoading ? "visible" : "hidden"}
      />
    </Box>
  );
};

export default Header;
