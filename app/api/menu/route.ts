import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const menuItems = await prisma.menuItem.findMany();
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error("Błąd pobierania menu:", error); // Logowanie błędu dla debugowania
    return NextResponse.json({ error: "Błąd pobierania menu" }, { status: 500 });
  }
}
