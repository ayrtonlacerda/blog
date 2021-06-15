import React from "react";
import { Flex } from "@chakra-ui/react";
import { CardBlog, Grid, CardRecent } from "../../components/organisms";
// import { Container } from './styles';

const Home: React.FC = () => {
  return (
    <Flex flexDirection="column" paddingTop="16" bg="#f9fafb">
      <CardRecent />
      <Grid>
        <CardBlog />
        <CardBlog />
        <CardBlog />
      </Grid>
    </Flex>
  );
};

export default Home;
