"use client";

import { useEffect, useState } from "react";

interface Order {
  id: string;
  table: { name: string };
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-white">📦 Zamówienia</h1>

      <div className="mt-6">
        {orders.length === 0 ? (
          <p className="text-gray-400">Brak zamówień.</p>
        ) : (
          <table className="w-full text-white border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 text-left">Stolik</th>
                <th className="p-2 text-left">Suma</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Data</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-700">
                  <td className="p-2">{order.table.name}</td>
                  <td className="p-2">{order.totalPrice} zł</td>
                  <td className="p-2">{order.status}</td>
                  <td className="p-2">{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
