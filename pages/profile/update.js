import Link from 'next/link';
import Image from 'next/image'
import Layout from '../layout/layout';
export default function Update(){
    return(
        <>
        
        
        <h1>Update Your Profile</h1>
   <Image src="/profile.jpg" alt="Image" width={400}height={400}/>
       <h2> <Link href="/">Update   </Link>
       <Link href="/">  Cancel</Link></h2>
      
        </>
    )
}