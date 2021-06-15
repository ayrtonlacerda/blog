import React from "react";
import {
  chakra,
  Box,
  SimpleGrid,
  Flex,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";

const Grid = ({ children }) => {
  return (
    <Flex
      bg={useColorModeValue("#F9FAFB", "gray.600")}
      p={20}
      w="auto"
      justifyContent="center"
      alignItems="center"
    >
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={12}
        px={{ base: 4, lg: 8, xl: 12 }}
        py={{ base: 4, lg: 8, xl: 12 }}
        mx="auto"
        bg={useColorModeValue("white", "gray.800")}
        shadow="xl"
      >
        {children}
      </SimpleGrid>
    </Flex>
  );
};

export default Grid;
