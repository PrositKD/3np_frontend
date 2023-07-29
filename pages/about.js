import Link from 'next/link';
import Image from 'next/image'
import Layout from './layout/layout';
export default function About(){
    return(
        <>
        <Layout page="About">
        
        <h1>about us</h1>
   <Image src="/pkd.jpg" alt="Image" width={800}height={400}/>
       <h2> <Link href="/">Home</Link></h2>
       </Layout>
        </>
    )
}