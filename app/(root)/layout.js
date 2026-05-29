import { Nav, NavLink } from "../admin/_components/nav";

export default function PublicLayout({ children }) {
  return (
    <>
      <Nav>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">Products</NavLink>
        <NavLink href="/orders">Orders</NavLink>
      </Nav>

      <main>{children}</main>
    </>
  );
}