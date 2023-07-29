import Link from 'next/link'
export default function Navigation(){
    return(
        <>
       <h2> <Link href='/'>Home  </Link>
       <Link href='about'>About  </Link>
        <Link href='update'>Update  </Link>
         <Link href='parcel'>Parcel  </Link>
         <Link href='history'>History  </Link></h2>
        </>
    )
}