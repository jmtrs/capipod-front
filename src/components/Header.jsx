import React from 'react'
import {
  Box,
  Flex,
  Text,
  Link,
  IconButton,
  useColorMode,
  useColorModeValue,
  Icon
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'
import { FaSun, FaMoon } from 'react-icons/fa'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue('whiteAlpha.700', 'blackAlpha.800')
  const textColor = useColorModeValue('gray.800', 'white')

  return (
    <Flex
      as='header'
      position='fixed'
      w='full'
      bg={bgColor}
      css={{
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)'
      }}
      zIndex='banner'
      color={textColor}
      p={4}
      justifyContent='space-between'
      alignItems='center'
    >
      <Text fontSize='xl' fontWeight='bold' as={RouterLink} to='/'>
        CapiPod
      </Text>
      <Box display='flex' alignItems='center'>
        <Link
          as={RouterLink}
          to='/'
          px={2}
          _hover={{ textDecoration: 'none' }}
          fontWeight={500}
        >
          Inicio
        </Link>
        <IconButton
          aria-label='Toggle dark mode'
          icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
          onClick={toggleColorMode}
          ml={4}
          colorScheme={useColorModeValue('purple', 'orange')}
        />
      </Box>
    </Flex>
  )
}

export default Header
