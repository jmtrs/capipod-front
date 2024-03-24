import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const usePodcastStore = create(persist(
    (set, get) => ({
        podcasts: [],
        setPodcasts: (podcasts) => set({ podcasts }),
        lastFetched: null,
        setLastFetched: (date) => set({ lastFetched: date })
    }),
    {
        name: 'podcast-storage',
        getStorage: () => localStorage,
    }
));

export default usePodcastStore;
