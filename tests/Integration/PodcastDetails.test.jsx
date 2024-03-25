import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import PodcastDetailsPage from "../../src/pages/PodcastDetailsPage";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => ({ podcastId: "123" }),
}));

jest.mock("../../src/store/podcastStore", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    podcasts: [],
    podcastDetails: {
      123: {
        data: [
          {
            artworkUrl600: "test-artwork-url.jpg",
            trackName: "Test Podcast Episode",
            artistName: "Test Artist",
            summary: { label: "Test Summary" },
          },
        ],
      },
    },
    fetchPodcastDetails: jest.fn(),
    fetchAndSetPodcasts: jest.fn(),
    findPodcast: jest.fn().mockReturnValue({
      id: { attributes: { "im:id": "123" } },
      summary: { label: "Test Summary" },
    }),
    isLoading: false,
    error: null,
  })),
}));

describe("PodcastDetailsPage Testing with Mocked Store and Params", () => {
  test("renders podcast details correctly", () => {
    render(
      <ChakraProvider>
        <MemoryRouter>
          <PodcastDetailsPage />
        </MemoryRouter>
      </ChakraProvider>,
    );

    expect(screen.getByText("Test Podcast Episode")).toBeInTheDocument();

    expect(screen.getByText(/Test Artist/i)).toBeInTheDocument();

    expect(screen.getByText("Test Summary")).toBeInTheDocument();
    expect(
      screen.getByAltText("Cover art for Test Podcast Episode"),
    ).toHaveAttribute("src", "test-artwork-url.jpg");
  });
});
