import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  CircularProgress
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { useUser } from '../../store'
import useFetch from 'use-http'
import { useRouter } from 'next/router'
import React from 'react'
import { Suspense } from 'react'

export default function Login() {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const { post, response, loading } = useFetch('/signin')
  const { setAuth, auth } = useUser()

  const onSubmit = async (data) => {
    // fazer requisição

    await post(data)
    if (response.ok) {
      setAuth(data)
      router.push('/')
    }
  }

  return (
    <Flex
      minH={'50vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}
    >
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Entre e publique!</Heading>
        </Stack>
        <Box
          w="30vw"
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}
        >
          <Stack spacing={4}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl>
                <FormLabel>Username</FormLabel>
                <Input {...register('username')} />
              </FormControl>
              <FormControl mt="4">
                <FormLabel>Password</FormLabel>
                <Input {...register('password')} type="password" />
              </FormControl>
              <Flex justifyContent="center">
                {loading ? (
                  <CircularProgress isIndeterminate color="blue.400" mt="8" />
                ) : (
                  <Button
                    mt="8"
                    type="submit"
                    bg={'blue.400'}
                    color={'white'}
                    _hover={{
                      bg: 'blue.500'
                    }}
                  >
                    ENTRAR
                  </Button>
                )}
                {/*  <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={'blue.400'}>Forgot password?</Link>
              </Stack> */}
              </Flex>
            </form>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
