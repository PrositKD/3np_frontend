import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Layout from './layout/layout'
import Login from './profile/login'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
   
<Login></Login> 
  <div className="bg-blue-500">
This is my component!
</div>
    
   
    </>
  )
}
