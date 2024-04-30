import React, { useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Heading,
  Image,
  Text,
  Center,
  useColorModeValue,
  Container,
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
            summary={podcast.summary.label}
          />
        </RouterLink>
        <Box
          flex="1"
          borderRadius="md"
          p={2}
          pt={6}
          width="full"
          overflowX="auto"
          maxW={{ base: "100%", md: "calc(100% - 400px)" }}
        >
          <Heading size="md" mb={4} textAlign="center">
            Episodes: {episodes.length}
          </Heading>
          <Flex direction="column" gap="4">
            {episodes.map((episode, index) => (
              <RouterLink
                to={`/podcast/${podcastId}/episode/${episode.trackId}`}
                key={index}
              >
                <Box p="4" borderRadius="lg" overflow="hidden" bg={bg} boxShadow="md">
                  <Flex justifyContent="space-between" align="center">
                    <Box flex="1">
                      <Text fontWeight="bold">{episode.trackName}</Text>
                      <Text fontSize="sm">
                        {new Date(episode.releaseDate).toLocaleDateString()}
                      </Text>
                    </Box>
                    <Text ml={2}>
                      {episode.trackTimeMillis
                        ? `${(episode.trackTimeMillis / 60000).toFixed(0)} min`
                        : "N/A"}
                    </Text>
                  </Flex>
                </Box>
              </RouterLink>
            ))}
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default PodcastDetailsPage;
