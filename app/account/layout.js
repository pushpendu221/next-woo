import React from "react";
import { Nav, NavLink } from "./_components/nav";

export default function AccountLayout({ children }) {
  return (
    <>
      <Nav>
        <NavLink href="/admin">Dashboard</NavLink>
        <NavLink href="/admin/products">Products</NavLink>
        <NavLink href="/admin/users">Customers</NavLink>
        <NavLink href="/admin/sales">Sales</NavLink>
      </Nav>
      <div className="ml-64">{children}</div>
    </>
  );
}
