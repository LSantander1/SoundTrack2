//  ====== Cabeçalho - [PageInicial] [Playlist] -|- [Login] [Registro] ===========

//import conectar from '../utils/database'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import Head from 'next/head'

import { GetServerSideProps } from "next";

import Login from "./login"

import { signIn } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react'

//import { connectToDatabase } from '../databaseConnect'
import clientPromise from "../lib/mongodb";
//import { connectMongo } from "../utils/database.js"

export default function newPage({ data }) {
  const { data: session } = useSession()

  return <>
    <header>
      <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css'></link>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossOrigin="anonymous" />
      
    </header>

    <nav className={styles.navbar}>

      <Link href="/">
        <Image className={styles.image} src="/images/logo-st-icon-name.png"
          width="320px"
          height="90px"
          alt='[Logo SoundTrack]'
        />
      </Link>

      <Link href="/users/playlist">
        <a className={styles.elements}>Playlists</a>
      </Link>


      <form>
        <input type="text" name="search" placeholder="Search.."></input>
      </form>

      <Link href='/assinatura'>
        <p className={styles.assinatura}>Assinar</p>
      </Link>



      <div className={styles.login}>

        <Login></Login>



      </div>

    </nav>
  </>
}


export async function getServerSideProps(context) {
  const session = await getSession(context);
  console.log('xxxxxxxxxxxxxxxa')
  
  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return { props: { session } }
}