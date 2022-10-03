import Head from 'next/head'
import Image from 'next/image'

import styles from '../../styles/Profile.module.css'
import styles404 from '../../styles/Erro404.module.css'


import { getSession } from 'next-auth/react';
import { useSession } from 'next-auth/react'

export default function newPage({ data, empacotado }) {
    const { data: session } = useSession()
    let desempacotado = JSON.parse(empacotado)
    let user = desempacotado

    console.log(user)

    if (!user) {
        return (<>
            <header>
                <title>Página 404 - SoundTrack</title>
            </header>

            <div className={styles404.page}>
                <img src='/images/404.png'></img>
                <h1>Página não encontrada</h1>
                <h3>Houve um erro no carregamento da página.</h3>
                <h3>Verifique a URL</h3>
            </div>

        </>)
    }

    return <>
        <head>
            <title>{user.name} - SoundTrack</title>
            <meta name='keywords' content='acessar, conta, logar, entrar'></meta>
            <meta name='description' content='Sua música, sua vibe!'></meta>
        </head>

        <div className={styles.body}>
            <div className={styles.place}>
                <div className={styles.imagePic}>
                    <Image src={user.image} width="200px" height="200px" className={styles.picture} alt="foto"></Image>
                </div>
                <div className={styles.infos}>
                    <div className={styles.cima}>
                        <h1>{user.name}</h1>
                    </div>
                    <div className={styles.baixo}>
                        <div>
                            <h2 className={styles.titlePlan}>Plano</h2>
                            <p className={styles.valorPlan}>Ativado</p>
                        </div>
                        <div>
                            <h2 className={styles.titlePlan}>Músicas<br></br>Ouvidas</h2>
                            <p className={styles.valorPlan}>1000</p>
                        </div>
                    </div>

                </div>
            </div>

            <main className={styles.playlists} id="playlists">
                <h1 className={styles.titlePL}>Playlists</h1>
                <div className={styles.playlist}>
                    <Image src="/images/CapaUndefined.png" width="70px" height="70px" className={styles.capa}></Image>
                    <div className={styles.infosPlaylist}>
                        <a className={styles.namePL}>Nome da Playlist - Criador</a>
                        <a className={styles.countMusics}>30 Músicas</a>
                    </div>
                </div>
            </main>
        </div>
    </>
}

export async function getServerSideProps(context) {
    const session = await getSession(context);
    const userId = Number(context.query.userId)

    let userJSON = await fetch(`http://localhost:3000/api/users`)
    let users = await userJSON.json()
    let user = users.find(user => user.idUser === userId)

    let empacotado = JSON.stringify(user)

    return { props: { session, empacotado } }
}