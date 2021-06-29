import '../styles/globals.css'
import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react'
import { DndProvider, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import theme from '../styles/index'
import { Flex } from '@chakra-ui/react'
import { Provider } from 'use-http'
import { useUser } from 'store'

import { Header, Footer } from '../components/organisms'

function MyApp({ Component, pageProps }) {
  const { auth } = useUser()
  console.log({ auth })
  return (
    <Provider url="https://blog-ayrton.herokuapp.com/">
      <ChakraProvider theme={theme}>
        <Header />
        <Flex
          direction="column"
          flex="1"
          justifyContent="space-between"
          bg="#f9fafb"
          h="100vh"
          paddingTop="16"
        >
          <Component {...pageProps} />
          <Footer />
        </Flex>
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
