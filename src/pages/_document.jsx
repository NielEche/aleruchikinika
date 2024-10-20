import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="Aleruchi Kinika" />
        <meta name="keywords" content="Photographer , Port Harcourt , melancholy , chiaroscuro , surrealism , individual storytelling, visual artist , writing , pen on paper drawing" />
        <meta property="og:image" content='/logo.png' />
        <meta property="og:image:alt" content="Logo for Aleruchi Kinika " />
        <meta property="og:url" content="https://aleruchikinika.com" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}