"use client";

import { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  table: { name: string };
  items: OrderItem[];
  totalPrice: number;
  status: string;
}

export default function KitchenPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const statuses = ["PENDING", "PREPARING", "READY", "COMPLETED", "CANCELLED"];

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl("/api/orders/hub")
      .withAutomaticReconnect()
      .build();

    connection.start().then(() => {
      connection.on("OrderUpdated", (updatedOrder: Order) => {
        setOrders((prevOrders) =>
          prevOrders.map((o) => (o.id === updatedOrder.id ? updatedOrder : o))
        );
      });
    });

    return () => {
      connection.stop();
    };
  }, []);

  const updateOrderStatus = async (orderId: string, status: string) => {
    await fetch("/api/orders", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });

    setOrders((prevOrders) =>
      prevOrders.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-white">Panel Kuchenny</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-bold text-white">Stolik: {order.table.name}</h2>
            <p className="text-gray-400">Suma: {order.totalPrice} zł</p>
            <p className="text-yellow-400">Status: {order.status}</p>

            <h3 className="text-white mt-2">Zamówione pozycje:</h3>
            <ul className="text-gray-300">
              {order.items.map((item) => (
                <li key={item.id}>
                  {item.name} - {item.quantity}x {item.price} zł
                </li>
              ))}
            </ul>

            <select
              className="mt-2 bg-gray-700 text-white p-2 rounded w-full"
              value={order.status}
              onChange={(e) => updateOrderStatus(order.id, e.target.value)}
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
