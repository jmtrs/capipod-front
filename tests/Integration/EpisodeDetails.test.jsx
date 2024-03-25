import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import EpisodeDetailsPage from "../../src/pages/EpisodeDetailsPage";
import "@testing-library/jest-dom";

jest.mock("../../src/store/podcastStore", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    fetchPodcastDetails: jest.fn().mockResolvedValue(),
    getEpisodeDetails: jest.fn().mockReturnValue({
      trackName: "Test Episode",
      description: "<p>Test episode description</p>",
      artworkUrl600: "test-artwork-url.jpg",
      releaseDate: new Date().toISOString(),
      trackTimeMillis: 3600000,
      previewUrl: "test-audio-url.mp3",
    }),
    findPodcast: jest.fn().mockReturnValue({
      "im:name": { label: "Test Podcast" },
      "im:artist": { label: "Test Artist" },
      summary: { label: "Test Summary" },
    }),
  }),
}));

describe("Integration Test: EpisodeDetailsPage", () => {
  test("loads and displays episode details correctly", async () => {
    render(
      <ChakraProvider>
        <MemoryRouter initialEntries={["/podcast/123/episode/456"]}>
          <EpisodeDetailsPage />
        </MemoryRouter>
      </ChakraProvider>,
    );

    await waitFor(() => {
      expect(screen.getByText(/Test Artist/i)).toBeInTheDocument();
      expect(screen.getByText("Test Summary")).toBeInTheDocument();
      expect(screen.getByText("Test episode description")).toBeInTheDocument();
      expect(screen.getByText("60 min")).toBeInTheDocument();
    });
  });
});
