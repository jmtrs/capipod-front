import axios from 'axios'

const BASE_URL = 'https://itunes.apple.com';

const getTopPodcasts = async () => {
    const response = await axios.get(`${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`);
    return response.data.feed.entry;
};

const getPodcastDetails = async (podcastId) => {
    const response = await axios.get(`${BASE_URL}/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`);
    return response.data.results;
};

export { getTopPodcasts, getPodcastDetails}
