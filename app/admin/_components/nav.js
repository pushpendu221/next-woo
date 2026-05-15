"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { use } from "react";

export function Nav({ children }) {
  return (
    <div className="p-3 px-5 flex shadow-md bg-amber-50 justify-between items-center">
      <div className="flex gap-3 items-center">
        <Image src={"/next.svg"} alt="" width={30} height={30} />
        <h2 className="font-bold text-2xl">Ai Video</h2>
      </div>
      <div>{children}</div>
      <div className="flex items-center gap-3">
        <div>Cart</div>
      </div>
    </div>
  );
}

export function NavLink(props) {
  const pathname = usePathname();
  return (
    <Link
      {...props}
      className={`p-3 hover:bg-amber-100 hover:text-blue-900  
      focus:bg-amber-100 focus:text-blue-900 ${pathname === props.href ? "bg-amber-100 text-blue-900" : ""}`}
    />
  );
}
