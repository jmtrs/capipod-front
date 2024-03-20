import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useVisitedAlbumsStore = create(
  persist(
    set => ({
      visitedAlbums: [],
      addVisitedAlbum: album =>
        set(state => {
          const albumExists = state.visitedAlbums.some(a => a.id === album.id)
          if (!albumExists) {
            return { visitedAlbums: [...state.visitedAlbums, album] }
          } else {
            return {}
          }
        })
    }),
    {
      name: 'visitedAlbums-storage',
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

export default useVisitedAlbumsStore
