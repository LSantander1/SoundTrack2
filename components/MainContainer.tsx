import Navbar from './Navbar'
import Footer from './Footer'
import styles from '../styles/MainContainer.module.css'

//  import { connectToDatabase } from '../databaseConnect'

export default function newPage({ children }) {
    return (
        <>
            <Navbar />
            <div className={styles.container}>{children}</div>
            <Footer />
        </>
    )
}



export async function getServerSideProps(context) {


    return {
      props: {}, // will be passed to the page component as props
    }
  }

//  let db = await connectToDatabase()

//getStaticProps()