
import Head from 'next/head';
import Navigation from './navigation';
import Footer from './footer';
import Header from './header';

export default function Layout({ children, page }) { // Receive the 'page' prop here
    return (
        <>
            <Head>
                <title>Welcome to my-{page}</title> {/* Use the 'page' prop here */}
            </Head>
            <Header></Header>
            <Navigation></Navigation>
            {children}
            <Footer></Footer>
        </>
    )
}
