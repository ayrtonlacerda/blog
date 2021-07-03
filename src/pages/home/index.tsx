import React from 'react'
import { Flex, useColorModeValue } from '@chakra-ui/react'
import useFetch from 'use-http'
import { CardBlog, Grid, CardRecent } from '../../components/organisms'

const Home: React.FC = () => {
  const color = useColorModeValue('bg', '#0e1218')
  const {
    data: dataPosts,
    loading: loadingPosts,
    error,
    response
  } = useFetch('/posts', {}, [])

  const { data: dataRecent, loading: loadingRecent } = useFetch(
    '/posts?recent=true',
    {},
    []
  )

  let ii = 1
  return (
    <Flex flexDirection="column" paddingTop="12" bg={color}>
      {dataRecent && <CardRecent {...dataRecent} />}
      <Grid>
        {dataPosts?.map((post, i) => {
          if (i / 3 == ii) {
            ii++
          }
          return <CardBlog {...post} index={ii} />
        })}
      </Grid>
    </Flex>
  )
}

export default Home
