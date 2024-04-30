import React from "react";
import { Center, Spinner, Text } from "@chakra-ui/react";
import PropTypes from "prop-types";

/**
 * Componente que muestra un indicador de carga (spinner) con un mensaje opcional.
 *
 * @param {object} props - Props del componente.
 * @param {string} [props.message="Loading..."] - Mensaje personalizado que se muestra debajo del spinner.
 * @returns {JSX.Element} - Elemento JSX que muestra un spinner y un mensaje de carga.
 */
const Loading = ({ message = "Loading..." }) => {
  return (
    <Center flexDirection="column" height="100vh">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
      <Text mt={4}>{message}</Text>
    </Center>
  );
};

Loading.propTypes = {
  message: PropTypes.string, // Define que message es un string y es opcional.
};

export default Loading;
