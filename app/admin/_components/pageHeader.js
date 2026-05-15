import React from "react";
import { Button } from "@/components/ui/button";
export default function PageHeader({ children }) {
  return <h1 className="text-4xl mb-4"> {children}</h1>;
}
