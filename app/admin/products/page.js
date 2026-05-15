import React from "react";
import PageHeader from "../_components/pageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductTable from "./_components/table";

export default function ProductPage() {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <PageHeader>Product page</PageHeader>
        <Button asChild>
          <Link href="/admin/products/new">Add New</Link>
        </Button>
      </div>
      <ProductTable />
    </>
  );
}
