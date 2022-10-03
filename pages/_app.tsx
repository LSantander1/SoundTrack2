import '../styles/globals.css'
import { GetServerSideProps } from "next";
import MainContainer from '../components/MainContainer'
import { SessionProvider } from 'next-auth/react'
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react'
import { Head } from 'next/document';
//import clientPromise from "../lib/mongodb";


export default function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <MainContainer>
        <Component {...pageProps} />
      </MainContainer>
    </SessionProvider>
  )
}


export async function getServerSideProps(context) {
  const session = await getSession(context);

  return { props: { session } }
}
