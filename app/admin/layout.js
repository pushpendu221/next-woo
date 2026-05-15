import React from "react";
import { Nav, NavLink } from "./_components/nav";
export const dynamic = "force-dynamic"; // No cache as its admin page

export default function AccountLayout({ children }) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/sales">Sales</NavLink>
      </Nav>
      <div className="flex-1 p-6">{children}</div>
    </>
  );
}
