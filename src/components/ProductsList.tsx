"use client";
import { useCart } from '../context/CartContext';  // ← Relativni put

type Product = {
  id: number;
  name: string;
  price: string;
  images: Array<{ src: string }>;
  short_description: string;
  stock_status: string;
  stock_quantity?: number;
};

export default function ProductsList({ initialProducts }: { initialProducts: Product[] }) {
  const { addToCart } = useCart();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {initialProducts.map((product) => (
        <div key={product.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl p-6 border">
          <img 
            src={product.images[0]?.src || 'https://via.placeholder.com/300x200?text=No+Image'} 
            alt={product.name} 
            className="w-full h-64 object-cover rounded-xl mb-4" 
          />
          <h3 className="text-xl font-semibold mb-3 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{product.short_description}</p>
          <div className="text-3xl font-bold text-green-600 mb-6">{product.price} RSD</div>
          <button 
            onClick={() => addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.images[0]?.src || ''
            })}
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-4 rounded-xl font-bold hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            🛒 Dodaj u korpu
          </button>
        </div>
      ))}
    </div>
  );
}
