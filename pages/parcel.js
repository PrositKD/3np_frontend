import Link from 'next/link';
import Image from 'next/image'
import Layout from './layout/layout';
export default function Parcel(){
    return(
        <>
        <Layout page="parcel">
        
        <h1>Your Parcel</h1>
   <Image src="/product.jpg" alt="Image" width={800}height={400}/>
       <h2> <Link href="/">Update Status</Link></h2>
       </Layout>
        </>
    )
}