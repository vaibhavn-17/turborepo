import React from "react";
import Button from "../components/Button";
import Link from "next/link";

interface User {
  id: number;
  name: string;
}

const User = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users: User[] = await res.json();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Users Page</h1>
      <Link href="/" className="text-blue-500 underline mb-4 block text-center">
        Go back to Home
      </Link>
      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user.id} className="p-4 bg-white shadow rounded">
            {user.name}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Button />
      </div>
    </div>
  );
};

export default User;
