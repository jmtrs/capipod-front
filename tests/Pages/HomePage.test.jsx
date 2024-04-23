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
        id: "123",
        title: "Test Podcast 1",
        artist: "Artist 1",
        images: [
          { 
            height: "170",
            url: "test-image-url-1.jpg" 
          },
          { 
            height: "170",
            url: "test-image-url-1.jpg" 
          },
          { 
            height: "170",
            url: "test-image-url-1.jpg" 
          }
        ],
        name: "Test Podcast 1",
      },
      {
        id: "456",
        title: "Test Podcast 2",
        artist: "Artist 2",
        images: [
          { 
            height: "170",
            url: "test-image-url-2.jpg" 
          },
          { 
            height: "170",
            url: "test-image-url-2.jpg" 
          },
          { 
            height: "170",
            url: "test-image-url-2.jpg" 
          }
        ],
        name: "Test Podcast 2",
      },
      {
        id: "789",
        title: "Test Podcast 3",
        artist: "Artist 3",
        images: [
          { 
            height: "170",
            url: "test-image-url-3.jpg" 
          },
          { 
            height: "170",
            url: "test-image-url-3.jpg" 
          },
          { 
            height: "170",
            url: "test-image-url-3.jpg" 
          }
        ],
        name: "Test Podcast 3",
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
