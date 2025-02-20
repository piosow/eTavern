import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="bg-gray-900 p-4 text-white flex justify-between">
        <h1 className="text-xl font-bold">🍽️ e-Tavern</h1>
        <Link href="/admin">
          <span className="hover:text-gray-300 cursor-pointer">🔧 Panel Admina</span>
        </Link>
      </nav>
      <main className="p-4">{children}</main>
    </div>
  );
}
