import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
  } from '@mantine/core';
  
  export default function registerPage() {
    return (
      <Container size={520} my={40} style={{padding:"30px 20px",borderRadius:"10px",boxShadow:"0px 0px 20px lightgray"}}>
        <Title
          align="center"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
        >
          <img width="50%" src="logolayer11.png" alt="logo"></img><br></br>Register
        </Title>
        {/* <Text color="dimmed" size="15px" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor size="15px" component="button">
            Create account
          </Anchor>
        </Text> */}
  
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput label="Email" placeholder="you@mantine.dev" required />
          <PasswordInput label="Password" placeholder="Enter password" required mt="md" />
          <PasswordInput label="Password_confirm" placeholder="Confirm password" required mt="md" />
          {/* <Group position="apart" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group> */}
          <Button fullWidth mt="xl">
            Sign Up
          </Button>
        </Paper>
      </Container>
    );
  }

// export default function Home() {
//     return(
//       <>

      
//       </>
//     );
// }