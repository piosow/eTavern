"use client";

import { useParams } from "next/navigation";
import MenuList from "@/components/MenuList";

export default function TableMenuPage() {
  const { tableId } = useParams();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-white">Menu dla stolika {tableId}</h1>
      <MenuList />
    </div>
  );
}
