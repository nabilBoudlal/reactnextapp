import {Html, Head, Main, NextScript} from 'next/document'

/**
 * This is a JavaScript function that returns a JSX component for a document with various HTML elements
 * and links to external resources.
 * @returns a JSX element that represents the structure of an HTML document. It includes the <Html>,
 * <Head>, <body>, and <div> elements, as well as the <Main> and <NextScript> components.
 */
export default function Document() {
  return (
    <Html>
        <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin/>
                <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz,
                wght@9..40,400;9..40,700&family=Montserrat:wght@100;200;300;400;500;700;800;
                900&display=swap" rel="stylesheet"/>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" 
                integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" 
                crossOrigin="anonymous" referrerPolicy="no-referrer" />

        </Head>
        <body>
            <Main />
            <NextScript />
            <div id="portal"></div>
        </body>
    </Html>
  )
}
