/* eslint-disable @next/next/no-img-element */
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { sanityClient, urlFor } from "../client";
import { motion } from "framer-motion";
import Intro from "../components/Intro";
import { AiFillGithub, AiOutlineLink } from "react-icons/ai";
import { IconWrapper, Icon } from "../components/styles/reactIcons.styled";
import { Title } from "../components/styles/title.styled";
import { Button } from "../components/styles/button.styled";
import { Sq } from "../components/styles/containers.styled";
import { Flex } from "../components/styles/flex.styled";
import Timeline from "../components/Timeline";
import Skills from "../components/Skills";
import styled from "styled-components";
import ContactForm from "../components/ContactForm";
import PortfolioPic from "../public/images/portfolio-pic.jpg";

export const PortfolioGrid = styled.div`
  opacity: 0.9;
  padding: 10px 40px;
  // background: pink;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;

  @media only screen and (max-width: 1024px) {
    padding: 30px 10px;
    grid-template-columns: 1fr;
  }
  @media only screen and (max-width: 834px) {
    padding: 30px 30px;
  }
`;

export const Grid = styled.div`
  // border: solid 2px #000;
  margin: 5px 25px;
  // background: teal;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-areas: "left right";
  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-template-areas:
      "left"
      " right";
  }
`;

export const LeftSide = styled.div`
  grid-area: left;
  // border-right: solid 1px #000;
  // background: coral;
`;
export const RightSide = styled.div`
  grid-area: right;
  // border-left: solid 1px #000;
  // background: teal;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 340px;
  // height: 500px;
  // border: solid 2px #000;

  @media only screen and (max-width: 1024px) {
    width: 250px;
    height: 350px;
  }
`;

const Home = ({ websites }) => {
  return (
    <>
      <Head>
        <title>Elsa Hovey- Portfolio</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Intro />
        {/* WORKS */}
        <Title id="works">Works</Title>
        <PortfolioGrid>
          {websites &&
            websites.map((website, index) => (
              <span key={index}>
                <Sq>
                  <Flex>
                    <h3>{website.websiteTitle}</h3>
                    <Icon>(i)</Icon>
                  </Flex>
                  <div>{website.description}</div>
                  <div>{website.tags}</div>
                  <Flex>
                    <Button>
                      <Link href={website.projectLink}>visit site</Link>
                      <IconWrapper>
                        <AiOutlineLink />
                      </IconWrapper>
                    </Button>
                    <Button>
                      <Link href={website.codeLink}>view code</Link>
                      <IconWrapper>
                        <AiFillGithub />
                      </IconWrapper>
                    </Button>
                  </Flex>
                </Sq>
              </span>
            ))}
        </PortfolioGrid>
        {/* ABOUT */}
        <Title id="about">About</Title>
        <p style={{ padding: "5px 50px", borderBottom: "solid 1px #000" }}>
          I currently work as a self-employed, indie web developer. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Reiciendis,
          necessitatibus cupiditate, dolore exceptu
        </p>
        <Grid>
          <Timeline />
          <Skills />
        </Grid>
        {/* CONTACT */}
        <Title id="contact">Contact</Title>
        <Flex>
          <ImageWrapper>
            <Image
              src={PortfolioPic}
              alt="elsa hovey"
              // width="440px"
              // height="600px"
              layout="responsive"
              style={{ position: "absolute" }}
            />
          </ImageWrapper>
          <ContactForm />
        </Flex>
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
