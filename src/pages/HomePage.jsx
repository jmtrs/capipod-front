import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  Wrap,
  WrapItem,
  Image,
  useColorModeValue
} from '@chakra-ui/react'
import useUserStore from '../store/userStore'
import useVisitedAlbumsStore from '../store/visitedAlbumsStore'

const HomePage = () => {
  const { users, isLoading, error, fetchUsers } = useUserStore()
  const { visitedAlbums } = useVisitedAlbumsStore()

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const bg = useColorModeValue('white', 'gray.800')
  const color = useColorModeValue('gray.800', 'white')

  return (
    <Container maxW='container.xlg' centerContent px={4}>
      <Heading as='h1' mb={8} textAlign='center'>
        Bienvenido a CapiPod
      </Heading>
      <Heading as='h2' size='lg' mb={5}>
        Álbumes Recién Visitados
      </Heading>
      {visitedAlbums.length === 0 && (
        <Text textAlign='center'>No has visitado ningún álbum aún</Text>
      )}
      <SimpleGrid columns={[1, null, 3]} spacing='20px' mb={10}>
        {visitedAlbums.map(album => (
          <Box
            key={album.id}
            boxShadow='xl'
            p='6'
            rounded='md'
            bg={bg}
            color={color}
            as={Link}
            to={`/albums/${album.albumId}/photos`}
            maxW='300px'
            width='100%'
            display='flex'
            flexDirection='column'
            alignItems='center'
            textAlign='center'
            justifyContent='center'
            mx='auto'
          >
            <Image
              src={album.thumbnailUrl}
              alt='thumbnail'
              borderRadius='lg'
              mb={4}
              boxSize='100%'
              objectFit='cover'
            />
            <Text fontWeight='bold'>{album.title}</Text>
          </Box>
        ))}
      </SimpleGrid>

      {isLoading ? (
        <Text>Cargando...</Text>
      ) : error ? (
        <Text color='red.500'>{error}</Text>
      ) : (
        <>
          <Heading as='h2' size='lg' mb={5}>
            Usuarios
          </Heading>
          <Wrap spacing='30px' justify='center'>
            {users.map(user => (
              <WrapItem
                key={user.id}
                boxShadow='xl'
                p='6'
                rounded='md'
                bg={bg}
                color={color}
                as={Link}
                to={`/user/${user.id}`}
              >
                <Box>
                  <Heading fontSize='xl'>{user.name}</Heading>
                  <Text mt={4}>{user.email}</Text>
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        </>
      )}
    </Container>
  )
}

export default HomePage
