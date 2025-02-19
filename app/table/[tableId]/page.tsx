import { useParams } from "next/navigation";

export default function TablePage() {
  const { tableId } = useParams();

  return (
    <div className="container mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold text-white">Stolik {tableId}</h1>
      <p className="text-lg text-gray-300 mt-2">Wybierz jedzenie i złóż zamówienie!</p>
    </div>
  );
}
