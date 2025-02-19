import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Pobranie wszystkich stolików
export async function GET() {
  try {
    const tables = await prisma.table.findMany();
    return NextResponse.json(tables);
  } catch (error) {
    console.error("Błąd pobierania stolików:", error);
    return NextResponse.json({ error: "Błąd pobierania stolików" }, { status: 500 });
  }
}

// Dodanie nowego stolika
export async function POST(req: Request) {
  try {
    const { name } = await req.json();
    const qrCode = `${process.env.NEXT_PUBLIC_BASE_URL}/table/${name}`;

    const newTable = await prisma.table.create({
      data: { name, qrCode },
    });

    return NextResponse.json(newTable, { status: 201 });
  } catch (error) {
    console.error("Błąd dodawania stolika:", error);
    return NextResponse.json({ error: "Błąd dodawania stolika" }, { status: 500 });
  }
}

// Edycja stolika
export async function PUT(req: Request) {
  try {
    const { id, name } = await req.json();
    const updatedTable = await prisma.table.update({
      where: { id },
      data: { name, qrCode: `${process.env.NEXT_PUBLIC_BASE_URL}/table/${name}` },
    });

    return NextResponse.json(updatedTable);
  } catch (error) {
    console.error("Błąd edycji stolika:", error);
    return NextResponse.json({ error: "Błąd edycji stolika" }, { status: 500 });
  }
}

// Usuwanie stolika
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.table.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Stolik usunięty" });
  } catch (error) {
    console.error("Błąd usuwania stolika:", error);
    return NextResponse.json({ error: "Błąd usuwania stolika" }, { status: 500 });
  }
}
