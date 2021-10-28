import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Alexis Leite</title>
        <meta name="description" content="I love to develop web apps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <style jsx>{`
          h1,
          h2 {
            margin: 0;
            text-align: center;
          }

          h1 {
            font-size: 4em;
          }
          h2 {
            font-size: 2em;
          }
        `}</style>
        <h1>Alexis Leite</h1>
        <h2>Web development</h2>
      </div>
    </div>
  );
};

export default Home;
