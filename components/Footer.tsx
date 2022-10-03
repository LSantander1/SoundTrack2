import styles from '../styles/Footer.module.css'

export default function newPage() {
  return <>
    <footer className={styles.footer}>
      <div class="contact-suport">
        <a>Contato</a><br></br>
        <a>Suporte</a>
      </div>
      <div class="youtube">
        <div><p>API oferecida por: <a className='youtube' href="https:youtube.com" target="_blank">YouTube</a></p></div>
        <a>O SoundTrack não é afiliada ao Youtube!</a>
      </div>
      <div>
        <a>
          <img src="../images/Logo SoundTrack-icon-name-branco.png" alt='[Logo SoundTrack]'></img>
        </a>
        <a>Feito com 💖</a>
      </div>
    </footer>
  </>
}