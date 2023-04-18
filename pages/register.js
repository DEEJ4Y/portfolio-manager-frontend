import { useState } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/router";
import axios from "axios";
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

export default function RegisterPage() {
  const router = useRouter();
  let user = {};
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState("empty");
  const [loading, setLoading] = useState(false);
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const handleClick = async () => {
    if (!name || !userName || !password || !repassword || !email) {
      notifications.show({
        message: "Please fill all the details",
        color: "red",
      });
      return;
    }
    if (password !== repassword) {
      notifications.show({
        message: "Passwords do not match",
        color: "red",
      });
    }
    setLoading(true);
    try {
      const { data } = await axios.post(`${URL}/api/user/register`, {
        username: userName,
        password: password,
        email: email,
        name: name,
        image: image,
      });
      console.log(data);
      notifications.show({
        message: "User Registered Successfully",
        color: "green",
      });
      router.push("/login");
    } catch (error) {
      notifications.show({
        message: "Couldn't register please try again",
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
        <br></br>Register
      </Title>

      <Text color="dimmed" size="15px" align="center" mt={5}>
        Already have an account?{" "}
        <Anchor
          size="15px"
          onClick={() => router.push("/login")}
          component="button"
        >
          Login
        </Anchor>
      </Text>
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <TextInput
          onChange={(e) => {
            setName(e.target.value);
          }}
          label="Name"
          placeholder="abc xyz"
          required
        />
        <TextInput
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          label="Email"
          placeholder="you@me.com"
          required
        />
        <TextInput
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          label="username"
          placeholder="abc123"
          required
        />
        <PasswordInput
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          label="Password"
          placeholder="Enter password"
          required
          mt="md"
        />
        <PasswordInput
          onChange={(e) => {
            setRepassword(e.target.value);
          }}
          label="Password_confirm"
          placeholder="Confirm password"
          required
          mt="md"
        />

        <Button fullWidth mt="xl" onClick={() => handleClick()}>
          {loading ? <Loader color="white" size="sm" /> : "Register"}
        </Button>
      </Paper>
    </Container>
  );
}
