import React from 'react'
import { Link as LinkC, Box, Flex } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import breaks from 'remark-breaks'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import style from './style'
import { useRouter } from 'next/router'
import useFetch from 'use-http'

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
          'padding-left': '4px',
          'padding-right': '4px',
          'padding-bottom': '2px',
          'border-radius': '4px'
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
