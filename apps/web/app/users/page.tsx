import { getUsers } from "./actions";
import UsersClient from "./UsersClient";

export default async function UsersPage() {
  const users = await getUsers(); // Fetch users before rendering

  return <UsersClient users={users} />;
}
