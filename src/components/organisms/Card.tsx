import React, { useEffect } from 'react'
import {
  chakra,
  Box,
  Image,
  Flex,
  useColorModeValue,
  Text,
  Button,
  Link as LinkChakra
} from '@chakra-ui/react'
import { format } from 'date-fns'
import Link from 'next/link'
import { useUser } from 'store'
import {
  motion,
  transform,
  useMotionValue,
  useViewportScroll
} from 'framer-motion'

const cover =
  'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'

function debounce(func, wait) {
  let timer = null
  return function () {
    clearTimeout(timer)
    timer = setTimeout(func, wait)
  }
}

const CardBlog = ({ title, details, imageUri, createdAt, id, index }) => {
  const { scrollY } = useViewportScroll()
  const { auth } = useUser()

  const color = useColorModeValue(
    'rgb(100 100 100 / 30%)',
    'rgb(100 100 100 / 15%)'
  )

  const [scrollPosition, setScrollPosition] = React.useState(0)
  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  var body = document.body,
    html = document.documentElement

  var height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  )

  console.log({
    index,
    scrollPosition,
    h: window.innerHeight,
    h2: height
  })
  // get scroll position in px

  return (
    <motion.div
      transition={{ duration: 0.3, type: 'spring' }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={{
          scale:
            scrollPosition / ((index - 1) * (window.innerHeight / 2)) <= 1
              ? scrollPosition / ((index - 1) * window.innerHeight)
              : scrollPosition / index <
                window.innerHeight / (index === 1 ? 20 : 3)
              ? 0
              : 1
        }}
        initial={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <LinkChakra>
          <Link href={`/post/${id}`}>
            <Flex w="full" alignItems="left" justifyContent="center">
              <Box
                mx="auto"
                rounded="lg"
                boxShadow={`0px 11px 25px 0px ${color}, 0 10px 15px -8px  ${color}`}
                bg={useColorModeValue('white', 'gray.800')}
                w="2xl"
                h="sm"
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
                      isTruncated
                      mt={2}
                      w="xs"
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
        </LinkChakra>
      </motion.div>
    </motion.div>
  )
}

const CardBlogMotion = motion(CardBlog)

export default CardBlogMotion
