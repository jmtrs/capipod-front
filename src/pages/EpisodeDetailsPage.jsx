import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DOMPurify from "dompurify";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Flex,
  Heading,
  Text,
  Image,
  VStack,
  useColorModeValue,
  Center,
  Divider,
} from "@chakra-ui/react";

import usePodcastStore from "../store/podcastStore";
import PodcastSummaryBox from "../components/PodcastSummaryBox.jsx";

const EpisodeDetailsPage = () => {
  const { podcastId, episodeId } = useParams();
  const { fetchPodcastDetails, getEpisodeDetails, findPodcast } =
    usePodcastStore();
  const [episodeDetails, setEpisodeDetails] = useState(null);
  const bg = useColorModeValue("white", "gray.800");
  const podcast = findPodcast(podcastId);

  useEffect(() => {
    fetchPodcastDetails(podcastId).then(() => {
      const details = getEpisodeDetails(podcastId, +episodeId);
      setEpisodeDetails(details);
    });
  }, [podcastId, episodeId, fetchPodcastDetails, getEpisodeDetails]);

  if (!episodeDetails) {
    return <Center>Loading...</Center>;
  }

  const {
    trackName,
    description,
    artworkUrl600,
    releaseDate,
    trackTimeMillis,
    previewUrl,
  } = episodeDetails;
  const cleanDescription = DOMPurify.sanitize(description);

  return (
    <Container maxW="container.xl" p={5}>
      <Flex direction={{ base: "column", md: "row" }} gap={10}>
        <RouterLink to={`/podcast/${podcastId}`}>
          <PodcastSummaryBox
            artworkUrl={artworkUrl600}
            title={podcast.name}
            artist={podcast.artist}
            summary={podcast.summary}
          />
        </RouterLink>

        <VStack
          bg={bg}
          p={5}
          boxShadow="md"
          borderRadius="md"
          flex="1"
          align="stretch"
          maxW={{ base: "100%", md: "calc(100% - 400px)" }}
          height={{ base: "auto", md: "fit-content" }}
        >
          <Heading size="lg">{trackName}</Heading>
          <Divider my={2} />
          <Heading size="md">Episode Details</Heading>
          <Text fontSize="sm" color="gray.500">
            {new Date(releaseDate).toLocaleDateString()}
          </Text>
          <Text>
            {trackTimeMillis
              ? `${(trackTimeMillis / 60000).toFixed(0)} min`
              : "N/A"}
          </Text>
          <Box
            dangerouslySetInnerHTML={{ __html: cleanDescription }}
            w="full"
          ></Box>
          <Divider my={2} />
          <audio controls src={previewUrl} style={{ width: "100%" }}>
            Your browser does not support the <code>audio</code> element.
          </audio>
        </VStack>
      </Flex>
    </Container>
  );
};

export default EpisodeDetailsPage;
