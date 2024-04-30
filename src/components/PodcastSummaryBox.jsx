import React from "react";
import { Box, Image, Heading, Text, useColorModeValue } from "@chakra-ui/react";
import PropTypes from "prop-types";

/**
 * Componente que muestra un resumen del podcast incluyendo imagen, título, artista y un breve resumen.
 *
 * @param {object} props - Props del componente.
 * @param {string} props.artworkUrl - URL de la imagen del podcast.
 * @param {string} props.title - Título del podcast.
 * @param {string} props.artist - Artista o creador del podcast.
 * @param {string} [props.summary] - Resumen o descripción del podcast.
 * @returns {JSX.Element} - Elemento JSX que representa el resumen del podcast.
 */
const PodcastSummaryBox = ({ artworkUrl, title, artist, summary }) => {
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Box
      width={{ base: "100%", md: "400px" }}
      bg={bg}
      borderRadius="md"
      p={5}
      position={{ base: "static", md: "sticky" }}
      top="5rem"
      boxShadow="md"
      alignSelf="flex-start"
    >
      <Image
        src={artworkUrl}
        alt={`Cover art for ${title}`}
        borderRadius="md"
        mb={4}
        htmlWidth="100%"
        htmlHeight="auto"
      />
      <Heading size="lg">{title}</Heading>
      <Text fontWeight="bold">By: {artist}</Text>
      <Text mt={2} fontSize="sm" color="gray.500">
        {summary}
      </Text>
    </Box>
  );
};

PodcastSummaryBox.propTypes = {
  artworkUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  summary: PropTypes.string,
};

export default PodcastSummaryBox;
