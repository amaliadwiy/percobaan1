import { ActionIcon, AppShell, Aside, Box, Burger, Button, Flex, Footer, Grid, Group, Header, MediaQuery, Modal, Navbar, Paper, Stack, Table, Text, TextInput, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDisclosure, useShallowEffect } from "@mantine/hooks";
import { IconSettings } from '@tabler/icons-react';


export default function AppShellDemo() {
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [openedModal, { open, close }] = useDisclosure(false);
    const [name, setusername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [listDataUser, setlistDatauser] = useState<any[]>([]);
    const [listDataUserUpdate, setlistDatauserUpdate] = useState<any[]>([]);

    useShallowEffect(() => {
      loadUser();
    }, []);

    const loadUser = () => {
      fetch("/api/get-user")
        .then((v) => v.json())
        .then((v) => {
          setlistDatauser(v);
        });
    };

    const loadOneUser = (id: string) =>{
      fetch("/api/get-one-user?id="+id)
        .then((v) => v.json())
        .then((v) => {
          setlistDatauserUpdate(v);
        })
    }
    return (
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
            <Text>Application navbar</Text>
          </Navbar>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
  
              <Text>Application header</Text>
            </div>
          </Header>
        }
      >
      <Modal opened={openedModal} onClose={close} title="Authentication" centered>
      <Flex>
            <Stack>
              <TextInput
                label={"username"}
                onChange={(val) => setusername(val.currentTarget.value)}
              />
              <TextInput
                label={"email"}
                onChange={(val) => setEmail(val.currentTarget.value)}
              />
              <TextInput
                onChange={(val) => setPassword(val.currentTarget.value)}
                label={"password"}
              />
              <Button onClick={async () => {
                  const body = {
                    name,
                    email,
                    password,
                  };
                  const res = await fetch("/api/pendaftaran", {
                    method: "POST",
                    body: JSON.stringify(body),
                  });

                  //console.log(body);
                  loadUser();
                  {close};
                }}>
                Daftar
              </Button>
            </Stack>  
          </Flex>
      </Modal>
      <Group position="right">
        <Button onClick ={open}>Tambah Data</Button>
      </Group>
      <Grid>
        <Grid.Col span={12}>
          <Paper shadow="xs" p="md">
            <Table striped highlightOnHover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listDataUser.map((v) => (
                  <tr key={v.id}>
                    <td>{v.name}</td>
                    <td>{v.email}</td>
                    <td>{v.password}</td>
                    <td><ActionIcon variant="outline"><IconSettings size="1rem" /></ActionIcon></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Paper>
        </Grid.Col>
      </Grid>
      </AppShell>
    );
  }