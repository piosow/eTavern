"use client";

import { useCart } from "@/context/CartContext";

interface MenuItemProps {
  item: { id: number; name: string; price: number; image: string };
}

export default function MenuItem({ item }: MenuItemProps) {
  const { addToCart } = useCart();

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
      <img src={item.image} alt={item.name} className="w-32 h-32 rounded-md object-cover" />
      <h3 className="text-lg font-bold text-white mt-2">{item.name}</h3>
      <p className="text-gray-400">{item.price.toFixed(2)} PLN</p>
      <button
        onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1 })}
        className="mt-2 bg-green-500 px-4 py-2 rounded-lg text-white"
      >
        Dodaj do koszyka
      </button>
    </div>
  );
}
