import { NextResponse } from "next/server";
import { validatePassword } from "./lib/validatePassword";

export async function proxy(req) {
  if ((await authenicate(req)) == false) {
    return new NextResponse("Unauthorized", {
      status: 401,
      headers: { "WWW-Authenticate": "Basic" },
    });
  }
}
async function authenicate(req) {
  //return Promise.resolve(false);
  const authHeader =
    req.headers.get("Authorization") || req.headers.get("authorization");
  if (authHeader == null) return false;
  const [userName, password] = Buffer.from(authHeader.split(" ")[1], "base64")
    .toString()
    .split(":");
  // validatePassword(password, "success");
  // return false;
  return (
    userName == process.env.ADMIN_USERNAME &&
    (await validatePassword(password, process.env.HASHED_PASSWORD))
  );
}
export const config = {
  matcher: "/admin/:path*",
};
