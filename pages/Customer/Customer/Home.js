import Image from 'next/image';
import Link from 'next/link';
import Layout from '../Layout/layout';

const Home = () => {
  return (
    <Layout page="">
      <div className="flex flex-col items-center justify-center h-screen bg-blue-200">
        <h1 className="text-4xl font-bold mb-4">Hi, Welcome to your profile</h1>
        <div className="mb-4">
          <Image
            src="/boypic.jpg" 
            alt="Your Profile Photo"
            width={200} 
            height={200} 
          />
        </div>
        <div className="space-y-2">
          <Link href='/Customer/ViewProduct' className="btn btn-primary btn-sm">Buying Products</Link>
          <Link href='/Customer/UpdateProfile' className="btn btn-primary btn-sm">Update Profile</Link>
          <Link href='/Customer/getallproduct' className="btn btn-primary btn-sm">View Products</Link>
          <Link href='about' className="btn btn-primary btn-sm">View Carts</Link>
          <Link href='about' className="btn btn-primary btn-sm">View Wishlist</Link>
          <Link href='about' className="btn btn-primary btn-sm">Delete Product</Link>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
