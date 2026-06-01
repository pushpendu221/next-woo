import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cacheTag } from "next/cache";
import { Suspense } from "react";
import ProductCard, { ProductCardSkeleton } from "../admin/_components/productCard";

async function getMostPopularProducts() {
  "use cache";
  cacheTag("products");
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { orders: { _count: "desc" } },
  });
}
async function getMostNewestProducts() {
  "use cache";
  cacheTag("products");
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
  });
}

export default function Home() {
  return (
    <>
      {" "}
      <ProductActionGrid
        title="Most Popular Products"
        productFetcher={getMostPopularProducts}
      />
      <ProductActionGrid
        title="Most Newest Products"
        productFetcher={getMostNewestProducts}
      />
    </>
  );
}

async function ProductActionGrid({ title, productFetcher }) {
  return (
    <div className="space-y-8">
      <div className="flex gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button asChild variant="outline">
          <Link href="/products" className="space-x-2">
            View All <ArrowRight className="w-4"></ArrowRight>
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense fallback={<ProductCardSkeleton />}>
          <ProductSuspense productFetcher={productFetcher} />
        </Suspense>
      </div>
    </div>
  );
}
async function ProductSuspense({ productFetcher }) {
  return await productFetcher().then((products) =>
    products.map((product) => (
      <ProductCard
        key={product.id}
        id={product.id}
        imagePath={product.imagePath}
        title={product.name}
        price={product.price}
        description={product.description}
      />
    )),
  );
}
