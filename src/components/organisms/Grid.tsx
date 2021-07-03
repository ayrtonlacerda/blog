import React from 'react'
import {
  chakra,
  Box,
  SimpleGrid,
  Flex,
  useColorModeValue,
  Icon,
  theme
} from '@chakra-ui/react'
import invert from 'invert-color'

const Grid = ({ children }) => {
  const color = useColorModeValue('bg', '#0e1218')
  return (
    <Flex
      bg={color}
      py={10}
      px={20}
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
        bg={color}
      >
        {children}
      </SimpleGrid>
    </Flex>
  )
}

export default Grid
