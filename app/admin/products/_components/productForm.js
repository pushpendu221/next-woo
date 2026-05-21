"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import React, { useActionState } from "react";
import productAction, { UpdateProduct } from "../../_actions/productAction";
import { useFormStatus } from "react-dom";
import Image from "next/image";

export default function ProductForm({ product }) {
  const [error, action] = useActionState(
    product == null ? productAction : UpdateProduct.bind(null, product.id),
    {},
  );
  const items = [
    { label: "Cars", value: "cars" },
    { label: "Bikes", value: "bikes" },
    { label: "Bicycles", value: "bicycles" },
  ];

  return (
    <form className="space-y-8" action={action}>
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Product Name"
          name="name"
          defaultValue={product?.name}
          required
        />
        {error?.name && (
          <div className="text-destructive">{error?.name[0]}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="price">Price In Rupees</Label>
        <Input
          id="price"
          type="number"
          placeholder="Product Price"
          name="price"
          defaultValue={product?.priceInRupees}
          required
        />
        {error?.price && (
          <div className="text-destructive">{error?.price[0]}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          items={items}
          name="category"
          defaultValue={product?.category}
          required
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {error?.category && (
          <div className="text-destructive">{error?.category[0]}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          placeholder="Product Description"
          name="description"
          defaultValue={product?.description}
        />
        {error?.description && (
          <div className="text-destructive">{error?.description[0]}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="file">File</Label>
        <Input id="file" type="file" name="file" required={product == null} />
        {product != null && (
          <div className="text-muted-foreground">
            Current File: {product?.filePath}
          </div>
        )}
        {error?.file && (
          <div className="text-destructive">{error?.file[0]}</div>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="image">Image</Label>
        <Input id="image" type="file" name="image" required={product == null} />
        {product != null && (
          <Image
            src={product?.imagePath}
            alt="productName"
            width={100}
            height={100}
          />
        )}
        {error?.image && (
          <div className="text-destructive">{error?.image[0]}</div>
        )}
      </div>
      <SubmitForm />
    </form>
  );
}

function SubmitForm() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}
