import { type AppType } from "next/app";
import Head from "next/head";
import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (<>
    <Head>
      <title>ECDSA Node</title>
    </Head>
    <Component {...pageProps} />
  </>)
};

export default MyApp;
