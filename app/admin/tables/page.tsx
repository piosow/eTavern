"use client";

import { useState, useEffect } from "react";
import QRCodeGenerator from "@/components/QRCodeGenerator";

interface Table {
  id: number;
  name: string;
  qrCode: string;
}

export default function TablesAdminPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [name, setName] = useState("");
  const [editingTable, setEditingTable] = useState<Table | null>(null);

  useEffect(() => {
    fetch("/api/tables")
      .then((res) => res.json())
      .then((data) => setTables(data));
  }, []);

  const addTable = async () => {
    const res = await fetch("/api/tables", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (res.ok) {
      setTables([...tables, await res.json()]);
      setName("");
    }
  };

  const updateTable = async () => {
    if (!editingTable) return;
    const res = await fetch("/api/tables", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editingTable.id, name }),
    });
    if (res.ok) {
      setTables(tables.map((t) => (t.id === editingTable.id ? { ...t, name } : t)));
      setEditingTable(null);
      setName("");
    }
  };

  const deleteTable = async (id: number) => {
    const res = await fetch("/api/tables", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      setTables(tables.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-white">Zarządzanie stolikami</h1>

      <div className="mt-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nazwa stolika"
          className="p-2 bg-gray-700 text-white rounded"
        />
        {editingTable ? (
          <button onClick={updateTable} className="ml-2 bg-yellow-500 px-4 py-2 rounded text-black">
            Zapisz zmiany
          </button>
        ) : (
          <button onClick={addTable} className="ml-2 bg-green-500 px-4 py-2 rounded text-white">
            Dodaj stolik
          </button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((table) => (
          <div key={table.id} className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col items-center">
            <QRCodeGenerator url={table.qrCode} name={table.name} />
            <button
              onClick={() => {
                setEditingTable(table);
                setName(table.name);
              }}
              className="mt-2 bg-blue-500 px-4 py-2 rounded text-white"
            >
              Edytuj
            </button>
            <button
              onClick={() => deleteTable(table.id)}
              className="mt-2 bg-red-500 px-4 py-2 rounded text-white"
            >
              Usuń
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
