/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Link from "next/link";
import { sanityClient, urlFor } from "../client";
import styled from "styled-components";
import { motion } from "framer-motion";
import Intro from "../components/Intro";

const PortfolioTitle = styled.h2`
  // background: green;
  grid-area: t;
  display: flex;
  align-items: flex-end;
  padding-left: 10px;
  font-size: 30px;
  text-decoration: underline;
`;

const Grid = styled.div`
  opacity: 0.9;
  padding: 70px 40px;
  // background: pink;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
    "t t"
    "a b"
    "c d";
  grid-gap: 1em;

  @media only screen and (max-width: 1024px) {
    padding: 30px 10px;
    grid-template-columns: 1fr;
  }
  @media only screen and (max-width: 834px) {
    padding: 30px 30px;
  }
`;

const Sq = styled.div`
  background: teal;
  padding: 20px;
  border: solid 2px black;
  font-size: 18px;
`;

const WebsiteTitle = styled.h2`
  display: flex;
  font-size: 25px;
`;

const TitleIconWrapper = styled.div`
  display: flex;
`;

const WebsiteDescription = styled.p``;
const WebsiteTags = styled.span``;

const Icon = styled.div`
  font-size: 30px;
  padding-left: 20px;
`;

export const ButtonsWrapper = styled.div``;

export const Button = styled.button`
  background: aquamarine;
  border: 1px solid teal;
  padding: 3px 8px;
`;

const Home = ({ websites }) => {
  return (
    <>
      <Head>
        <title>Elsa Hovey- Development/ Design</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Intro />
        <Grid>
          <PortfolioTitle id="services">Portfolio</PortfolioTitle>
          {websites &&
            websites.map((website, index) => (
              <span key={index}>
                <Sq>
                  <TitleIconWrapper>
                    <WebsiteTitle>{website.websiteTitle}</WebsiteTitle>
                    <Icon>(i)</Icon>
                  </TitleIconWrapper>
                  <WebsiteDescription>{website.description}</WebsiteDescription>
                  <WebsiteTags>{website.tags}</WebsiteTags>
                  <ButtonsWrapper>
                    <Button>
                      <Link href="/">visit site</Link>
                    </Button>
                    <Button>
                      <Link href="/">view code</Link>
                    </Button>
                  </ButtonsWrapper>
                </Sq>
              </span>
            ))}
        </Grid>
      </motion.div>
    </>
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = '*[_type == "websites"] | order(_createdAt asc)';
  const websites = await sanityClient.fetch(query);
  if (!websites.length) {
    return {
      props: {
        websites: [],
      },
    };
  } else {
    return {
      props: {
        websites,
      },
    };
  }
};
