import React, { useEffect, useState } from 'react'
import { useParams, Link as RouterLink, Link } from 'react-router-dom'
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Button,
  useColorModeValue,
  Divider,
  Image,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem
} from '@chakra-ui/react'
import {
  getUserDetails,
  getUserAlbums,
  getAlbumPhotos
} from '../services/apiService'
import { FaEllipsisV } from 'react-icons/fa'

const UserDetailsPage = () => {
  const { userId } = useParams()
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingAlbums, setIsLoadingAlbums] = useState(true)
  const [firstAlbumPhoto, setFirstAlbumPhoto] = useState(null)

  useEffect(() => {
    getUserDetails(userId)
      .then(response => {
        setUser(response.data)
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching user details:', error)
        setIsLoading(false)
      })

    getUserAlbums(userId)
      .then(response => {
        const albums = response.data
        if (albums.length > 0) {
          getAlbumPhotos(albums[0].id)
            .then(response => {
              const photos = response.data
              if (photos.length > 0) {
                setFirstAlbumPhoto(photos[0].thumbnailUrl)
                setIsLoadingAlbums(false)
              }
            })
            .catch(error => {
              console.error('Error fetching album photos:', error)
              setIsLoadingAlbums(false)
            })
        }
      })
      .catch(error => {
        console.error('Error fetching user albums:', error)
        setIsLoadingAlbums(false)
      })
  }, [userId])

  const bg = useColorModeValue('white', 'gray.800')
  const color = useColorModeValue('gray.800', 'white')

  const boxSize = '320px'
  const boxProps = {
    bg: useColorModeValue('white', 'gray.800'),
    p: 6,
    borderRadius: 'lg',
    textAlign: 'center',
    m: { base: 4, md: 4 },
    w: boxSize,
    h: boxSize,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: 'xl'
  }

  return (
    <>
      <Flex justify='center' my={4}>
        <Heading as='h2' size='xl'>
          {user?.name}
        </Heading>
      </Flex>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        justify='center'
        align='center'
        wrap='wrap'
      >
        <Box {...boxProps}>
          <Flex justify='space-between' align='center' width='100%'>
            <Heading size='md'>Información del Usuario</Heading>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label='Opciones'
                icon={<FaEllipsisV />}
                variant='ghost'
              />
              <MenuList>
                <MenuItem as={RouterLink} to={`/user/${user?.id}/albums`}>
                  Ver Álbumes
                </MenuItem>
                <MenuItem as={RouterLink} to={`/user/${user?.id}/todos`}>
                  Ver TODOs
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <Divider my={4} />
          {isLoading ? (
            <Text>Cargando...</Text>
          ) : (
            user && (
              <VStack spacing={2} align='stretch'>
                <Text fontSize='md'>
                  <b>Email:</b> {user.email}
                </Text>
                <Text fontSize='md'>
                  <b>Username:</b> {user.username}
                </Text>
                <Text fontSize='md'>
                  <b>City:</b> {user.address.city}
                </Text>
                <Text fontSize='md'>
                  <b>Website:</b> {user.website}
                </Text>
                <Text fontSize='md'>
                  <b>Company:</b> {user.company.name}
                </Text>
              </VStack>
            )
          )}
        </Box>

        <Box {...boxProps} as={Link} to={`/user/${user?.id}/albums`}>
          <Heading marginTop={2} size='md'>
            Portada del Álbum
          </Heading>
          <Divider my={6} />
          {isLoadingAlbums ? (
            <Text>Cargando...</Text>
          ) : (
            firstAlbumPhoto && (
              <Image
                src={firstAlbumPhoto}
                alt='First Album Photo'
                width={180}
                objectFit='cover'
              />
            )
          )}
        </Box>
      </Flex>
    </>
  )
}
export default UserDetailsPage
