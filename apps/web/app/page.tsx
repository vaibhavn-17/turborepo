import Link from "next/link";

export default function Page() {
  return (
    <main className="p-8 bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-8 drop-shadow-lg">
        Welcome to the Landing Page
      </h1>
      <Link
        href="/users"
        className="bg-blue-500 text-white py-3 px-6 rounded-lg shadow-lg transform transition-all hover:bg-blue-600 hover:scale-105"
      >
        Go to Users Page
      </Link>
    </main>
  );
}
