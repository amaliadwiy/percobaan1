import {
  Box,
  Button,
  Container,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import React, { useState } from "react";

const MyLogin = () => {
  const [email, setEmailLogin] = useState<string>("");
  const [password, setPasswordLogin] = useState<string>("");

  // const form = useForm({
  //   initialValues: {
  //     email: "",
  //     password: "",
  //   },

  //   validate: {
  //     email: isNotEmpty("Invalid Email"),
  //     password: isNotEmpty("Invalid Password"),
  //   },
  // });

  const toLogin = async (body: any) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(body),
    });
    const data = await res.json();
    console.log(body);
    console.log(data);
  };

  return (
    <>
      <Container>
        <Box maw={400} mx="auto">
          <Paper shadow="xs" radius="md" p="lg">
            <form
             onSubmit={async () => {
              const values = {
                  email,
                  password,
              };
              toLogin(values);
             }}
            >
              <TextInput
                withAsterisk
                label={"email"}
                placeholder="your@email.com"
                // {...form.getInputProps("email")}
                onChange={(val) => setEmailLogin(val.currentTarget.value)}
              />
              <PasswordInput
                placeholder="Password"
                label={"password"}
                withAsterisk
                // {...form.getInputProps("password")}
                onChange={(val) => setPasswordLogin(val.currentTarget.value)}
              />

              <Group position="right" mt="md">
                <Button type="submit">Submit</Button>
              </Group>
            </form>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default MyLogin;
