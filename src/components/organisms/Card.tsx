import React from 'react'
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Text,
  Button
  // Link,
} from '@chakra-ui/react'
import { format } from 'date-fns'
import Link from 'next/link'
import { useUser } from 'store'

const cover =
  'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
const CardBlog = ({ title, details, imageUri, createdAt, id }) => {
  const { auth } = useUser()

  return (
    <Link href={`/post/${id}`}>
      <Flex w="full" alignItems="center" justifyContent="center">
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
            {auth && (
              <Flex justifyContent="space-between">
                <Button
                  onClick={() => {}}
                  width="47%"
                  marginY="8"
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'red.400'}
                  color={'white'}
                  boxShadow={
                    '0px 1px 25px -5px rgb(255 153 225 / 48%), 0 10px 10px -5px rgb(255 153 225 / 43%)'
                  }
                  _hover={{
                    bg: 'red.500'
                  }}
                  _focus={{
                    bg: 'red.500'
                  }}
                >
                  DELETAR
                </Button>
                <Button
                  onClick={() => {}}
                  width="47%"
                  marginY="8"
                  fontSize={'sm'}
                  rounded={'full'}
                  bg={'blue.400'}
                  color={'white'}
                  boxShadow={
                    '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
                  }
                  _hover={{
                    bg: 'blue.500'
                  }}
                  _focus={{
                    bg: 'blue.500'
                  }}
                >
                  ESCONDER
                </Button>
              </Flex>
            )}
          </Box>
        </Box>
      </Flex>
    </Link>
  )
}

export default CardBlog
