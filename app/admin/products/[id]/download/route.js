import { prisma } from "@/lib/prisma";
import fs from "fs/promises";

export async function GET(request, { params }) {
  const { id } = await params;
  console.log(id);
  const product = await prisma.product.findUnique({
    where: { id },
    select: {
      filePath: true,
      name: true,
    },
  });
  if (product == null) return notFound();
  const file = await fs.readFile(product.filePath);
  const { size } = await fs.stat(product.filePath);
  const extension = product.filePath.split(".").pop();
  return new Response(file, {
    headers: {
      "Content-Type": "application/octet-stream",
      "Content-Disposition": `attachment; filename="${product.name}.${extension}"`,
      "Content-Length": size.toString(),
    },
  });
}
