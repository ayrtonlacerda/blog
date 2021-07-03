import React from 'react'
import {
  Flex,
  Input,
  Button,
  chakra,
  FormControl,
  FormHelperText,
  FormLabel,
  GridItem,
  InputGroup,
  InputLeftAddon,
  SimpleGrid,
  Stack,
  Textarea,
  useColorModeValue
} from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import MarkdownIt from 'markdown-it'
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})
import { useForm } from 'react-hook-form'
import useFetch from 'use-http'

import { IKImage, IKContext, IKUpload } from 'imagekitio-react'

// import style manually
import 'react-markdown-editor-lite/lib/index.css'

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

// Finish!

const Edit = () => {
  const [md, setMd] = React.useState(null)
  const { post, loading, error, response } = useFetch(
    `http://127.0.0.1:8081/new-post`
  )
  const { handleSubmit, register } = useForm()
  const onSubmit = async (data) => {
    console.log({ data })
    if (!md || !data?.title || !data?.imageUri || !data?.details) return

    const fd = new FormData()

    fd.append('title', data.title)
    fd.append('details', data.details)
    fd.append('imageUri', data.imageUri)
    fd.append('md', md)

    await post(fd)
  }

  const handleEditorChange = ({ html, text }) => {
    setMd(text)
  }

  console.log({ loading, response, md })

  return (
    <Flex
      flex={1}
      alignItems="center"
      justifyContent="center"
      p="12"
      flexDir="column"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack w="80vw" spacing={4} mb="6">
          <FormControl as={GridItem} colSpan={[3, 2]}>
            <IKContext
              publicKey="public_TAIiaXRCB7QdqPAHkvv6Sb2sZAE="
              urlEndpoint="https://ik.imagekit.io/tonton"
              transformationPosition="path"
              authenticationEndpoint="http://www.yourserver.com/auth"
            >
              <IKImage
                path="/default-image.jpg"
                transformation={[
                  {
                    height: '300',
                    width: '400'
                  }
                ]}
              />
              <IKUpload fileName="my-upload" />
            </IKContext>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color={useColorModeValue('gray.700', 'gray.50')}
            >
              Titulo:
            </FormLabel>
            <InputGroup size="sm" mb="4">
              <Input
                {...register('title')}
                name="title"
                type="tel"
                placeholder="Um Bom Titulo Para um Blog"
                focusBorderColor="brand.400"
                rounded="md"
              />
            </InputGroup>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color={useColorModeValue('gray.700', 'gray.50')}
            >
              Image URL:
            </FormLabel>
            <InputGroup size="sm">
              <InputLeftAddon
                children="http://"
                bg={useColorModeValue('gray.50', 'gray.800')}
                color={useColorModeValue('gray.500', 'gay.50')}
                rounded="md"
              />
              <Input
                {...register('imageUri')}
                name="imageUri"
                type="tel"
                placeholder="www.example.com"
                focusBorderColor="brand.400"
                rounded="md"
              />
            </InputGroup>
          </FormControl>
          <FormControl id="email" mt={1}>
            <FormLabel
              fontSize="sm"
              fontWeight="md"
              color={useColorModeValue('gray.700', 'gray.50')}
            >
              Detalhes
            </FormLabel>
            <Textarea
              {...register('details')}
              name="details"
              placeholder="you@example.com"
              mt={1}
              rows={3}
              shadow="sm"
              focusBorderColor="brand.400"
              fontSize={{ sm: 'sm' }}
            />
          </FormControl>
        </Stack>

        <MdEditor
          style={{ height: '70vh', width: '80vw' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />

        <Button
          //flex={1}
          type="submit"
          onClick={() => {}}
          width="96"
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
          SALVAR
        </Button>
      </form>
    </Flex>
  )
}

export default Edit
