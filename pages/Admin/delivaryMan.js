import Link from 'next/link';
import Image from 'next/image'
import Layout from './layout/layout';

export default function DelivaryMan() {
  return (
    <Layout page="DelivaryMan">
      <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <h1 className="text-3xl font-extrabold text-white mb-4">All Deliveryman</h1>
          <Image src="/2.jpg" alt="Image" width={800} height={400} />
          <h2 className="mt-4">
            <Link href="/" className="text-indigo-400 hover:underline">
              Update DelivaryMan
            </Link>
          </h2>
        </div>
      </div>
    </Layout>
  )
}
