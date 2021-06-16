import React from 'react'
import { Flex } from '@chakra-ui/react'
import dynamic from 'next/dynamic'
import MarkdownIt from 'markdown-it'
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
})

// import style manually
import 'react-markdown-editor-lite/lib/index.css'

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */)

// Finish!
function handleEditorChange({ html, text }) {
  console.log(text)
}

const Edit = () => {
  return (
    <Flex
      flex={1}
      alignItems="center"
      justifyContent="center"
      p="12"
      flexDir="column"
    >
      <MdEditor
        style={{ height: '70vh', width: '80vw' }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={handleEditorChange}
      />
    </Flex>
  )
}

export default Edit
