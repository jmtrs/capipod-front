import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getPodcastDetails, getTopPodcasts } from "../services/apiService";
import { Podcast } from "../entities/Podcast"

const day = 86400000;

const usePodcastStore = create(
  persist(
    (set, get) => ({
      podcasts: [],
      podcastDetails: {},
      lastFetched: null,
      isLoading: false,
      error: null,
      startLoading: () => set({ isLoading: true, error: null }),
      setError: (error) => set({ isLoading: false, error }),
      fetchAndSetPodcasts: async () => {
        try {
          set({ isLoading: true });
          const now = new Date();
          const lastFetched = get().lastFetched;
          if (!lastFetched || now - new Date(lastFetched) > day) {
            const response = await getTopPodcasts(); 
            const podcasts = response.map(entry => Podcast(entry));
            set({ podcasts, lastFetched: now.toISOString(), isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          set({ error: error.message, isLoading: false });
        }
      },
      fetchPodcastDetails: async (podcastId) => {
        try {
          set({ isLoading: true });
          const now = new Date();
          const lastFetched = get().podcastDetails[podcastId]?.lastFetched;
          if (!lastFetched || now - new Date(lastFetched) > day) {
            const details = await getPodcastDetails(podcastId);
            set((state) => ({
              podcastDetails: {
                ...state.podcastDetails,
                [podcastId]: {
                  lastFetched: now.toISOString(),
                  data: details,
                },
              },
              isLoading: false,
            }));
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          set({ isLoading: false, error: error.toString() });
        }
      },
      setPodcasts: (podcasts) => set({ podcasts, isLoading: false }),
      setPodcastDetails: (id, details) =>
        set((state) => ({
          podcastDetails: {
            ...state.podcastDetails,
            [id]: { ...details, lastFetched: new Date().toISOString() },
          },
          isLoading: false,
        })),
      getPodcastDetails: (podcastId) => get().podcastDetails[podcastId]?.data,
      findPodcast: (podcastId) =>
        get().podcasts.find(
          (podcast) => podcast.id === podcastId,
        ),
      getEpisodeDetails: (podcastId, episodeId) => {
        const podcastDetails = get().podcastDetails[podcastId]?.data;
        return podcastDetails?.find((episode) => episode.trackId === episodeId);
      },
    }),
    {
      name: "podcast-storage",
      storage: {
        getItem: (name) => {
          const item = localStorage.getItem(name);
          return item ? JSON.parse(item) : null;
        },
        setItem: (name, value) => {
          const stringifiedValue = JSON.stringify(value);
          localStorage.setItem(name, stringifiedValue);
        },
        removeItem: (name) => {
          localStorage.removeItem(name);
        },
      },
    },
  ),
);

export default usePodcastStore;
