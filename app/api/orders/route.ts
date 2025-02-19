import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Pobieranie wszystkich zamówień
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        table: { select: { name: true } }, // 🔹 Pobieramy nazwę stolika
        items: true, // ✅ Pobieramy powiązane pozycje zamówienia
      },
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

    // Tworzymy zamówienie i dodajemy powiązane OrderItem
    const newOrder = await prisma.order.create({
      data: {
        tableId,
        totalPrice,
        items: {
          create: items.map((item: { name: string; price: number; quantity: number }) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        items: true, // ✅ Teraz Prisma powinna poprawnie pobierać `items`
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Błąd tworzenia zamówienia:", error);
    return NextResponse.json({ error: "Błąd tworzenia zamówienia" }, { status: 500 });
  }
}
