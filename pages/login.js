import { useState } from "react";
import axios from "axios";
import { useLocalStorage } from "@mantine/hooks";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
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
} from "@mantine/core";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const [userDetailsData, setUserDetailsData] = useLocalStorage({
    key: "userDetails",
    defaultValue: null,
    serialize: JSON.stringify,
    deserialize: JSON.parse,
  });
  const handleClick = async () => {
    if (!username || !password) {
      notifications.show({
        message: "Please fill all the details",
        color: "red",
      });

      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${URL}/api/user/login`, {
        username: username,
        password: password,
      });

      setUserDetailsData(data);
      notifications.show({
        message: "User Logged In Successfully",
        color: "green",
      });
      router.push("/");
    } catch (error) {
      notifications.show({
        message: "Username or Password is incorrect",
        color: "red",
      });
      console.log(error.message);
    }
    setLoading(false);
  };

  return (
    <Container
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          handleClick();
        }
      }}
      size={520}
      my={40}
      style={{
        padding: "30px 20px",
        borderRadius: "10px",
        boxShadow: "0px 0px 20px lightgray",
      }}
    >
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        <img width="50%" src="logolayer11.png" alt="logo"></img>
        <br></br>Login
      </Title>
      <Text color="dimmed" size="15px" align="center" mt={5}>
        Do not have an account yet?{" "}
        <Anchor
          size="15px"
          onClick={() => router.push("/register")}
          component="button"
        >
          Create account
        </Anchor>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          placeholder="abc342"
          required
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button fullWidth mt="xl" onClick={() => handleClick()}>
          {loading ? <Loader color="white" size="sm" /> : "Sign in"}
        </Button>
      </Paper>
    </Container>
  );
}
