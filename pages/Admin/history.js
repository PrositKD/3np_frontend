import Link from 'next/link';
import Image from 'next/image'
import Layout from './layout/layout';

export default function History() {
  return (
    <Layout page="history">
      <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-600 to-red-600">
        <div className="flex flex-col items-center justify-center min-h-screen py-12">
          <h1 className="text-3xl font-extrabold text-white mb-4">Welcome to History</h1>
          {/* Add your content here */}
        </div>
      </div>
    </Layout>
  )
}
