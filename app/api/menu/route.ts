import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// 📌 Pobieranie wszystkich pozycji menu (GET)
export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany();
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("Błąd pobierania menu:", error);
    return NextResponse.json({ error: "Błąd pobierania menu" }, { status: 500 });
  }
}

// 📌 Dodawanie nowej pozycji do menu (POST)
export async function POST(req: Request) {
  try {
    const { name, description, price, image, category } = await req.json();

    if (!name || !description || price === undefined || !category) {
      return NextResponse.json({ error: "Brak wymaganych danych (nazwa, opis, cena, kategoria)" }, { status: 400 });
    }

    const newItem = await prisma.menuItem.create({
      data: { 
        name, 
        description, 
        price, 
        image: image && image.trim() !== "" ? image : null, // ✅ Obsługujemy brak zdjęcia
        category
      },
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error("Błąd dodawania pozycji do menu:", error);
    return NextResponse.json({ error: "Błąd dodawania pozycji do menu" }, { status: 500 });
  }
}

// 📌 Usuwanie pozycji menu (DELETE)
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Brak ID pozycji" }, { status: 400 });
    }

    await prisma.menuItem.delete({ where: { id } });

    return NextResponse.json({ message: "Pozycja usunięta" }, { status: 200 });
  } catch (error) {
    console.error("Błąd usuwania pozycji z menu:", error);
    return NextResponse.json({ error: "Błąd usuwania pozycji z menu" }, { status: 500 });
  }
}
