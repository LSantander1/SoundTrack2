import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Head from 'next/head'


import styles from '../../styles/Card.module.css'
import Link from 'next/link'
//import Checkout from '../../utils/payAssign'
import PlanScreen from "../../components/PlanScreen"

export default function newPage() {

    return <>

        <Head>
            <title>Pagamento - SoundTrack</title>
        </Head>

        <div className={styles.body}>
            <h1 className={styles.title}>Escolha um plano:</h1>

        </div>

        {/*
        <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
        <stripe-pricing-table pricing-table-id="prctbl_1Lkg3cJFdabvAAaomgbjB5uy"
            publishable-key="pk_test_51LiNRjJFdabvAAaorSxsIZK11bZeteD8EXyKrwQwJLpkAmk0ABfKANpj0PUYiu3h94zhxvCM0xVIiI4Iq4ovlCEr00sBbmhaPn">
        </stripe-pricing-table>
        */}

        <PlanScreen/>
    </>
}

//              client-reference-id="{{CLIENT_REFERENCE_ID}}"

