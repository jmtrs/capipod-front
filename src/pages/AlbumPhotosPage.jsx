import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Image,
  useColorModeValue,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react'
import { getAlbumPhotos } from '../services/apiService'
import useVisitedAlbumsStore from '../store/visitedAlbumsStore.js'

const AlbumPhotosPage = () => {
  const { albumId } = useParams()
  const [photos, setPhotos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selectedImage, setSelectedImage] = useState(null)
  const addVisitedAlbum = useVisitedAlbumsStore(state => state.addVisitedAlbum)

  useEffect(() => {
    getAlbumPhotos(albumId)
      .then(response => {
        setPhotos(response.data)
        addVisitedAlbum(response.data[0])
        setIsLoading(false)
      })
      .catch(error => {
        console.error('Error fetching album photos:', error)
        setIsLoading(false)
      })
  }, [albumId])

  const handleImageClick = image => {
    setSelectedImage(image)
    onOpen()
  }

  return (
    <Container maxW='container.xlg' centerContent px={2}>
      <Heading as='h2' size='xl' textAlign='center' mb={8}>
        Fotos del Álbum
      </Heading>
      {isLoading ? (
        <Text>Cargando...</Text>
      ) : (
        <SimpleGrid columns={[2, null, 5]} spacing='20px'>
          {photos.map(photo => (
            <Box key={photo.id} cursor='pointer' _hover={{ opacity: 0.8 }}>
              <Image
                src={photo.thumbnailUrl}
                alt={photo.title}
                onClick={() => handleImageClick(photo.url)}
              />
            </Box>
          ))}
        </SimpleGrid>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <Image src={selectedImage} alt='Selected Photo' />
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default AlbumPhotosPage
