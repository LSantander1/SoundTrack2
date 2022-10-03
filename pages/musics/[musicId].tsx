import { Blob } from 'buffer';
import Head from 'next/head'
import Link from 'next/link'
import nc from "next-connect";
import path from 'path'

import styles from '../../styles/MusicPlayer.module.css'
import verifStyles from '../../styles/Autorizacoes.module.css'

//import upload from "../../utils/upload";
//import conectarToDatabase from "../../utils/dbMongo"

//import handlerAPI from '../api/musics'

import { useRouter } from 'next/router'
import Document from 'next/document'

const fs = require('fs');
const ytdl = require('ytdl-core');
const shortNum = require('number-shortener')
import { getSession } from 'next-auth/react';
import clientPromise from '../../lib/mongodb';

const app = ({ data, verif }) => {
  if (!verif.Login) {
    return (<>
      <div className={verifStyles.body}>
        <div className={verifStyles.card}>
          <h1>Para prosseguir é necessário entrar em sua conta</h1>
          <Link href='/login'>
            <a className={verifStyles.button}>Entrar</a>
          </Link>
        </div>
      </div>
    </>)
  }

  if (!verif.Assinatura) {
    return (<>
      <div className={verifStyles.body}>
        <div className={verifStyles.card}>
          <h1>Você precisa ser assinante para acessar</h1>
          <Link href='/assinatura'>
            <a className={verifStyles.button}>Se tornar assinante</a>
          </Link>
        </div>
      </div>
    </>)
  }

  let dados = data.items[0]


  if (!dados || dados.snippet.categoryId !== '10') {
    return (
      <>
        <a>Música não encontrado</a>
      </>
    )
  }

  let temp = dados.contentDetails.duration.replace('PT', '').replace('M', ':').replace('S', '')
  if (temp.endsWith(':')) temp = temp + '00'
  if (!dados.contentDetails.duration.includes('M')) temp = '0:' + temp

  let videoInfo = {
    title: dados.snippet.title,
    image: dados.snippet.thumbnails.medium.url,
    author: dados.snippet.channelTitle,
    duration: temp,
    view: shortNum(dados.statistics.viewCount).replace('+', ""),
    like: shortNum(dados.statistics.likeCount).replace('+', ""),
  }

  //let music = require('./musica.mp3')

  //let blob = new Blob(['.musica.mp3'])
  //let url = URL.createObjectURL(blob)
  //console.log(blob)

  function play(document) {
    let musica = document.querySelector('audio')

    musica.play();
    document.querySelector('.botao-play').style.display = 'none';
    document.querySelector('.botao-pause').style.display = 'block';
  }


  return (


    <div className={styles.mus}>
      <Head>
        <title>{videoInfo.title} | SoundTrack</title>
      </Head>

      <header>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css" integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous" />
      </header>

      <h1>
        1. Buscar a duração da msc na API do YT e colocar tempo "fim"<br></br>
        2. Tentar fazer sistema de controlar a barra e o tempo da msc<br></br>
        3. Pesquisa de músicas<br></br><br></br>
      </h1>

      <img className={styles.img} src={videoInfo.image}></img>
      <div class={styles.descricao} id="descricao">
        <h2>{videoInfo.title}</h2>
        <i>{videoInfo.author}</i>
      </div>
      <div class={styles.duracao}>
        <div class={styles.barra}>
          <progress value="0" max="1"></progress>
          <div class={styles.ponto}></div>
        </div>
        <div class={styles.tempo} id="tempo">
          <p class={styles.inicio} id="inicio">0:00</p>
          <p class={styles.fim} id="fim">{videoInfo.duration}</p>
        </div>
      </div>
      <div class={styles.player}>
        <div className={styles.statistic}>
          <i class="fas fa-solid fa-heart" id={styles.icon}></i>
          <a id={styles.number}>{videoInfo.like}</a>
        </div>

        <div className={styles.statistic}>
          <i class="fas fa-solid fa-eye" id={styles.icon}></i>
          <a id={styles.number}>{videoInfo.view}</a>
        </div>

        <i class="fas fa-play-circle botao-play" onClick={function play() {
          let musica = document.querySelector('audio');
          let musicaIndex = 0;

          let nomeMusica = document.querySelector('#descricao h2');
          let nomeArtista = document.querySelector('#descricao i');
          let imagem = document.querySelector('img');
          let tempoDecorrido = document.querySelector('#tempo #inicio');
          //let duracaoMusica = document.querySelector('#tempo #fim');

          //duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));

          musica.play();
          document.querySelector('.botao-play').style.display = 'none';
          document.querySelector('.botao-pause').style.display = 'block';

          function segundosParaMinutos(segundos) {
            let campoMinutos = Math.floor(segundos / 60);
            let campoSegundos = segundos % 60;

            if (campoSegundos < 10) {
              campoSegundos = '0' + campoSegundos;
            }
            return `${campoMinutos}:${campoSegundos}`;
          }

          function renderizarMusica(musicaIndex) {
            musica.setAttribute('src', musicas[musicaIndex].source);

            musica.addEventListener('loadeddata', () => {
              nomeMusica.textContent = musicas[musicaIndex].titulo;
              nomeArtista.textContent = musicas[musicaIndex].artista;
              imagem.src = musicas[musicaIndex].img;

              duracaoMusica.textContent = segundosParaMinutos(Math.floor(musica.duration));
            });

            document.body.append(musica);
          }

          function atualizarBarra() {
            let barra = document.querySelector('progress');
            barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%';
            tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime));
          }

          musica.addEventListener('timeupdate', atualizarBarra);
        }} id={styles.play}></i>
        <p class="fas fa-pause-circle botao-pause" onClick={function pause() {
          let musica = document.querySelector('audio')

          musica.pause();
          document.querySelector('.botao-play').style.display = 'block';
          document.querySelector('.botao-pause').style.display = 'none';
        }} id={styles.pause}></p>

        <div className={styles.function}>
          <i class="fas fa-solid fa-download" id={styles.icon}></i>
        </div>

        <div className={styles.function}>
          <i class="fa-solid fa-rectangle-history-circle-plus" id={styles.icon}></i>
        </div>


      </div>
      <audio src={data.musicInfos.url}></audio>

    </div>


  )

}



