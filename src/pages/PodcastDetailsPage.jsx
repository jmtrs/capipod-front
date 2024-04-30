import React, { useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Center,
  useColorModeValue,
  Container,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

import usePodcastStore from "../store/podcastStore";
import PodcastSummaryBox from "../components/PodcastSummaryBox.jsx";
import Loading from "../components/Loading.jsx";

const PodcastDetailsPage = () => {
  const { podcastId } = useParams();
  const bg = useColorModeValue("white", "gray.800");
  const {
    podcastDetails,
    fetchPodcastDetails,
    fetchAndSetPodcasts,
    findPodcast,
    isLoading,
    error,
  } = usePodcastStore();

  useEffect(() => {
    fetchPodcastDetails(podcastId);
  }, [podcastId, fetchPodcastDetails]);

  useEffect(() => {
    async function loadPodcastIfNeeded() {
      let podcast = findPodcast(podcastId);
      if (!podcast) {
        await fetchAndSetPodcasts();
        podcast = findPodcast(podcastId);
        if (!podcast) {
          console.error("Podcast not found");
        }
      }
    }
    loadPodcastIfNeeded();
  }, [podcastId, findPodcast, fetchAndSetPodcasts]);

  if (isLoading) return <Loading />;
  if (error) return <Center>Error: {error}</Center>;
  if (!podcastDetails[podcastId])
    return <Center>No se encontraron detalles del podcast</Center>;

  const details = podcastDetails[podcastId]?.data;
  if (!details || details.length === 0)
    return <Center>Detalles del podcast no disponibles</Center>;

  const podcast = findPodcast(podcastId);
  if (!podcast) return <Center>Podcast no encontrado</Center>;

  const { artworkUrl600, trackName, artistName } = details[0];
  const episodes = details.slice(1);

  return (
    <Container maxW="container.xl" p={5}>
      <Flex direction={{ base: "column", md: "row" }} gap={10}>
        <RouterLink to={`/podcast/${podcastId}`}>
          <PodcastSummaryBox
            artworkUrl={artworkUrl600}
            title={trackName}
            artist={artistName}
            summary={podcast.summary}
          />
        </RouterLink>
        <Box
          flex="1"
          borderRadius="md"
          p={2}
          pt={2}
          width="full"
          overflowX="auto"
          maxW={{ base: "100%", md: "calc(100% - 400px)" }}
        >
          <Heading
            boxShadow="md"
            borderRadius="md"
            bg={bg}
            size="md"
            mb={4}
            textAlign="left"
            p={2}
          >
            Episodes: {episodes.length}
          </Heading>
          <Box
            boxShadow="md"
            borderRadius="md"
            bg={bg}
            p={{ base: 0, md: 3 }}
          >
            <Table

              variant="striped"
              size="sm"
            >
              <Thead>
                <Tr>
                  <Th>Title</Th>
                  <Th>Date</Th>
                  <Th isNumeric>Duration</Th>
                </Tr>
              </Thead>
              <Tbody>
                {episodes.map((episode, index) => (
                  <Tr key={index}>
                    <Td>
                      <RouterLink to={`/podcast/${podcastId}/episode/${episode.trackId}`}>
                        {episode.trackName}
                      </RouterLink>
                    </Td>
                    <Td>{new Date(episode.releaseDate).toLocaleDateString()}</Td>
                    <Td isNumeric>
                      {episode.trackTimeMillis ? `${(episode.trackTimeMillis / 60000).toFixed(0)} min` : "N/A"}
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default PodcastDetailsPage;
