import axios from 'axios';
import Navigation from './layout/navigation';

export async function getServerSideProps(context) {
  const { productId } = context.params;

  try {
    const response = await axios.get(`http://localhost:3000/product/${productId}`);
    const product = response.data;

    return {
      props: {
        product,
      },
    };
  } catch (error) {
    console.error('Error fetching product:', error);
    return {
      notFound: true,
    };
  }
}

function ProductDetails({ product }) {
  return (
    <><Navigation></Navigation>
    <div className="bg-white p-8 rounded shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Product Name: {product.name}</h1>
      <p className="text-gray-600 mb-4">Description: {product.description}</p>
      <div className="max-w-full mb-4">
        <img
          src={`${process.env.NEXT_PUBLIC_SELLER}product/getImage/${product.photoPath}`}
          alt={product.name}
        />
      </div>
    </div>
    </>
  );
}

export default ProductDetails;
