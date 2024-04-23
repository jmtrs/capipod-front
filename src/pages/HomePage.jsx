import React, { useEffect, useState, useMemo } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Flex, Input, Text, Link, Image, SimpleGrid, Center, useColorModeValue, Badge, VStack, InputLeftElement, InputGroup
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import usePodcastStore from "../store/podcastStore";
import Loading from "../components/Loading.jsx";

const HomePage = () => {
  const { podcasts, fetchAndSetPodcasts, isLoading, error } = usePodcastStore();
  const [filter, setFilter] = useState("");
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.800", "white");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    fetchAndSetPodcasts();
  }, [fetchAndSetPodcasts]);

  if (isLoading) return <Loading />;
  if (error) return <Center>Error: {error}</Center>;

  const filteredPodcasts =  podcasts.filter(podcast =>
      podcast.name.toLowerCase().includes(filter.toLowerCase()) ||
      podcast.artist.toLowerCase().includes(filter.toLowerCase())
    );

  return (
    <Center flexDirection="column" px={5} mt={20}>
      <Flex
        mt={6}
        mb={28}
        justify="center"
        align="center"
        direction={{ base: "column", md: "row" }}
        w="full"
        maxW="md"
        mx="auto"
      >
        <InputGroup size="lg" mb={{ base: 4, md: 0 }}>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            placeholder="Filter podcasts..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            flex="1"
            borderRadius="full"
            borderColor="gray.200"
            _hover={{ borderColor: "teal.400" }}
            _focus={{ borderColor: "teal.500" }}
          />
        </InputGroup>
        <Badge
          colorScheme="teal"
          px={4}
          py={1}
          borderRadius="full"
          fontSize="1em"
          variant="solid"
          ml={{ md: 4 }}
          alignSelf="center"
        >
          {filteredPodcasts.length} podcasts
        </Badge>
      </Flex>
      <SimpleGrid columns={[1, 2, 4]} spacingY="100px" spacingX="20px">
        {filteredPodcasts.map((podcast, index) => (
          <VStack
            key={index}
            boxShadow="xl"
            px={6}
            py={6}
            rounded="md"
            bg={bg}
            color={color}
            position="relative"
            maxW="300px"
            w="100%"
            alignItems="center"
            mx="auto"
            mb={{ base: "20px" }}
            height="100%"
            justifyContent={"center"}
          >
            <Link
              as={RouterLink}
              to={`/podcast/${podcast.id}`}
              style={{ textDecoration: "none" }}
            >
              <Image
                src={podcast.images[2].url} // Asumiendo que quieres la imagen más grande disponible
                alt={podcast.name}
                borderRadius="full"
                boxSize="140px"
                objectFit="cover"
                position="absolute"
                top="-70px"
                left="50%"
                transform="translateX(-50%)"
                border="2px solid"
                borderColor={borderColor}
                bg={bg}
              />
              <Flex
                flex="1"
                direction="column"
                justify="center"
                align="center"
                textAlign="center"
                pt={10}
              >
                <Text fontWeight="bold" fontSize="lg">
                  {podcast.name}
                </Text>
                <Text fontSize="md" color="gray.500">
                  Author: {podcast.artist}
                </Text>
              </Flex>
            </Link>
          </VStack>
        ))}
      </SimpleGrid>
    </Center>
  );
};

export default HomePage;
