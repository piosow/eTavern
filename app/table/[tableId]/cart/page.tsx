"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useParams, useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, clearCart } = useCart();
  const { tableId } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  const placeOrder = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tableId: parseInt(tableId as string),
        items: cart,
        totalPrice,
      }),
    });

    if (res.ok) {
      clearCart();
      router.push(`/table/${tableId}/order-confirmation`);
    } else {
      const data = await res.json();
      setError(data.error || "Błąd składania zamówienia");
    }

    setLoading(false);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-white">Koszyk</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400 mt-4">Twój koszyk jest pusty.</p>
      ) : (
        <>
          <ul className="mt-4">
            {cart.map((item, index) => (
              <li key={index} className="bg-gray-800 p-2 rounded mt-2">
                {item.name} - {item.price} zł
              </li>
            ))}
          </ul>

          <p className="text-xl font-bold mt-4 text-white">Suma: {totalPrice} zł</p>

          <button
            onClick={placeOrder}
            className="mt-4 bg-green-500 px-4 py-2 rounded text-white w-full"
            disabled={loading}
          >
            {loading ? "Składanie zamówienia..." : "Złóż zamówienie"}
          </button>

          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      )}
    </div>
  );
}
