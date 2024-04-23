import axios from "axios";

const BASE_URL = "https://itunes.apple.com";
const PROXY_URL = "https://api.allorigins.win/raw?url=";

const getTopPodcasts = async () => {
  const encodedUrl = encodeURIComponent(`${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`);
  const response = await axios.get(`${PROXY_URL}${encodedUrl}`);
  return response.data.feed.entry;
};

const getPodcastDetails = async (podcastId) => {
  const encodedUrl = encodeURIComponent(`${BASE_URL}/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`);
  const response = await axios.get(`${PROXY_URL}${encodedUrl}`);
  return response.data.results;
};

export { getTopPodcasts, getPodcastDetails };