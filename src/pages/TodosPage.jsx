import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Container,
  Heading,
  Input,
  Button,
  useColorModeValue,
  VStack,
  HStack,
  IconButton,
  Text,
  Spinner
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import useUserStore from '../store/userStore'

const TodosPage = () => {
  const { userId } = useParams()
  const {
    todos,
    fetchUserTodos,
    addTodo,
    deleteTodo,
    updateTodo,
    isLoading,
    error
  } = useUserStore()
  const [newTodoText, setNewTodoText] = useState('')
  const [filter, setFilter] = useState('')
  const userTodos = todos[userId] || []

  useEffect(() => {
    fetchUserTodos(userId)
  }, [userId, fetchUserTodos])

  const bg = useColorModeValue('white', 'gray.900')
  const handleAddTodo = () => {
    if (!newTodoText.trim()) return
    addTodo(userId, { userId: +userId, title: newTodoText, completed: false })
    setNewTodoText('')
  }

  const handleDeleteTodo = todoId => {
    deleteTodo(userId, todoId)
  }

  const handleToggleTodoCompletion = todo => {
    updateTodo(userId, { ...todo, completed: !todo.completed })
  }

  const filteredTodos = userTodos.filter(todo =>
    todo.title.toLowerCase().includes(filter.toLowerCase())
  )

  if (isLoading) {
    return (
      <Container centerContent>
        <Spinner />
      </Container>
    )
  }

  if (error) {
    return (
      <Container centerContent>
        <Text color='red.500'>{error}</Text>
      </Container>
    )
  }

  return (
    <Container maxW='container.md' centerContent>
      <Heading as='h2' size='lg' mb={5}>
        TODOs del Usuario {userId}
      </Heading>
      <Input
        placeholder='Buscar TODOs...'
        value={filter}
        onChange={e => setFilter(e.target.value)}
        mb={4}
      />
      <Input
        placeholder='Añadir nuevo TODO'
        value={newTodoText}
        onChange={e => setNewTodoText(e.target.value)}
        mb={4}
      />
      <Button
        leftIcon={<AddIcon />}
        colorScheme='teal'
        onClick={handleAddTodo}
        mb={6}
      >
        Añadir TODO
      </Button>
      <VStack spacing={2} align='stretch' w='100%'>
        {filteredTodos.map(todo => (
          <HStack key={todo.id}>
            <Box
              padding={2}
              bg={bg}
              borderRadius='md'
              flexGrow={1}
              onClick={() => handleToggleTodoCompletion(todo)}
              cursor='pointer'
            >
              <Text as={todo.completed ? 's' : ''}>{todo.title}</Text>
            </Box>
            <IconButton
              icon={<DeleteIcon />}
              aria-label='Borrar TODO'
              colorScheme='red'
              onClick={() => handleDeleteTodo(todo.id)}
            />
          </HStack>
        ))}
      </VStack>
    </Container>
  )
}

export default TodosPage
