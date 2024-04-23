import axios from "axios";

const CORS_ANYWHERE = "https://cors-anywhere.herokuapp.com/";

const BASE_URL = "https://itunes.apple.com";

const getTopPodcasts = async () => {
  const url = `${BASE_URL}/us/rss/toppodcasts/limit=100/genre=1310/json`;
  const response = await axios.get(`${CORS_ANYWHERE}${url}`);
  return response.data.feed.entry;
};

const getPodcastDetails = async (podcastId) => {
  const url = `${BASE_URL}/lookup?id=${podcastId}&media=podcast&entity=podcastEpisode`;
  const response = await axios.get(`${CORS_ANYWHERE}${url}`);
  return response.data.results;
};

export { getTopPodcasts, getPodcastDetails };