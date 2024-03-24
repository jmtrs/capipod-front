import React from 'react';
import {
    Box,
    Image,
    Heading,
    Text, useColorModeValue,
} from '@chakra-ui/react';

const PodcastSummaryBox = ({ artworkUrl, title, artist, summary }) => {
    const bg = useColorModeValue('white', 'gray.800');

    return (
        <Box
            width={{ base: '100%', md: '400px' }}
            bg={bg}
            borderRadius='md'
            p={5}
            position={{ base: 'static', md: 'sticky' }}
            top='5rem'
            alignSelf='flex-start'
        >
            <Image
                src={artworkUrl}
                alt={`Cover art for ${title}`}
                borderRadius='md'
                mb={4}
                htmlWidth="100%"
                htmlHeight="auto"
            />
            <Heading size='lg'>{title}</Heading>
            <Text fontWeight='bold'>By: {artist}</Text>
            <Text mt={2} fontSize="sm" color="gray.500">{summary}</Text>
        </Box>
    );
};

export default PodcastSummaryBox;
