import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/prisma";
import { CheckCircle2, MoreVertical, XCircle } from "lucide-react";
import Link from "next/link";

export default async function ProductTable() {
  const products = prisma.product.findMany({
    select: {
      id: true,
      name: true,
      priceInRupees: true,
      isAvailableForPurchase: true,
      _count: {
        select: {
          orders: true,
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
  if ((await products).length === 0) {
    return <p>No products found.</p>;
  }
  console.log(products);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-0">
            <span className="sr-only">Available for Purchase</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Orders</TableHead>
          <TableHead className="w-0">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {(await products).map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              {product.isAvailableForPurchase ? (
                <>
                  <div className="sr-only">Available for Purchase</div>
                  <CheckCircle2 />
                </>
              ) : (
                <>
                  {" "}
                  <div className="sr-only">Unavailable for Purchase</div>
                  <XCircle />
                </>
              )}
            </TableCell>
            <TableCell>{product.name}</TableCell>
            <TableCell>₹{product.priceInRupees.toFixed(2)}</TableCell>
            <TableCell>{product._count.orders}</TableCell>
            <TableCell className="w-0">
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer">
                  <MoreVertical />
                  <span className="sr-only">Actions</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <a download href={`/admin/products/${product.id}/download`}>
                      Download
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/products/${product.id}/edit`}>
                      Edit
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/admin/products/${product.id}/delete`}>
                      Delete
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
