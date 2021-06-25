import React from 'react'
import { Flex } from '@chakra-ui/react'
import useFetch from 'use-http'
import { CardBlog, Grid, CardRecent } from '../../components/organisms'

const Home: React.FC = () => {
  const {
    data: dataPosts,
    loading: loadingPosts,
    error,
    response
  } = useFetch('/posts', {}, [])

  const { data: dataRecent, loading: loadingRecent } = useFetch(
    '/recent',
    {},
    []
  )

  console.log({ error, loadingPosts, response })

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
