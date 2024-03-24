import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import usePodcastStore from '../store/podcastStore';
import {
    Box,
    Flex,
    Heading,
    Image,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    VStack,
    Center,
    useColorModeValue, Container,
} from '@chakra-ui/react';

const PodcastDetailsPage = () => {
    const { podcastId } = useParams();
    const { fetchPodcastDetails, getPodcastDetails, findPodcast } = usePodcastStore();
    const podcastDetails = getPodcastDetails(podcastId);
    const podcast = findPodcast(podcastId);

    useEffect(() => {
        console.log(podcastDetails)
        if (!podcastDetails) {
            fetchPodcastDetails(podcastId);
        }
    }, [podcastId, podcastDetails, fetchPodcastDetails]);


    if (!podcastDetails) {
        return <Center>Loading...</Center>;
    }

    const { artworkUrl600, trackName, artistName } = podcastDetails[0];
    const episodes = podcastDetails.slice(1);
    const bg = useColorModeValue('white', 'gray.800');

    return (
        <Container maxW="container.xl" p={5}>
            <Flex direction={{ base: 'column', md: 'row' }} gap={10}>
                <Box
                    width={{ base: '100%', md: '400px' }}
                    bg={bg}
                    borderRadius='md'
                    p={5}
                    position={{ base: 'static', md: 'sticky' }}
                    top='5rem' // Ajusta según el margen deseado
                    alignSelf='flex-start'
                >
                    <Image
                        src={artworkUrl600}
                        alt={`Cover art for ${trackName}`}
                        borderRadius='md'
                        mb={4}
                        htmlWidth="100%"
                        htmlHeight="auto"
                    />
                    <Heading size='lg'>{trackName}</Heading>
                    <Text fontWeight='bold'>By: {artistName}</Text>
                    <Text mt={2} fontSize="sm" color="gray.500">{podcast.summary.label}</Text>
                </Box>
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
                            <Box key={index} p="4"  borderRadius="lg" overflow="hidden" bg={bg}>
                                <Flex justifyContent="space-between" align="center">
                                    <Box flex="1">
                                        <Text fontWeight="bold">{episode.trackName}</Text>
                                        <Text fontSize="sm">{new Date(episode.releaseDate).toLocaleDateString()}</Text>
                                    </Box>
                                    <Text ml={2}>{episode.trackTimeMillis ? `${(episode.trackTimeMillis / 60000).toFixed(0)} min` : 'N/A'}</Text>
                                </Flex>
                            </Box>
                        ))}
                    </Flex>
                </Box>
            </Flex>
        </Container>
    );
}

export default PodcastDetailsPage;
