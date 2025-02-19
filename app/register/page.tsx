"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleRegister} className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-bold">Rejestracja</h2>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="mt-4 p-2 w-full bg-gray-700 text-white rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Hasło"
          className="mt-2 p-2 w-full bg-gray-700 text-white rounded"
          required
        />
        <button type="submit" className="mt-4 bg-green-500 px-4 py-2 rounded text-white w-full">
          Zarejestruj się
        </button>
      </form>
    </div>
  );
}
