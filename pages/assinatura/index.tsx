import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Head from 'next/head'
import styles from '../../styles/Assinatura.module.css'
import Link from 'next/link'
import { getSession } from 'next-auth/react';
//import setAssing from '../../utils/setAssign'
import { useSession } from 'next-auth/react'
import clientPromise from '../../lib/mongodb'

export default function newPage({ listCodesJSON, data }) {
  let listCodes = JSON.parse(listCodesJSON)
  const { data: session } = useSession()

  return <>
    <Head>
      <title>Assinar - SoundTrack</title>
      <meta name='keywords' content='assinar, comprar, contratar, obter, adquirir, soundtrack'></meta>
      <meta name='description' content='Sua música, sua vibe!'></meta>
    </Head>

    <div className={styles.body}>
      <div className={styles.infos}>
        <h1>Sobre a assinatura</h1>
        <br></br>
        <p>Assunto</p>
        <br></br>
        <ul>
          <li>Tal coisa</li>
          <li>Isso td</li>
          <li>mais isso</li>
        </ul>
      </div>


      <div className={styles.form}>
        <h1>Forma de pagamento</h1>
        <Link href='/assinatura/card'>
          <div className={styles.formasPag}>
            <img src='/images/cartao-de-credito.png' className={styles.logos}></img>
            <a>Cartão de Crédito</a>
          </div>
        </Link>

        <Link href='/assinatura/pix'>
          <div className={styles.formasPag}>
            <img src='/images/pix.png' className={styles.logos}></img>
            <a>PIX</a>
          </div>
        </Link>

        <hr className={styles.hrDivision}></hr>

        <div className={styles.code}>
          
          <label className={styles.codeTitle}>Eu tenho um código:</label>
          <input type="text" placeholder="Inserir código..." className={styles.text} id="textCode"></input>
          <a className={styles.button} onClick={async function Resgatar() {
            let codeValue = document.querySelector('#textCode').value

            let validCode = listCodes.find(codigo => codigo.code === codeValue)
            if(validCode[0]) {
              //console.log(await setAssing(validCode[0], session))

              window.location.href = '/assinatura/completed'
            // Alterar os valores de plano no Databse do User logado
            // Alterar os valores do codigo no Database do código
            // Redirecionar para uma page de agradecimento
            } else {
              window.alert('❌| Código inválido!')
            }

          }}>Resgatar código</a>
        </div>
      </div>
    </div>

  </>
}

/*
<div className={styles.codeInvalid} id="codeInvalid">
  Código inválido!
</div>
*/

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const client = await clientPromise
  const db = await client.db("SoundTrack")
  const dbUser = await db.collection("users").findOne({ email: session?.user?.email })
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  if (dbUser?.plan !== 0) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }

  }

  let listCodes = await db.collection("codes").find().toArray()
  let listCodesJSON = await JSON.stringify(listCodes)

  return { props: { listCodesJSON, session } }
}