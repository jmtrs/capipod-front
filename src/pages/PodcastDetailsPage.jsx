import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePodcastStore from '../store/podcastStore';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Flex,
    Heading,
    Image,
    Text,
    Center,
    useColorModeValue, Container,
} from '@chakra-ui/react';
import PodcastSummaryBox from "../components/PodcastSummaryBox.jsx";

const PodcastDetailsPage = () => {
    const { podcastId } = useParams();
    const bg = useColorModeValue('white', 'gray.800');
    const { fetchPodcastDetails, getPodcastDetails, findPodcast } = usePodcastStore();
    const podcastDetails = getPodcastDetails(podcastId);
    const podcast = findPodcast(podcastId);

    useEffect(() => {
        if (!podcastDetails) {
            fetchPodcastDetails(podcastId);
        }
    }, [podcastId, podcastDetails, fetchPodcastDetails]);


    if (!podcastDetails) {
        return <Center>Loading...</Center>;
    }

    const { artworkUrl600, trackName, artistName } = podcastDetails[0];
    const episodes = podcastDetails.slice(1);

    return (
        <Container maxW="container.xl" p={5}>
            <Flex direction={{ base: 'column', md: 'row' }} gap={10}>
                <RouterLink to={`/podcast/${podcastId}`}>
                    <PodcastSummaryBox
                        artworkUrl={artworkUrl600}
                        title={trackName}
                        artist={artistName}
                        summary={podcast.summary.label}
                    />
                </RouterLink>
                <Box
                    flex='1'

                    borderRadius='md'
                    p={2}
                    pt={6}
                    width="full"
                    overflowX="auto"
                    maxW={{ base: '100%', md: 'calc(100% - 400px)' }}
                >
                    <Heading size='md' mb={4} textAlign='center'>Episodes: {episodes.length}</Heading>
                    <Flex direction="column" gap="4">
                        {episodes.map((episode, index) => (
                            <RouterLink to={`/podcast/${podcastId}/episode/${episode.trackId}`} key={index}>
                                <Box key={index} p="4"  borderRadius="lg" overflow="hidden" bg={bg}>
                                    <Flex justifyContent="space-between" align="center">
                                        <Box flex="1">
                                            <Text fontWeight="bold">{episode.trackName}</Text>
                                            <Text fontSize="sm">{new Date(episode.releaseDate).toLocaleDateString()}</Text>
                                        </Box>
                                        <Text ml={2}>{episode.trackTimeMillis ? `${(episode.trackTimeMillis / 60000).toFixed(0)} min` : 'N/A'}</Text>
                                    </Flex>
                                </Box>
                            </RouterLink>
                        ))}
                    </Flex>
                </Box>
            </Flex>
        </Container>
    );
}

export default PodcastDetailsPage;
