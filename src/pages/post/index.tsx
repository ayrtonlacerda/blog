import React from 'react'
import { Link as LinkC, Box, Flex } from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import breaks from 'remark-breaks'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import style from './style'

const components: ReactMarkdownOptions = {
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
    console.log({ children, inline })
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
  const [markdown1, setMarkdown] = React.useState('null')

  React.useEffect(() => {
    const p = async () => {
      try {
        const content = await import('./test.md')

        setMarkdown(content.default)
      } catch (error) {
        console.log({ error })
      }
    }
    p()
  })

  return (
    <Flex
      flex={1}
      sx={style}
      alignItems="center"
      justifyContent="center"
      p="12"
      px="60"
    >
      <div>
        <ReactMarkdown
          components={components}
          transformLinkUri={(href, children, title) => (
            <LinkC href={href} color="#f734a9">
              {children}
            </LinkC>
          )}
          linkTarget={(href, children, title) => (
            <LinkC href={href} color="#f734a9">
              {children}
            </LinkC>
          )}
          plugins={[[gfm, { singleTilde: true }]]}
          rehypePlugins={[rehypeRaw]}
          remarkPlugins={[gfm, breaks]}
        >
          {markdown1}
        </ReactMarkdown>
      </div>
    </Flex>
  )
}

export default Post
