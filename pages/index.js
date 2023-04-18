import Head from "next/head";
import { Carousel } from "@mantine/carousel";
import {
  createStyles,
  Container,
  Text,
  Button,
  Group,
  rem,
} from "@mantine/core";
import { Header, Menu, Center, Burger } from "@mantine/core";
import { BrandGithub } from "tabler-icons-react";
import { BrandInstagram } from 'tabler-icons-react';
import { BrandTwitter } from 'tabler-icons-react';
import { BrandMeta } from 'tabler-icons-react';
import { CurrentLocation } from 'tabler-icons-react';
import { Phone } from 'tabler-icons-react';
import { Mail } from 'tabler-icons-react';
import { BrandGmail } from 'tabler-icons-react';
import Link from "next/link";
// import dotenv from "dotenv";
// dotenv.config();
export default function Home() {
  return (
    <>
      <Head>
        <title>Portfolio Manager</title>
        <meta name="description" content="Manage your portfolio with ease." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div style={{}}></div>

      <div
        style={{
          backgroundImage: "url('background-image2.jpg.png')",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          paddingTop: "5%",
          textAlign: "left",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <img width="20%" src="logolayer11.png" alt="logo"></img>
          <ul
            style={{
              display: "flex",
              justifyContent: "right ",
              alignSelf: "center",
              gap: "20%",
              listStyleType: "none",
              margin: "0px",
              padding: "0px",
            }}
          >
            <li>
              <a
                style={{ color: "white", textDecoration: "none" }}
                href="default.asp"
              >
                Home
              </a>
            </li>
            <li>
              <a
                style={{ color: "white", textDecoration: "none" }}
                href="login"
              >
                Login
              </a>
            </li>
            <li>
              <a
                style={{ color: "white", textDecoration: "none" }}
                href="#features"
              >
                Features
              </a>
            </li>
            <li>
              <a
                style={{ color: "white", textDecoration: "none" }}
                href="#Contact"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div style={{ padding: "0% 40% 0% 10%" }}>
          <h1 style={{ color: "white", fontSize: "4rem", lineHeight: 1.3 }}>
            Manage{" "}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              inherit
            >
              All Your Assets
            </Text>{" "}
            in one place
          </h1>
        </div>
        <div>
          <Text
            color="#b4b4b4"
            style={{ fontSize: "2rem", padding: "0% 55% 0% 10%" }}
          >
            A comprehensive online platform for managing diverse asset
            portfolios with ease and efficiency.
          </Text>
        </div>
        <div style={{ display: "flex", marginLeft: "10%" }}>
          <Link href="/register" style={{ margin: "3% 3% 10% 0%" }}>
            <Button
              size="xl"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
            >
              Get started
            </Button>
          </Link>

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
      <div id="features"
        style={{
          margin: "0px",
          padding: "0rem 2.5rem 2rem 2.5rem",
          color: "white",
          textAlign: "center",
          backgroundImage: "url('bg2.jpg')",
        }}
      >
        <h1 style={{ padding: "10%", margin: "0", fontSize: "4rem" }}>
          Features
        </h1>
        <Carousel
          sx={{ minWidth: "100%" }}
          mx="auto"
          // withIndicators
          height={400}
          slideSize="80%"
          slideGap="md"
          loop
          align="start"
          slidesToScroll={1}
        >
          <Carousel.Slide
            style={{ borderRadius: "2rem", margin: "10px 20px 20px 20px" }}
            sx={{ backgroundColor: "#D6CFC7" }}
          >
            <div style={{display:"flex",justifyContent:"center",gap:"10px",alignItems:"center"}}>
            <img style={{borderRadius:"100px",width:"50%", padding:"4rem"}}src="crypto.jpg"></img>
            <div style={{textAlign:"left"}}>
            <h1 style={{fontSize:"4rem",margin:"5px",top:"10px",color:"Black"}}>CryptoCurrency</h1>
            <h3 style={{fontSize:"1rem",margin:"0",color:"#333"}}>Cryptocurrency transactions are managed through a decentralized network of computers that use cryptographic techniques to verify and record transactions in a public ledger called the blockchain.</h3>
            </div>
            </div>
          </Carousel.Slide>
          <Carousel.Slide
            style={{ borderRadius: "2rem", margin: "10px 20px 20px 20px" }}
            sx={{ backgroundColor: "#D6CFC7" }}
          >
            <div style={{display:"flex",justifyContent:"center",gap:"10px",alignItems:"center"}}>
            <img style={{borderRadius:"100px",width:"50%", padding:"4rem"}}src="fd.jpeg"></img>
            <div style={{textAlign:"left"}}>
            <h1 style={{fontSize:"4rem",margin:"5px",top:"10px",color:"Black"}}>Fixed Deposits</h1>
            <h3 style={{fontSize:"1rem",margin:"0",color:"#333"}}>Allows users to easily create and manage fixed deposit accounts, track their interest earnings, and receive notifications for maturity and renewal. This provides a secure and hassle-free way for individuals to save and earn interest on their deposits.</h3>
            </div>
            </div>
          </Carousel.Slide>
          <Carousel.Slide
            style={{ borderRadius: "2rem", margin: "10px 20px 20px 20px" }}
            sx={{ backgroundColor: "#D6CFC7" }}
          >
            <div style={{display:"flex",justifyContent:"center",gap:"10px",alignItems:"center"}}>
            <img style={{borderRadius:"100px",width:"50%", padding:"4rem"}}src="funds.jpeg"></img>
            <div style={{textAlign:"left"}}>
            <h1 style={{fontSize:"4rem",margin:"5px",top:"10px",color:"Black"}}>Mutual Funds</h1>
            <h3 style={{fontSize:"1rem",margin:"0",color:"#333"}}>Allows users to easily invest in a range of funds, track their portfolio performance, and make adjustments as needed. This provides a convenient and accessible way for individuals to grow their investments and achieve their financial goals.</h3>
            </div>
            </div>
          </Carousel.Slide>
          <Carousel.Slide
            style={{ borderRadius: "2rem", margin: "10px 20px 20px 20px" }}
            sx={{ backgroundColor: "#D6CFC7" }}
          >
            <div style={{display:"flex",justifyContent:"center",gap:"10px",alignItems:"center"}}>
            <img style={{borderRadius:"100px",width:"50%", padding:"4rem"}}src="realestate.jpeg"></img>
            <div style={{textAlign:"left"}}>
            <h1 style={{fontSize:"4rem",margin:"5px",top:"10px",color:"Black"}}>Real Estate</h1>
            <h3 style={{fontSize:"1rem",margin:"0",color:"#333"}}>allows property owners to efficiently manage their properties, including tasks such as rent collection, lease agreements, maintenance requests, and financial reporting. This helps property owners streamline their operations and maximize their returns on investment.</h3>
            </div>
            </div>
          </Carousel.Slide>
          <Carousel.Slide
            style={{ borderRadius: "2rem", margin: "10px 20px 20px 20px" }}
            sx={{ backgroundColor: "#D6CFC7" }}
          >
            <div style={{display:"flex",justifyContent:"center",gap:"10px",alignItems:"center"}}>
            <img style={{borderRadius:"100px",width:"50%", padding:"4rem"}}src="stocks.jpeg"></img>
            <div style={{textAlign:"left"}}>
            <h1 style={{fontSize:"4rem",margin:"5px",top:"10px",color:"Black"}}>Stocks</h1>
            <h3 style={{fontSize:"1rem",margin:"0",color:"#333"}}>provides users with real-time stock data, investment analysis, and trading tools to help them make informed decisions about their portfolio. This enables investors to monitor and manage their stocks efficiently and effectively from anywhere, at any time.</h3>
            </div>
            </div>
          </Carousel.Slide>
        </Carousel>
        <div style={{marginTop:"12rem",display:"flex",justifyContent:"space-between",gap:"10px"}}>
          <div style={{flexBasis:"30%"}}>
          <img width="50%" src="logolayer11.png" alt="logo"></img><br></br>
          <p>Past performance is not indicative of future results and diversification does not guarantee investment returns or eliminate the risk of loss. Consider consulting an investment professional before making any investment decisions.</p><br></br>
          
          </div>
          <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px"}}>
          <BrandInstagram size={30} /><BrandMeta size={30} /><BrandTwitter size={30} />
          </div>
          <div style={{display:"none",flexDirection:'column',justifyContent:"space-between",flexBasis:"30%"}}>
            <h2>Useful Links</h2>
            <div style={{display:"flex",justifyContent:"center",gap:"10px"}}>
                <ul style={{listStyleType:"none"}}>
                  <li>Link 1</li>
                  <li>Link 1</li>
                  <li>Link 1</li>
                </ul>
                <ul style={{listStyleType:"none"}}>
                  <li>Link 1</li>
                  <li>Link 1</li>
                  <li>Link 1</li>
                </ul>
            </div>
          </div>
          <div id = "Contact" style={{display:"flex",flexDirection:'column',justifyContent:"flex-start",gap:"15px",flexBasis:"30%"}}>
              <h2 styles={{margin:"0"}}>Contact Info</h2>
              <div style={{display:"flex",justifyContent:"center",gap:"10px",alignContent:"flex-start"}}>
              <CurrentLocation size={30} /><Mail size={30} /><Phone size={30} />
              </div>
              
              <div style={{display:"flex",flexDirection:"column",justifyContent:"space-around",alignContent:"flex-start"}}>
              <p style={{margin:"0"}}>+91 9936547263</p><p style={{margin:"0"}}>ABC University,XYZ</p><p style={{margin:"0"}}>abhaypr@gmail.org.com</p>
              </div>

          </div>
        </div>
      </div>
    </>
  );
}
