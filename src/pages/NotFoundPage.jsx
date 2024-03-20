import React from 'react'
import { Container, Heading } from '@chakra-ui/react'

const NotFoundPage = () => {
  return (
    <Container maxW='container.lg' textAlign='center'>
      <Heading as='h1' size='xl' mt={20}>
        404 - Página no encontrada
      </Heading>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
    </Container>
  )
}

export default NotFoundPage
