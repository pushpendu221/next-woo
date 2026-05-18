"use client";
import React from "react";
import PageHeader from "../../_components/pageHeader";
import ProductForm from "../_components/productForm";

export default function NewProductPage() {
  return (
    <div>
      <PageHeader>New Product</PageHeader>
      <ProductForm />
    </div>
  );
}