export async function getServerSideProps(context) {
  const session = await getSession(context);
  const musicId = context.query.musicId

  var verif = {
    Login: false,
    Assinatura: false
  }


  if (session) {
    verif.Login = true
    const client = await clientPromise
    const db = client.db("SoundTrack")
    const dbUser = await db.collection("users").findOne({ email: session?.user?.email })
    if (dbUser?.plan !== 0) {
      verif.Assinatura = true
    }
  }


  // Fetch data from external API
  const dataR = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2C%20statistics%2C%20contentDetails&id=${musicId}&t&key=AIzaSyBt6QUXTgALK-r0THl-pbE09oFFdfCvwU4`)
  const data = await dataR.json()

  //  ytdl(`http://www.youtube.com/watch?v=${musicId}`).pipe(fs.createWriteStream('video.mp4'));


  let videoInfo = await ytdl(`http://www.youtube.com/watch?v=${musicId}`, {
    quality: 'highestaudio',
  }).pipe(fs.createWriteStream(`./musics/${musicId}.mp3`))

  /*
  let musicaUp = path.resolve(__filename, 'musica.mp3')

  nc().post('http://localhost:3000/api/hello', (req, res) => {
    res.status(200).json({ id: 'aa' })
  })
  */


  let musicInfos = {
    url: "https://soundtrack-developer.s3.amazonaws.com/48097be607fde149f70cb923554e755a-musica.mp3"
  }

  data.musicInfos = musicInfos

  /*
  let musicaFetch = await fetch('https://soundtrack-developer.s3.amazonaws.com/48097be607fde149f70cb923554e755a-musica.mp3')
  let musicaSelecionada = musicaFetch
  let musicJson = await musicaSelecionada.json()
  data.musicSelect = musicJson
  */

  // Pass data to the page via props
  return { props: { data, verif } }
}


//export default handler;

export default app