import { NextResponse } from "next/server";

const API_URL = "http://localhost:5000/users";

// GET a single user
export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const res = await fetch(`${API_URL}/${params.id}`);
  if (!res.ok)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  return NextResponse.json(await res.json());
}

// DELETE a user
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const res = await fetch(`${API_URL}/${params.id}`, { method: "DELETE" });

  if (!res.ok)
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );

  return NextResponse.json({ message: "User deleted" }, { status: 200 });
}
