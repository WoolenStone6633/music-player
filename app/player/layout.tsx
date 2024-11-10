import { redirect } from "next/navigation";
import Search from "../ui/search";
import SignOutButton from "../ui/signOutButton"
import { getCurrentSession } from "@/lib/session";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { user } = await getCurrentSession();
	if (!user) {
		return redirect("/")
	}
  return (
    <>
      <div className="flex justify-end">
        <Search placeholder="search song or artist"/>
        <SignOutButton/>
      </div>
      <div className="flex-grow p-12">{children}</div>
    </>
  );
}