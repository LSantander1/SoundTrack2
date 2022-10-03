import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Head from 'next/head'


import styles from '../../styles/Card.module.css'
import Link from 'next/link'

export default function newPage() {
    return <>
        <Head>
            <title>Pagamento - SoundTrack</title>
        </Head>



        
        <div className={styles.body}>
            <div className={styles.alert}>
                <h3>Aviso</h3>
                <a>Após escolher um dos planos, você será redirecionado para o WhatsApp onde será passado as informações para pagamento via PIX e por lá você deverá enviar o comprovante da compra. Assim que a verificação for concluída, sua assinatura será ativada e você então poderá desfrutar de todas as vantagens!</a>
            </div>

            <hr></hr>

            <h1 className={styles.title}>Escolha um plano:</h1>

            <div className={styles.card}>
                <h2>1 Mês</h2>
                <p>Duração de 30 dias</p>
                <p>Valor de R$10,00</p>
                <a href='https://buy.stripe.com/test_dR69CBggVeGPfqo3cc'>card</a>
                <a href='https://api.whatsapp.com/send?phone=5516988318960&text=Ol%C3%A1%2C%20Suporte%20SoundTrack!%20Desejo%20assinar%20um%20plano%20via%20PIX.%0A%0A-%20*Plano%3A*%201%20M%C3%AAs%0A-%20*Valor%3A*%20R%2410%2C00' className={styles.button}>Assinar</a>
            </div>

            <div className={styles.card}>
                <h2>3 Meses</h2>
                <p>Duração de 90 dias</p>
                <p><a className={styles.oldValor}>R$30,00</a> <a className={styles.newValor}>R$25,50</a></p>
                <div>
                    <p>Valor de R$25,50 com</p>
                    <p>economia de R$4,50</p>
                </div>
                <a href='https://api.whatsapp.com/send?phone=5516988318960&text=Ol%C3%A1%2C%20Suporte%20SoundTrack!%20Desejo%20assinar%20um%20plano%20via%20PIX.%0A%0A-%20*Plano%3A*%203%20Meses%0A-%20*Valor%3A*%20R%2425%2C50' className={styles.button}>Assinar</a>
            </div>

            <div className={styles.card}>
                <h2>6 Meses</h2>
                <p>Duração de 180 dias</p>
                <p><a className={styles.oldValor}>R$60,00</a> <a className={styles.newValor}>R$48,00</a></p>
                <div>
                    <p>Valor de R$48,00 com</p>
                    <p>economia de R$12,00</p>
                </div>
                <a href='https://api.whatsapp.com/send?phone=5516988318960&text=Ol%C3%A1%2C%20Suporte%20SoundTrack!%20Desejo%20assinar%20um%20plano%20via%20PIX.%0A%0A-%20*Plano%3A*%206%20Meses%0A-%20*Valor%3A*%20R%2448%2C00' className={styles.button}>Assinar</a>
            </div>

            <div className={styles.card}>
                <h2>12 Meses</h2>
                <p>Duração de 360 dias</p>
                <p><a className={styles.oldValor}>R$120,00</a> <a className={styles.newValor}>R$90,00</a></p>
                <div>
                    <p>Valor de R$90,00 com</p>
                    <p>economia de R$30,00</p>
                </div>
                <a href='https://api.whatsapp.com/send?phone=5516988318960&text=Ol%C3%A1%2C%20Suporte%20SoundTrack!%20Desejo%20assinar%20um%20plano%20via%20PIX.%0A%0A-%20*Plano%3A*%2012%20Meses%0A-%20*Valor%3A*%20R%2490%2C00' className={styles.button}>Assinar</a>
            </div>
        </div>
    </>
}