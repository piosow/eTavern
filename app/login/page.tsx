"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Nieprawidłowy email lub hasło");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-96">
        <h2 className="text-white text-2xl font-bold">Logowanie</h2>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        {/* 🔹 Logowanie klasyczne */}
        <form onSubmit={handleLogin} className="mt-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="p-2 w-full bg-gray-700 text-white rounded"
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
            Zaloguj się
          </button>
        </form>

        <hr className="my-4 border-gray-600" />

        {/* 🔹 Logowanie przez Google */}
        <button
          onClick={() => signIn("google")}
          className="mt-2 bg-blue-500 px-4 py-2 rounded text-white w-full"
        >
          Zaloguj się przez Google
        </button>

        <p className="mt-4 text-gray-400">
          Nie masz konta? <a href="/register" className="text-blue-400">Zarejestruj się</a>
        </p>
      </div>
    </div>
  );
}
