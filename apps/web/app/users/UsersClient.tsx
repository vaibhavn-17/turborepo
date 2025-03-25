"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@repo/react-query-config";
import { addUser, deleteUser } from "./actions";

interface User {
  id: number;
  name: string;
}

export default function UsersClient({ users }: { users: User[] }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [name, setName] = useState("");
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Fetch users
  const {
    data: userList = [],
    isLoading,
    isError,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => Promise.resolve(users),
  });

  // Add user mutation
  const addUserMutation = useMutation({
    mutationFn: (formData: FormData) => addUser(formData),
    onSuccess: (newUser: User) => {
      queryClient.setQueryData<User[]>(["users"], (oldUsers = []) => [
        ...oldUsers,
        newUser,
      ]);
      setName("");
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (id: number) => {
      setDeletingId(id);
      await deleteUser(id);
      setDeletingId(null);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["users"] });
      const previousUsers = queryClient.getQueryData<User[]>(["users"]);
      queryClient.setQueryData<User[]>(["users"], (oldUsers = []) =>
        oldUsers.filter((user) => user.id !== id),
      );
      return { previousUsers };
    },
    onError: (_err, _id, context) => {
      if (context?.previousUsers) {
        queryClient.setQueryData(["users"], context.previousUsers);
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    addUserMutation.mutate(formData);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Users Page</h1>

      {/* Add User Form */}
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter user name"
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
          disabled={addUserMutation.isPending}
        >
          {addUserMutation.isPending ? "Adding..." : "Add User"}
        </button>
      </form>

      {/* Loading & Error State */}
      {isLoading && <p>Loading users...</p>}
      {isError && (
        <p className="text-red-500">Error loading users. Please try again.</p>
      )}

      {/* Users List */}
      <ul className="space-y-4 w-full max-w-md">
        {userList.map(({ id, name }) => (
          <li
            key={id}
            className="p-4 bg-white shadow rounded flex justify-between items-center cursor-pointer hover:bg-gray-200 transition"
            onClick={() => router.push(`/users/${id}`)} // Navigate to user profile
          >
            <span>{name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteUserMutation.mutate(id);
              }}
              className="bg-red-500 text-white px-3 py-1 rounded"
              disabled={deletingId === id}
            >
              {deletingId === id ? "Deleting..." : "Delete"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
