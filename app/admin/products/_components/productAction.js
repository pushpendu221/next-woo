"use client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { startTransition, useTransition } from "react";
import {
  deleteProduct,
  toggleProductAvailability,
} from "../../_actions/productAction";
import { useRouter } from "next/navigation";

export function ActiveToggleDropdown({ id, isAvailableForPurchase }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          await toggleProductAvailability(id, !isAvailableForPurchase);
          router.refresh();
        });
      }}
    >
      {!isAvailableForPurchase ? "Activate" : "Deactivate"}
    </DropdownMenuItem>
  );
}

export function DeleteDropdownItem({ id, disabled }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <DropdownMenuItem
      variant="destructive"
      disabled={disabled || pending}
      onClick={() => {
        startTransition(async () => {
          await deleteProduct(id);
          router.refresh();
        });
      }}
    >
      Delete
    </DropdownMenuItem>
  );
}
