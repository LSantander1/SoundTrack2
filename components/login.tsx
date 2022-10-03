//  ====== Cabeçalho - [PageInicial] [Playlist] -|- [Login] [Registro] ===========

import Link from 'next/link'
import styles from '../styles/Navbar.module.css'
import Image from 'next/image'
import Head from 'next/head'

import { GetServerSideProps } from "next";

import { signIn } from 'next-auth/react';
import { getSession } from 'next-auth/react';

import { signOut, useSession } from 'next-auth/react'
//import conectar from '../utils/database'
import { useEffect, useState } from 'react'
//import clientPromise from "../lib/mongodb";

export async function getServerSideProps(context) {
    const session = await getSession(context);


    if (session) {
        //const { db } = await conectar()
        //const dbUser = await db.collection("users").find({ email: session?.user?.email })
        //let clientPromise = require('../lib/mongodb')
        console.log('aaaaaa')

        const client = await clientPromise;
        const db = client.db("SoundTrack");

        await db.collection("movies").insertOne({ a: 10 })

        const movies = await db
            .collection("movies")
            .find()
            .toArray();

        return { props: { session } }
    }

    return { props: { session } }
}

export default function newPage({ data }) {
    const { data: session } = useSession()
    if (session) {
        return (<>
            <head>
                <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css'></link>
            </head>

            <form className={styles.form}>
                <image width="300px" height="300px" src="../public/images/user.png"></image>
                <div className={styles.dropdown}>
                    <a className={styles.dropbtn}><img width='40px' className={styles.profile} src={session?.user?.image}></img></a>
                    <div className={styles.dropdownContent}>

                        <a className={styles.username}>{session?.user?.name}</a>

                        <hr></hr>

                        <div>
                            <Link href={`/users/userProfile`}>
                                <a className={styles.clicks}>Perfil</a>
                            </Link>
                            <a onClick={() => signOut()} className={styles.clicks}>Sair</a>
                        </div>

                    </div>
                </div>

            </form>

        </>)
    } else {
        return (<>

            <Link href="/login">
                <a className={styles.elements}>Entrar</a>
            </Link>
            <Link href="/login">
                <a className={styles.elements}>Registrar</a>
            </Link>

        </>)
    }

    /*
    if (dbUser && dbUser.plan !== 0) {

    } else {

    }
    */
}