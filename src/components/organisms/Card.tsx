import React from 'react'
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Text
  // Link,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import Link from 'next/link'

const cover =
  'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
const CardBlog = ({ title, details, imageUri, createdAt, id }) => (
  <Link href={`/post/${id}`}>
    <Flex
      bg={useColorModeValue('#F9FAFB', 'gray.600')}
      // p={50}
      w="full"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        mx="auto"
        rounded="lg"
        shadow="md"
        bg={useColorModeValue('white', 'gray.800')}
        maxW="2xl"
      >
        <Image
          roundedTop="lg"
          w="full"
          h={48}
          fit="cover"
          src={imageUri || cover}
          alt="Article"
        />

        <Box p={6}>
          <Box>
            {/*  <chakra.span
              fontSize="xs"
              textTransform="uppercase"
              color={useColorModeValue("brand.600", "brand.400")}
            >
              Product
            </chakra.span> */}
            <Text
              display="block"
              color={useColorModeValue('gray.800', 'white')}
              fontWeight="bold"
              fontSize="2xl"
              mt={2}
              _hover={{ color: 'gray.600', textDecor: 'underline' }}
            >
              {title}
            </Text>
            <chakra.p
              mt={2}
              fontSize="sm"
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              {details}
            </chakra.p>
          </Box>

          <Box mt={4}>
            <Flex alignItems="center">
              <Flex alignItems="center">
                {/*<Image
                  h={10}
                  fit="cover"
                  rounded="full"
                  src="https://images.unsplash.com/photo-1586287011575-a23134f797f9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=48&q=60"
                  alt="Avatar"
                />
                 <Link
                  mx={2}
                  fontWeight="bold"
                  color={useColorModeValue("gray.700", "gray.200")}
                >
                  Jone Doe
                </Link> */}
              </Flex>
              <chakra.span
                mx={1}
                fontSize="sm"
                color={useColorModeValue('gray.600', 'gray.300')}
              >
                {format(new Date(createdAt), 'dd MMM yy')}
              </chakra.span>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Flex>
  </Link>
)

export default CardBlog
