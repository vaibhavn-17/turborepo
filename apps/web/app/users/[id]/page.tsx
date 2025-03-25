import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

async function getUser(id: string): Promise<User | null> {
  try {
    const res = await fetch(`http://localhost:5000/users/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function UserProfile({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);

  if (!user) return notFound();

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold">{user.name}</h1>
      <p className="text-gray-600">{user.email}</p>

      {/* Default avatar if missing */}
      <Image
        src={
          user.avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"
        }
        alt="User Avatar"
        width={128}
        height={128}
        className="w-32 h-32 rounded-full mt-4 border shadow"
      />

      <Link
        href="/users"
        className="mt-6 text-blue-500 hover:underline transition duration-200"
      >
        ← Back to Users
      </Link>
    </div>
  );
}
