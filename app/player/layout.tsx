import { Suspense } from "react";
import Search from "../ui/search";
import SignOutButton from "../ui/signOutButton"

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex justify-end">
        <Suspense>
          <Search placeholder="search song or artist"/>
        </Suspense>
        <SignOutButton/>
      </div>
      <div className="flex-grow p-12">{children}</div>
    </>
  );
}