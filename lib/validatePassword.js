import { buffer } from "node:stream/consumers";

export async function validatePassword(password, hashedPassword) {
  console.log(await hashPassword(password));
  return (await hashPassword(password)) == hashedPassword;
}

async function hashPassword(password) {
  const encodePassword = await crypto.subtle.digest(
    "SHA-512",
    new TextEncoder().encode(password),
  );
  return Buffer.from(encodePassword).toString("base64");
}
