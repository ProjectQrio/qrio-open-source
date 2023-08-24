import Document, { Html, Head, Main, NextScript } from 'next/document'


class MyDocument extends Document {
  render() {
    return (
    <Html lang="en">
      <Head>

<script async src="https://www.googletagmanager.com/gtag/js?id=G-HBW52341QW"></script>
<script
            dangerouslySetInnerHTML={{
              __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HBW52341QW');
  `,
            }}
          />
      
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto&display=swap" />

</Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
}


export default MyDocument;
