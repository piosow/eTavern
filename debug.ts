import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function checkPrismaTypes() {
  const testOrder = await prisma.order.findFirst({
    include: { items: true }, // 🔹 Tu sprawdzamy, czy TypeScript widzi `items`
  });

  console.log(testOrder);
}

checkPrismaTypes();