"use server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import fs from "fs/promises";
import { redirect } from "next/navigation";

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
  const imagePath = `products/${crypto.randomUUID()}-${data.image.name}`; // path to save
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

  return <div>productAction</div>;
}
