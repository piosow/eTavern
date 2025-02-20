"use client";

import Link from "next/link";

export default function AdminPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-white">Panel Administracyjny</h1>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/orders">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer">
            <h2 className="text-lg font-bold text-white">📦 Zamówienia</h2>
            <p className="text-gray-400">Przeglądaj i zarządzaj zamówieniami.</p>
          </div>
        </Link>

        <Link href="/admin/menu">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer">
            <h2 className="text-lg font-bold text-white">🍽️ Menu</h2>
            <p className="text-gray-400">Dodawaj, edytuj i usuwaj pozycje menu.</p>
          </div>
        </Link>

        <Link href="/admin/tables">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 cursor-pointer">
            <h2 className="text-lg font-bold text-white">🪑 Stoliki</h2>
            <p className="text-gray-400">Zarządzaj stolikami i kodami QR.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
