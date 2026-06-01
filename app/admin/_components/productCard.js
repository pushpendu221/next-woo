import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ProductCard({
  id,
  imagePath,
  title,
  price,
  description,
}) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative w-full h-auto aspect-video">
        <Image src={imagePath}  alt={title || "productImage"} fill/>
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>

        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="line-clamp-4">{price}</p>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full">
          <Link href={`/checkout/${id}/purchase`}>Purchase</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="flex flex-col overflow-hidden animate-pulse">
      <div className="w-full aspect-video bg-gray-300"></div>
      <CardHeader>
        <CardTitle>
          {" "}
          <div className="w-3/4 h-6 rounded-full bg-gray-300"></div>
        </CardTitle>

        <CardDescription>
          <div className="w-1/2 h-4 rounded-full bg-gray-300"></div>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-3/4 h-4 rounded-full bg-gray-300"></div>
      </CardContent>
      <CardFooter>
        <Button size="lg" disabled className="w-full"></Button>
      </CardFooter>
    </Card>
  );
}
