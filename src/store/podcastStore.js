import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { getPodcastDetails } from "../services/apiService";

const usePodcastStore = create(persist(
    (set, get) => ({
        podcasts: [],
        podcastDetails: {},
        lastFetched: null,

        setPodcasts: (podcasts) => set({ podcasts }),
        setPodcastDetails: (id, details) => set(state => ({
            podcastDetails: { ...state.podcastDetails, [id]: details }
        })),
        fetchPodcastDetails: async (podcastId) => {
            const now = new Date();
            const lastFetched = get().podcastDetails[podcastId]?.lastFetched;
            if (!lastFetched || now - new Date(lastFetched) > 86400000) {
                const details = await getPodcastDetails(podcastId);
                set(state => ({
                    podcastDetails: {
                        ...state.podcastDetails,
                        [podcastId]: {
                            lastFetched: now.toISOString(),
                            data: details
                        }
                    }
                }));
            }
        },
        getPodcastDetails: (podcastId) => get().podcastDetails[podcastId]?.data,
        findPodcast: (podcastId) => get().podcasts.find(podcast => podcast.id.attributes['im:id'] === podcastId),
        getEpisodeDetails: (podcastId, episodeId) => {
            const podcastDetails = get().podcastDetails[podcastId]?.data;
            return podcastDetails?.find(episode => episode.trackId === episodeId);
        }
    }),
    {
        name: 'podcast-storage',
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
    }
));

export default usePodcastStore;
