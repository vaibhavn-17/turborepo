"use client";

import { useQuery } from "@repo/react-query-config";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function fetchPosts(): Promise<Post[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  return res.json();
}

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) return <p className="text-blue-500 text-center">Loading...</p>;

  if (error)
    return <p className="text-red-500 text-center">Error loading posts</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Posts
      </h1>
      <ul className="space-y-4">
        {data?.map((post, key) => (
          <li
            key={key}
            className="p-4 bg-white shadow-md rounded-md border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {post.title}
            </h2>
            <p className="text-gray-700">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
