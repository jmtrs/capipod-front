import React, { useEffect, useState } from 'react'
import { useParams, Link as RouterLink } from 'react-router-dom'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  useColorModeValue,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { getUserAlbums } from '../services/apiService'

const AlbumsPage = () => {
  const { userId } = useParams()
  const [albums, setAlbums] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getUserAlbums(userId)
      .then(response => {
        setAlbums(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching albums:', error)
        setIsLoading(false)
      })
  }, [userId])

  const bg = useColorModeValue('white', 'gray.800')
  const color = useColorModeValue('gray.800', 'white')

  return (
    <Container maxW='container.xlg' centerContent px={4}>
      <Heading as='h1' size='xl' textAlign='center' mb={8}>
        Álbumes del Usuario {userId}
      </Heading>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        <Wrap spacing='30px' justify='center'>
          {albums.map(album => (
            <WrapItem
              key={album.id}
              boxShadow='xl'
              p='6'
              rounded='md'
              bg={bg}
              color={color}
              _hover={{
                transform: 'scale(1.01)',
                transition: 'all .2s ease-in-out'
              }}
            >
              <VStack spacing={4} align='stretch' width='100%'>
                <Heading fontSize='lg' mb={2}>
                  {album.title}
                </Heading>
                <Button
                  as={RouterLink}
                  to={`/albums/${album.id}/photos`}
                  colorScheme='teal'
                  variant='outline'
                  alignSelf='end'
                >
                  Ver Fotos
                </Button>
              </VStack>
            </WrapItem>
          ))}
        </Wrap>
      )}
    </Container>
  )
}

export default AlbumsPage
