"use server";

const API_URL = "http://localhost:5000/users";

// Fetch users
export async function getUsers() {
  const res = await fetch(API_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

// Add new user
export async function addUser(formData: FormData): Promise<{ id: number; name: string }> {
  const name = formData.get("name") as string;

  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) throw new Error("Failed to add user");

  return res.json();
}


// Delete user
export async function deleteUser(id: number) {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });

  if (!res.ok) throw new Error("Failed to delete user");

  return id;
}
