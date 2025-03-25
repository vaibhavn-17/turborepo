import { NextResponse } from "next/server";

const API_URL = "http://localhost:5000/users";

// GET all users
export async function GET() {
  const res = await fetch(API_URL);
  const users = await res.json();
  return NextResponse.json(users);
}

// POST (add new user)
export async function POST(req: Request) {
  const newUser = await req.json();
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newUser),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Failed to add user" }, { status: 500 });
  }

  return NextResponse.json(await res.json(), { status: 201 });
}
