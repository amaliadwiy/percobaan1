import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { gIsLogin } from "@/state/g_login";
import { PropsWithChildren } from "react";
import Login from "./login";
import MyLogin from "@/component/my_login";
import { useHookstate } from "@hookstate/core";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: "light",
        }}
      >
        {/* <AuthLogin> */}
        <Component {...pageProps} />
        {/* </AuthLogin> */}
      </MantineProvider>
    </>
  );
}

const AuthLogin = ({ children }: PropsWithChildren) => {
  const isLogin = useHookstate(gIsLogin)
  useShallowEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      isLogin.set(true);
    } else {
      isLogin.set(false);
    }
  });

  if (isLogin.value == undefined) return <></>;
  if (!isLogin.value)
    return (
      <>
        <MyLogin />
      </>
    );
  return <>
  {children}
  </>;
};
