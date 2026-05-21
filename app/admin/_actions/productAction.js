"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import fs from "fs/promises";
import { notFound, redirect } from "next/navigation";

const fileScheme = z.instanceof(File, { message: "File is required" });
const imageScheme = fileScheme.refine(
  (file) => file.size === 0 || file.type.startsWith("image/"),
);
// zod schema for validating form data
const productSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  file: fileScheme.refine((file) => file.size > 0, {
    message: "file is missing",
  }),
  image: imageScheme.refine((file) => file.size > 0, {
    message: "file is missing",
  }),
});
export default async function productAction(prevState, formdata) {
  const result = productSchema.safeParse(
    Object.fromEntries(formdata.entries()),
  );
  if (result.success == false) {
    // const errors = result.error.flatten().fieldErrors;
    const errors = z.flattenError(result.error).fieldErrors;
    // console.log(errors);
    return errors; // errors;
  }
  const data = result.data;
  await fs.mkdir("products", { recursive: true }); // create a folder named product if it doesn't exist or to add multople files in the same folder
  const filePath = `products/${crypto.randomUUID()}-${data.file.name}`; // path to save
  await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer())); // save the file to the disk

  await fs.mkdir("public/products", { recursive: true }); // create a folder named product if it doesn't exist or to add multople files in the same folder
  const imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`; // path to save
  await fs.writeFile(
    `public${imagePath}`,
    Buffer.from(await data.image.arrayBuffer()),
  ); // save the file to the disk
  await prisma.product.create({
    data: {
      name: data.name,
      priceInRupees: data.price,
      category: data.category,
      description: data.description,
      imagePath: imagePath,
      filePath: filePath,
      updatedAt: new Date(),
    },
  });
  redirect("/admin/products");
}
export async function toggleProductAvailability(id, isAvailableForPurchase) {
  await prisma.product.update({
    where: { id },
    data: { isAvailableForPurchase },
  });
}

export async function deleteProduct(id) {
  const product = await prisma.product.delete({
    where: { id },
  });
  if (product == null) return notFound();
  fs.unlink(product.filePath);
  fs.unlink(`public${product.imagePath}`);
}

const editSchema = productSchema.extend({
  file: fileScheme.optional(),
  image: imageScheme.optional(),
});
export async function UpdateProduct(id, prevState, formdata) {
  const result = editSchema.safeParse(Object.fromEntries(formdata.entries()));
  if (result.success == false) {
    // const errors = result.error.flatten().fieldErrors;
    const errors = z.flattenError(result.error).fieldErrors;
    // console.log(errors);
    return errors; // errors;
  }
  const data = result.data;
  const product = await prisma.product.findUnique({ where: { id } });
  if (product == null) return notFound();

  let filePath = product.filePath;
  if (data.file != null && data.file.size > 0) {
    await fs.unlink(product.filePath); // delete the old file
    await fs.mkdir("products", { recursive: true }); // create a folder named product if it doesn't exist or to add multople files in the same folder
    filePath = `products/${crypto.randomUUID()}-${data.file.name}`; // path to save
    await fs.writeFile(filePath, Buffer.from(await data.file.arrayBuffer())); // save the file to the disk
  }

  let imagePath = product.imagePath;
  if (data.image != null && data.image.size > 0) {
    await fs.unlink(`public${product.imagePath}`); // delete the old file
    await fs.mkdir("public/products", { recursive: true }); // create a folder named product if it doesn't exist or to add multople files in the same folder
    imagePath = `/products/${crypto.randomUUID()}-${data.image.name}`; // path to save
    await fs.writeFile(
      `public${imagePath}`,
      Buffer.from(await data.image.arrayBuffer()),
    ); // save the file to the disk
  }
  await prisma.product.update({
    where: { id },
    data: {
      name: data.name,
      priceInRupees: data.price,
      category: data.category,
      description: data.description,
      imagePath: imagePath,
      filePath: filePath,
      updatedAt: new Date(),
    },
  });
  redirect("/admin/products");
}
