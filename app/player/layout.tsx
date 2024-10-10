import { redirect } from "next/navigation";
import Search from "../ui/search";
import SignOutButton from "../ui/signOutButton"
import { validateRequest } from "@/lib/auth";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const { user } = await validateRequest();
	if (!user) {
		return redirect("/")
	}
  return (
    <>
      <div className="flex justify-end">
        <Search placeholder="search song"/>
        <SignOutButton/>
      </div>
      <div className="flex-grow p-12">{children}</div>
    </>
  );
}