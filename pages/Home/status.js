import Link from 'next/link';
import Image from 'next/image'
import Layout from '../layout/layout';
export default function About(){
    return(
        <>
        <Layout page="Status">
        
        <h1>Your all recived product</h1>
   <Image src="/product.jpg" alt="Image" width={800}height={400}/>
       <h2> <Link href='scomplete'>Completed  </Link>
       <Link href="srejected">Rejected</Link></h2>
       </Layout>
        </>
    )
}