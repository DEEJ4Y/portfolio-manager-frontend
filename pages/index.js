import Head from "next/head";
import { createStyles, Container, Text, Button, Group, rem } from '@mantine/core';
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
        <div style={{backgroundImage:"url('background-image2.jpg.png')",backgroundSize:"cover",display: "flex",flexDirection: "column", paddingTop: "5%", textAlign: "left", justifyContent: "flex-start" }}>
          <div style={{ padding: "0% 40% 0% 10%"}}>
            <h1 style={{ color:"white",fontSize: "4rem" ,lineHeight:1.3}}>
              Manage{' '}
              <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
                All Your Assets
              </Text>{' '}
              in one place
            </h1>
          </div>
          <div>
            <Text color="dimmed" style={{ fontSize: "2rem", padding: "0% 55% 0% 10%" }}>
            A comprehensive online platform for managing diverse asset portfolios with ease and efficiency.
            </Text>
          </div>
          <div style={{display:"flex",marginLeft:"10%"}}>
            <Button
              size="xl"
              variant="gradient"
              gradient={{ from: 'blue', to: 'cyan' }}
              style = {{margin:"3% 3% 10% 0%"}}
            >
              Get started
            </Button>

            <Button
              href="https://github.com/mantinedev/mantine"
              size="xl"
              variant="default"
              style = {{margin:"3% 3% 10% 0%"}}
            leftIcon={<BrandGithub size={30} />}
            >
              GitHub
            </Button>
          </div>
        {/* </div> */}
      </div>
    </>
  );
}
