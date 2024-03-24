import React, { useEffect, useState } from 'react';
import { getTopPodcasts } from '../services/apiService';
import usePodcastStore from '../store/podcastStore';
import { Link as RouterLink } from 'react-router-dom';
import {
    Flex,
    Box,
    Input,
    Text,
    Link,
    Image,
    SimpleGrid,
    Center,
    useColorModeValue,
    Badge,
    VStack,
    InputLeftElement,
    InputGroup
} from '@chakra-ui/react';
import {SearchIcon} from "@chakra-ui/icons";


const HomePage = () => {
    const { podcasts, setPodcasts, lastFetched, setLastFetched } = usePodcastStore();
    const [filter, setFilter] = useState('');
    const bg = useColorModeValue('white', 'gray.800');
    const color = useColorModeValue('gray.800', 'white');
    const borderColor = useColorModeValue('gray.200', 'gray.600');

    useEffect(() => {
        const fetchPodcasts = async () => {
            const now = new Date();
            if (!lastFetched || (now - new Date(lastFetched)) > 86400000) {
                const fetchedPodcasts = await getTopPodcasts();
                setPodcasts(fetchedPodcasts);
                setLastFetched(now.toISOString());
            }
        };

        fetchPodcasts();
    }, [lastFetched, setLastFetched, setPodcasts]);

    const filteredPodcasts = podcasts.filter(podcast =>
        podcast.title.label.toLowerCase().includes(filter.toLowerCase()) ||
        podcast['im:artist'].label.toLowerCase().includes(filter.toLowerCase())
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
                    alignSelf="center" // This ensures the badge is vertically centered in Flex
                >
                    {filteredPodcasts.length} podcasts
                </Badge>
            </Flex>
            <SimpleGrid columns={[1, 2, 4]} spacingY='100px' spacingX='20px'>
                {filteredPodcasts.map((podcast, index) => (
                    <VStack
                        key={index}
                        boxShadow='xl'
                        px={6}
                        py={6}
                        rounded='md'
                        bg={bg}
                        color={color}
                        position='relative'
                        maxW='300px'
                        w='100%'
                        alignItems='center'
                        mx='auto'
                        mb={{ base: '50px', md: '30px' }}
                        height='100%'
                    >
                        <Image
                            src={podcast['im:image'][2].label}
                            alt={podcast.title.label}
                            borderRadius='full'
                            boxSize='140px'
                            objectFit='cover'
                            position='absolute'
                            top='-70px'
                            left='50%'
                            transform='translateX(-50%)'
                            border='2px solid'
                            borderColor={borderColor}
                        />
                        <Flex flex='1' direction='column' justify='center' align='center' textAlign='center' pt={10}>
                            <Text fontWeight='bold' fontSize='lg'>{podcast['im:name'].label}</Text>
                            <Text fontSize='md' color='gray.500'>Author: {podcast['im:artist'].label}</Text>
                        </Flex>
                    </VStack>

                ))}
            </SimpleGrid>
        </Center>
    );
};

export default HomePage;
