import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Pobieranie wszystkich zamówień
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { table: true },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Błąd pobierania zamówień:", error);
    return NextResponse.json({ error: "Błąd pobierania zamówień" }, { status: 500 });
  }
}

// Tworzenie nowego zamówienia
export async function POST(req: Request) {
  try {
    const { tableId, items, totalPrice } = await req.json();

    if (!tableId || !items || totalPrice === undefined) {
      return NextResponse.json({ error: "Brak wymaganych danych" }, { status: 400 });
    }

    const newOrder = await prisma.order.create({
      data: {
        tableId,
        items,
        totalPrice,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Błąd tworzenia zamówienia:", error);
    return NextResponse.json({ error: "Błąd tworzenia zamówienia" }, { status: 500 });
  }
}
