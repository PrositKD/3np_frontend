import Link from 'next/link'
export default function Navigation(){
    return(
        <>
       <h2> <Link href='home'>Home  </Link>
       <Link href='about'>Profile  </Link>
         <Link href='parcel'>Parcel  </Link>
         <Link href='history'>History  </Link>
         <Link href='/'>Logout</Link></h2>
        </>
    )
}