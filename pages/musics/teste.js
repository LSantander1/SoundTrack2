import Head from 'next/head'

export async function getStaticProps() {
    const data = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await data.json()

    return {
        props: { users },
    }
}

export default function newPage({ users }) {
    return <>
        <Head>
            <title>Usários - SoundTrack</title>
            <meta name='keywords' content='acessar, conta, logar, entrar'></meta>
            <meta name='description' content='Sua música, sua vibe!'></meta>
        </Head>

        <h1>Perfil do usuário:</h1>
        <h3>Nome</h3>
        <p>Email de contato</p>
        <p>Site</p>

        <hr></hr>

        {users.map(user => (
            <p key={user.id}>{user.name}</p>
        ))}
    </>
}