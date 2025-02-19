"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useParams, useRouter } from "next/navigation";
import MenuItem from "./MenuItem";

interface MenuItemType {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

export default function MenuList() {
  const [menu, setMenu] = useState<MenuItemType[]>([]);
  const { cart } = useCart();
  const { tableId } = useParams();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-xl font-bold text-white mt-6">Menu</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {menu.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>

      {cart.length > 0 && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-green-600 px-6 py-3 rounded-lg shadow-lg">
          <button
            onClick={() => router.push(`/table/${tableId}/cart`)}
            className="text-white font-bold"
          >
            🛒 Przejdź do koszyka ({cart.length})
          </button>
        </div>
      )}
    </div>
  );
}
