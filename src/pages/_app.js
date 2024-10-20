import Layout from '../app/layout'
import Head from 'next/head';
 
export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
       <Head>
        <title>Aleruchi Kinika</title> {/* Set your default title here */}
        <meta name="description" content="This is a default description for all pages." />
        {/* You can add other meta tags here */}
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}