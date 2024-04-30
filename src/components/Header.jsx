import React from "react";
import {
  Box,
  Flex,
  Text,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";
import usePodcastStore from "../store/podcastStore.js";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("whiteAlpha.700", "blackAlpha.800");
  const textColor = useColorModeValue("gray.800", "white");
  const iconBg = useColorModeValue("gray", "blue")
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
        boxShadow="md"

      >
        <Text fontSize="xl" fontWeight="bold" as={RouterLink} to="/">
          Podcasts
        </Text>
        <Box display="flex" alignItems="center">
          {isLoading && (
            <Box
              position="relative"
              mr={3}
              borderRadius="full"
              w="10px"
              h="10px"
              bg="blue.500"
              css={{
                animation: "pulse 1.5s infinite cubic-bezier(0.66, 0, 0, 1)",
                '@keyframes pulse': {
                  '0%, 100%': {
                    opacity: 0,
                    transform: 'scale(0.5)'
                  },
                  '50%': {
                    opacity: 1,
                    transform: 'scale(1.2)'
                  }
                }
              }}
            />
          )}
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
            colorScheme={iconBg}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
