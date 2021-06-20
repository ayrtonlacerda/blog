import React from 'react'
import {
  chakra,
  HStack,
  // Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Box,
  Flex,
  IconButton,
  useColorModeValue,
  useDisclosure,
  CloseButton,
  VStack,
  Button,
  useColorMode,
  SimpleGrid,
  Stack,
  Spacer
} from '@chakra-ui/react'
import Link from 'next/link'
import { useViewportScroll } from 'framer-motion'
import { useUser } from '../../store'

import { IoIosArrowDown } from 'react-icons/io'
import { AiFillHome, AiOutlineInbox, AiOutlineMenu } from 'react-icons/ai'
import { BsFillCameraVideoFill } from 'react-icons/bs'
import { FaMoon, FaSun } from 'react-icons/fa'

import Logo from './Logo'

const Header = (props) => {
  const { toggleColorMode: toggleMode } = useColorMode()
  const { auth, setAuth } = useUser()
  const text = useColorModeValue('dark', 'light')
  const SwitchIcon = useColorModeValue(FaMoon, FaSun)
  const bg = useColorModeValue('white', 'gray.800')
  const ref = React.useRef()
  const [y, setY] = React.useState(0)
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {}

  const { scrollY } = useViewportScroll()
  React.useEffect(() => {
    return scrollY.onChange(() => setY(scrollY.get()))
  }, [scrollY])
  const cl = useColorModeValue('gray.800', 'white')
  const mobileNav = useDisclosure()

  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? 'flex' : 'none'}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Button w="full" variant="ghost" leftIcon={<AiFillHome />}>
        Dashboard
      </Button>
      <Button
        w="full"
        variant="solid"
        colorScheme="brand"
        leftIcon={<AiOutlineInbox />}
      >
        Inbox
      </Button>
      <Button w="full" variant="ghost" leftIcon={<BsFillCameraVideoFill />}>
        Videos
      </Button>
    </VStack>
  )

  return (
    <React.Fragment>
      <chakra.header
        ref={ref}
        transition="box-shadow 0.2s"
        //  bg={bg}
        bg="#f9fafb"
        w="full"
        overflowY="hidden"
        position="absolute"
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex align="flex-start">
              <Link href="/">
                <HStack>
                  <Logo />
                </HStack>
              </Link>
            </Flex>
            <Flex marginLeft={50}>
              <HStack spacing="5" display={{ base: 'none', md: 'flex' }}>
                <Link href="/">
                  <Button
                    bg="none"
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}
                  >
                    Blog
                  </Button>
                </Link>

                <Link href="/about">
                  <Button
                    bg="none"
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{ color: cl }}
                    _focus={{ boxShadow: 'none' }}
                  >
                    Sobre Mim
                  </Button>
                </Link>
                {auth && (
                  <Link href="/edit">
                    <Button
                      bg="none"
                      color="gray.500"
                      display="inline-flex"
                      alignItems="center"
                      fontSize="md"
                      _hover={{ color: cl }}
                      _focus={{ boxShadow: 'none' }}
                    >
                      Edição
                    </Button>
                  </Link>
                )}
              </HStack>
            </Flex>
            <Spacer />
            <Flex justify="flex-end" align="center" color="gray.400">
              {auth && (
                <Button
                  onClick={() => setAuth(false)}
                  colorScheme="brand"
                  variant="ghost"
                  size="sm"
                  bg="red.400"
                  color="white"
                  _hover={{ color: cl }}
                  _focus={{ boxShadow: 'none' }}
                >
                  SAIR
                </Button>
              )}

              {/*  <HStack spacing="5" display={{ base: "none", md: "flex" }}>
                <Button colorScheme="brand" variant="ghost" size="sm">
                  Sign in
                </Button>
                <Button colorScheme="brand" variant="solid" size="sm">
                  Sign up
                </Button>
              </HStack> */}
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={{ base: '0', md: '3' }}
                onClick={toggleMode}
                icon={<SwitchIcon />}
              />
            </Flex>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </React.Fragment>
  )
}

export default Header
