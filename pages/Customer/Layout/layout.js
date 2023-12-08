import Head from 'next/head';
import Header from './header';
import Footer from './footer';
import Navigation from './navigation';
export default function Layout({children},props){
return(
    <>
<Head>
        <title>
        Web page -{props.page}
        </title>
    </Head>
    <Header></Header>
    <Navigation></Navigation>
    {children}
    <Footer></Footer>
    </>

);
}