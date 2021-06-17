import '../styles/globals.css'
import { ChakraProvider, ColorModeScript, CSSReset } from '@chakra-ui/react'
import { DndProvider, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import theme from '../styles/index'
import { Flex } from '@chakra-ui/react'
import { Provider } from 'use-http'

import { Header, Footer } from '../components/organisms'

function MyApp({ Component, pageProps }) {
  return (
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
  )
}

export default MyApp
