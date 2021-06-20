import React from 'react'
import { Flex } from '@chakra-ui/react'
import useFetch from 'use-http'
import { CardBlog, Grid, CardRecent } from '../../components/organisms'

const Home: React.FC = () => {
  const { data: dataPosts, loading: loadingPosts } = useFetch('/posts', {}, [])

  const { data: dataRecent, loading: loadingRecent } = useFetch(
    '/recent',
    {},
    []
  )

  return (
    <Flex flexDirection="column" paddingTop="16" bg="#f9fafb">
      {dataRecent && <CardRecent {...dataRecent} />}
      <Grid>
        {dataPosts?.map((post) => (
          <CardBlog {...post} />
        ))}
      </Grid>
    </Flex>
  )
}

export default Home
