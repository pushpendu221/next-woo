import ProductCard, { ProductCardSkeleton } from '@/app/admin/_components/productCard'
import { prisma } from '@/lib/prisma';
import React, { Suspense } from 'react'

function productFetcher() {
  return prisma.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { name: "desc" },
  });
}
export default function Products() {
  return (
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Suspense fallback={<ProductCardSkeleton />}>
              <ProductsSuspense productFetcher={productFetcher} />
            </Suspense>
          </div>
  )
}

async function ProductsSuspense() {
    const products = await productFetcher();
    return products.map((product) => (
      <ProductCard key={product.id} {...product} />
    ));
}
