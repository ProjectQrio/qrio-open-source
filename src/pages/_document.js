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
<script id="mcjs">
  {!function(c,h,i,m,p){
    m=c.createElement(h);
    p=c.getElementsByTagName(h)[0];
    m.async=1;
    m.src=i;
    p.parentNode.insertBefore(m,p);
  }(document,"script","https://chimpstatic.com/mcjs-connected/js/users/35112925652b0562a3805d40b/dba383321afcfbcb527e92a11.js")}
</script>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
}


export default MyDocument;
