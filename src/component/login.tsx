import {
  ActionIcon,
  AppShell,
  Aside,
  Box,
  Burger,
  Button,
  Center,
  Checkbox,
  Flex,
  Footer,
  Grid,
  Group,
  Header,
  MediaQuery,
  Modal,
  Navbar,
  Paper,
  PasswordInput,
  Stack,
  Table,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { IconSettings } from "@tabler/icons-react";
import { isEmail, matches, useForm } from "@mantine/form";

export default function FormLogin() {
  const [message, SetMessage] = useState("Message");
  const [isLoggedIn, setIsLoggedIn] = useState("?");
  const login = async () => {
    const response = await fetch("/api/login",{
        method: "POST",
        body: JSON.stringify({username:"123", password:"123"})
    }).then(response => response.json());

    if(response.isLoggedIn == true){
        SetMessage("Logged in!!!!!");
    }else{
        SetMessage("Login first!!!!");
    }
  };

  const checkLogin = async () => {
    const response = await fetch("/api/checklogin",{
        method: "GET"
    }).then(response => response.json());
    setIsLoggedIn(String(response.isLoggedIn)); 
  };

  const logout = async () => {
    const response = await fetch("/api/logout",{
        method: "POST",
        body: JSON.stringify({username:"123", password:"123"})
    }).then(response => response.json());
    SetMessage(String(response.isLoggedIn));
  };

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      email: isEmail("Invalid Email"),
      password: matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Invalid Password"
      ),
    },
  });


  return (
    <Flex
      mih={600}
      bg="rgba(0, 0, 0, .3)"
      gap="md"
      justify="center"
      align="center"
      direction="column"
      wrap="wrap"
    >
      {/* <Box maw={400} mx="auto">
        <Paper shadow="xs" radius="md" p="lg">
          <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              placeholder="Password"
              label="Password"
              description="Password must include at least eight characters, at least one letter and one number"
              withAsterisk
              {...form.getInputProps("password")}
            />

            <Group position="right" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Paper>
      </Box> */}
      <Button onClick={login}>Login</Button>
      <Button onClick={checkLogin}>Check Login</Button>
      <Button onClick={logout}>Logout</Button>
      <Text>{message}</Text>
      <Text>{isLoggedIn}</Text>
    </Flex>
  );
}
