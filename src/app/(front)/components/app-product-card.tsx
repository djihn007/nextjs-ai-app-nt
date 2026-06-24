'use client'

type Props = {
  name: string;
  price: number;
  stock?: number;
  onAddToCart: (name: string) => void;
}

export default function AppProductCard({ name, price, stock = 0, onAddToCart }: Props) {
  return (
    <div className="w-60 rounded-lg border border-[#E3E0DD] bg-white p-6 shadow-subtle">
      <h2 className="text-lg font-bold text-[#423D38]">{name}</h2>
      <p className="mt-2 text-sm text-[#797067]">Price: {price} THB</p>
      {
        stock > 0 && (
          <div className="mt-3">
            <p className="text-sm text-[#797067]">In stock: {stock}</p>
            <button
              onClick={ () => onAddToCart(name) }
              className="mt-2 rounded-md bg-[#FE6E00] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#FF6B00] transition-colors"
            >
              Add to Cart
            </button>
          </div>
        )
      }
    </div>
  );
}
