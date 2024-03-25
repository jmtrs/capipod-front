import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../../src/pages/HomePage";
import { MemoryRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import { describe, expect, test } from "@jest/globals";
import "@testing-library/jest-dom";

jest.mock("../../src/store/podcastStore", () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    podcasts: [
      {
        id: { attributes: { "im:id": "123" } },
        title: { label: "Test Podcast 1" },
        "im:artist": { label: "Artist 1" },
        "im:image": [
          { label: "test-image-url-1.jpg" },
          { label: "test-image-url-1.jpg" },
          { label: "test-image-url-1.jpg" },
        ],
        "im:name": "Test Podcast 1",
      },
      {
        id: { attributes: { "im:id": "456" } },
        title: { label: "Test Podcast 2" },
        "im:artist": { label: "Artist 2" },
        "im:image": [
          { label: "test-image-url-2.jpg" },
          { label: "test-image-url-2.jpg" },
          { label: "test-image-url-2.jpg" },
        ],
        "im:name": "Test Podcast 2",
      },
      {
        id: { attributes: { "im:id": "789" } },
        title: { label: "Test Podcast 3" },
        "im:artist": { label: "Artist 3" },
        "im:image": [
          { label: "test-image-url-3.jpg" },
          { label: "test-image-url-3.jpg" },
          { label: "test-image-url-3.jpg" },
        ],
        "im:name": "Test Podcast 3",
      },
    ],
    fetchAndSetPodcasts: jest.fn(),
    isLoading: false,
    error: null,
  }),
}));

describe("HomePage Testing with Mocked usePodcastStore", () => {
  test("renders podcast data correctly", () => {
    render(
      <ChakraProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </ChakraProvider>,
    );

    expect(screen.getByAltText("Test Podcast 1")).toBeInTheDocument();
    expect(screen.getByAltText("Test Podcast 1")).toHaveAttribute(
      "src",
      "test-image-url-1.jpg",
    );

    expect(screen.getByText("Author: Artist 1")).toBeInTheDocument();
  });
  test("renders multiple podcasts data correctly", () => {
    render(
      <ChakraProvider>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </ChakraProvider>,
    );

    // Verifica la presencia de todos los podcasts mockeados
    expect(screen.getByAltText("Test Podcast 1")).toBeInTheDocument();
    expect(screen.getByAltText("Test Podcast 2")).toBeInTheDocument();
    expect(screen.getByAltText("Test Podcast 3")).toBeInTheDocument();

    // Verifica que los artistas de todos los podcasts se muestren correctamente
    expect(screen.getByText("Author: Artist 1")).toBeInTheDocument();
    expect(screen.getByText("Author: Artist 2")).toBeInTheDocument();
    expect(screen.getByText("Author: Artist 3")).toBeInTheDocument();
  });
});
