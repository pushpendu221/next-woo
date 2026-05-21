import PageHeader from "@/app/admin/_components/pageHeader";
import React from "react";
import ProductForm from "../../_components/productForm";
import { prisma } from "@/lib/prisma";

export default async function EditProductPage({ params }) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  return (
    <div>
      <PageHeader>Edit Product</PageHeader>
      <ProductForm product={product} />
    </div>
  );
}
