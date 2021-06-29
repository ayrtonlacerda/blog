import React from 'react'
import { Link as LinkC, Box, Flex } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import breaks from 'remark-breaks'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { useRouter } from 'next/router'
import useFetch from 'use-http'

const style = {
  h1: {
    'font-weight': 'bold',
    'font-size': '32px'
  },

  h2: {
    'font-weight': 'bold',
    'font-size': '28px'
  },

  h3: {
    'font-weight': 'bold',
    'font-size': '24px'
  },

  h4: {
    'font-weight': 'bold',
    'font-size': '20px'
  },

  h5: {
    'font-weight': 'bold',
    'font-size': '16px'
  }
}

// TODO: colocar em components
const components = {
  blockquote: ({ children }) => (
    <Box
      bg="#ededed"
      pl="4"
      borderRadius="sm"
      borderLeftWidth="4px"
      borderLeftColor="#bbb"
    >
      {children}
    </Box>
  ),
  a: ({ href, children }) => {
    return (
      <LinkC href={href} color="#f734a9">
        {children}
      </LinkC>
    )
  },
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '')
    return !inline && match ? (
      <SyntaxHighlighter
        style={dracula}
        language={match[1]}
        PreTag="div"
        children={String(children).replace(/\n$/, '')}
        {...props}
      />
    ) : (
      <code
        className={className}
        {...props}
        style={{
          backgroundColor: '#ededed',
          paddingLeft: '4px',
          paddingRight: '4px',
          paddingBottom: '2px',
          borderRadius: '4px'
        }}
      >
        {children}
      </code>
    )
  }
}

const Post = () => {
  const router = useRouter()
  const { pid } = router.query
  const { data, loading, error } = useFetch(`/post/${pid}`, {}, [])

  console.log({ data, pid, error })

  return (
    <Flex
      flex={1}
      sx={style}
      alignItems="center"
      justifyContent="center"
      p="12"
      px="60"
    >
      {data && (
        <div>
          <ReactMarkdown
            // @ts-ignore
            components={components}
            plugins={[[gfm, { singleTilde: true }]]}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[gfm, breaks]}
          >
            {data.md}
          </ReactMarkdown>
        </div>
      )}
    </Flex>
  )
}

export default Post
