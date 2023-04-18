import Head from "next/head";
import { Carousel } from '@mantine/carousel';
import { createStyles, Container, Text, Button, Group, rem } from '@mantine/core';
import { Header, Menu, Center, Burger } from '@mantine/core';
import { BrandGithub } from 'tabler-icons-react';

export default function Home() {
  return (
    <>
      <Head>
        <title>Portfolio Manager</title>
        <meta name="description" content="Manage your portfolio with ease." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{}}>
      </div>

      <div style={{ backgroundImage: "url('background-image2.jpg.png')", backgroundSize: "cover", display: "flex", flexDirection: "column", paddingTop: "5%", textAlign: "left", justifyContent: "flex-start"}}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <img width="20%" src="logolayer11.png" alt="logo"></img>
          <ul style={{ display: "flex", justifyContent: "right ", alignSelf: "center", gap: "20%", listStyleType: "none", margin: "0px", padding: "0px" }}>
            <li ><a style={{ color: "white", textDecoration: "none" }} href="default.asp">Home</a></li>
            <li ><a style={{ color: "white", textDecoration: "none" }} href="news.asp">News</a></li>
            <li ><a style={{ color: "white", textDecoration: "none" }} href="contact.asp">Contact</a></li>
            <li ><a style={{ color: "white", textDecoration: "none" }} href="about.asp">About</a></li>
          </ul>
        </div>
        <div style={{ padding: "0% 40% 0% 10%" }}>
          <h1 style={{ color: "white", fontSize: "4rem", lineHeight: 1.3 }}>
            Manage{' '}
            <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
              All Your Assets
            </Text>{' '}
            in one place
          </h1>
        </div>
        <div>
          <Text color="#b4b4b4" style={{ fontSize: "2rem", padding: "0% 55% 0% 10%" }}>
            A comprehensive online platform for managing diverse asset portfolios with ease and efficiency.
          </Text>
        </div>
        <div style={{ display: "flex", marginLeft: "10%" }}>
          <Button
            size="xl"
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
            style={{ margin: "3% 3% 10% 0%" }}
          >
            Get started
          </Button>

          <Button
            href="https://github.com/mantinedev/mantine"
            size="xl"
            variant="default"
            style={{ margin: "3% 3% 10% 0%" }}
            leftIcon={<BrandGithub size={30} />}
          >
            GitHub
          </Button>
        </div>
      </div>
      <div style={{ margin: "0px", padding: "0rem 2.5rem 2rem 2.5rem", color: "white", textAlign: "center", backgroundImage: "url('bg2.jpg')" }}>
        <h1 style={{ padding: "10%", margin: "0", fontSize: "4rem"}}>Features</h1>
        <Carousel
          sx={{ minWidth: "100%" }}
          mx="auto"
          // withIndicators
          height={400}
          slideSize="50%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={2}
        >
          <Carousel.Slide style={{ borderRadius: "2rem", margin: "10px 20px 20px 20px" }} sx={{ backgroundColor: "#D6CFC7" }}>1</Carousel.Slide>
          <Carousel.Slide style={{ borderRadius: "2rem", margin: "10px 20px 20px 20px" }} sx={{ backgroundColor: "#D6CFC7" }}>2</Carousel.Slide>
          <Carousel.Slide style={{ borderRadius: "2rem", margin: "10px 20px 20px 20px" }} sx={{ backgroundColor: "#D6CFC7" }}>3</Carousel.Slide>
          <Carousel.Slide style={{ borderRadius: "2rem", margin: "10px 20px 20px 20px" }} sx={{ backgroundColor: "#D6CFC7" }}>4</Carousel.Slide>
        </Carousel>
        <div style={{marginTop:"7rem"}}>
          <ul style={{borderRadius:"20px",backgroundImage:"linear-gradient(#1E3B70,#29539B)",margin:"0rem 20rem",listStyleType: "none",padding:"10px", display: "flex", justifyContent: "center", gap: "5%"}}>
            <li><a style={{color:"white",textDecoration:"none",fontSize:"1.2rem"}} href="#">Home</a></li>
            <li><a style={{color:"white",textDecoration:"none",fontSize:"1.2rem"}} href="#">About</a></li>
            <li><a style={{color:"white",textDecoration:"none",fontSize:"1.2rem"}} href="#">Services</a></li>
            <li><a style={{color:"white",textDecoration:"none",fontSize:"1.2rem"}} href="#">Team</a></li>
            <li><a style={{color:"white",textDecoration:"none",fontSize:"1.2rem"}} href="#">Contact</a></li>
          </ul>
        </div>
      </div>
    </>
  );
}
