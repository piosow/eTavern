"use client";

import { useEffect, useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
}

export default function MenuPage() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [newItem, setNewItem] = useState({ name: "", description: "", price: "", image: "", category: "" });

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    const res = await fetch("/api/menu");
    const data = await res.json();
    setMenu(data);
  };

  const handleAddItem = async () => {
    if (!newItem.name || !newItem.description || !newItem.price) return;

    const res = await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newItem.name,
        description: newItem.description,
        price: parseFloat(newItem.price),
        image: newItem.image || null,
        category: newItem.category,
      }),
    });

    if (res.ok) {
      fetchMenu();
      setNewItem({ name: "", description: "", price: "", image: "", category: "" });
    }
  };

  const handleEditItem = async () => {
    if (!editingItem) return;

    const res = await fetch("/api/menu", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingItem),
    });

    if (res.ok) {
      fetchMenu();
      setEditingItem(null); // ✅ Resetujemy edycję po zapisaniu zmian
    }
  };

  const handleDeleteItem = async (id: string) => {
    const confirmDelete = window.confirm("Czy na pewno chcesz usunąć tę pozycję?");
    if (!confirmDelete) return;
  
    const res = await fetch("/api/menu", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
  
    if (res.ok) {
      fetchMenu();
    } else {
      console.error("Błąd usuwania pozycji.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-white">🍽️ Zarządzanie Menu</h1>

      {/* Formularz dodawania */}
      <div className="mt-6 bg-gray-800 p-4 rounded-lg">
        <h2 className="text-lg font-bold text-white">Dodaj nową pozycję</h2>
        <input type="text" placeholder="Nazwa" value={newItem.name} onChange={(e) => setNewItem({ ...newItem, name: e.target.value })} className="p-2 w-full bg-gray-700 text-white rounded mt-2" />
        <input type="text" placeholder="Opis" value={newItem.description} onChange={(e) => setNewItem({ ...newItem, description: e.target.value })} className="p-2 w-full bg-gray-700 text-white rounded mt-2" />
        <input type="number" placeholder="Cena" value={newItem.price} onChange={(e) => setNewItem({ ...newItem, price: e.target.value })} className="p-2 w-full bg-gray-700 text-white rounded mt-2" />
        <input type="text" placeholder="URL zdjęcia" value={newItem.image} onChange={(e) => setNewItem({ ...newItem, image: e.target.value })} className="p-2 w-full bg-gray-700 text-white rounded mt-2" />
        <input
  type="text"
  placeholder="Kategoria"
  value={newItem.category}
  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
  className="p-2 w-full bg-gray-700 text-white rounded mt-2"
/>
        <button onClick={handleAddItem} className="mt-4 bg-green-500 px-4 py-2 rounded text-white w-full">➕ Dodaj</button>
      </div>

      {/* Lista menu */}
      <div className="mt-6">
        {menu.length === 0 ? <p className="text-gray-400">Brak pozycji w menu.</p> : (
          <table className="w-full text-white border-collapse">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 text-left">Zdjęcie</th>
                <th className="p-2 text-left">Nazwa</th>
                <th className="p-2 text-left">Opis</th>
                <th className="p-2 text-left">Cena</th>
                <th className="p-2 text-left">Akcje</th>
              </tr>
            </thead>
            <tbody>
              {menu.map((item) => (
                <tr key={item.id} className="border-b border-gray-700">
                  <td className="p-2">
                    {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />}
                  </td>
                  <td className="p-2">
                    {editingItem?.id === item.id ? (
                      <input
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        className="p-1 bg-gray-700 text-white rounded"
                      />
                    ) : (
                      item.name
                    )}
                  </td>
                  <td className="p-2">
                    {editingItem?.id === item.id ? (
                      <input
                        value={editingItem.description}
                        onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                        className="p-1 bg-gray-700 text-white rounded"
                      />
                    ) : (
                      item.description
                    )}
                  </td>
                  <td className="p-2">
                    {editingItem?.id === item.id ? (
                      <input
                        type="number"
                        value={editingItem.price}
                        onChange={(e) => setEditingItem({ ...editingItem, price: parseFloat(e.target.value) })}
                        className="p-1 bg-gray-700 text-white rounded"
                      />
                    ) : (
                      `${item.price} zł`
                    )}
                  </td>
                  <td className="p-2 flex gap-2">
  {editingItem?.id === item.id ? (
    <>
      <button onClick={handleEditItem} className="bg-blue-500 px-3 py-1 rounded text-white">
        💾 Zapisz
      </button>
      <button onClick={() => setEditingItem(null)} className="bg-gray-500 px-3 py-1 rounded text-white">
        ❌ Anuluj
      </button>
    </>
  ) : (
    <>
      <button onClick={() => setEditingItem(item)} className="bg-yellow-500 px-3 py-1 rounded text-white">
        ✏️ Edytuj
      </button>
      <button onClick={() => handleDeleteItem(item.id)} className="bg-red-500 px-3 py-1 rounded text-white">
        🗑️ Usuń
      </button>
    </>
  )}
</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
