import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { getUsers, getUserTodos } from '../services/apiService.js'

const useUserStore = create(
  persist(
    (set, get) => ({
      users: [],
      todos: {},
      isLoading: false,
      error: null,
      fetchUsers: async () => {
        set({ isLoading: true })
        try {
          const response = await getUsers()
          set({ users: response.data, isLoading: false })
        } catch (error) {
          set({ error: error.message, isLoading: false })
        }
      },
      fetchUserTodos: async userId => {
        if (get().todos[userId]?.length > 0) {
          return
        }
        set({ isLoading: true })
        try {
          const response = await getUserTodos(userId)
          set(state => ({
            ...state,
            todos: {
              ...state.todos,
              [userId]: response.data
            },
            isLoading: false
          }))
        } catch (error) {
          set({ error: error.message, isLoading: false })
        }
      },
      addTodo: (userId, newTodo) => {
        const userTodos = get().todos[userId] || []
        set(state => ({
          todos: {
            ...state.todos,
            [userId]: [...userTodos, { ...newTodo, id: Date.now() }]
          }
        }))
      },
      deleteTodo: (userId, todoId) => {
        const userTodos = get().todos[userId]
        if (!userTodos) return
        set(state => ({
          todos: {
            ...state.todos,
            [userId]: userTodos.filter(todo => todo.id !== todoId)
          }
        }))
      },
      updateTodo: (userId, updatedTodo) => {
        const userTodos = get().todos[userId]
        if (!userTodos) return
        set(state => ({
          todos: {
            ...state.todos,
            [userId]: userTodos.map(todo =>
              todo.id === updatedTodo.id ? updatedTodo : todo
            )
          }
        }))
      }
    }),
    {
      name: 'user-todos-storage',
      storage: {
        getItem: name => {
          const item = localStorage.getItem(name)
          return item ? JSON.parse(item) : undefined
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify(value))
        },
        removeItem: name => {
          localStorage.removeItem(name)
        }
      }
    }
  )
)

export default useUserStore
