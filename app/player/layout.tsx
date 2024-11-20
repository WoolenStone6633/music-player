import { Suspense } from "react";
import Search from "../ui/search";
import SignOutButton from "../ui/signOutButton"

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="fixed flex justify-between w-full pt-5 pb-4 top-0 bg-white z-50">
        <div className="w-32 opacity-0"/>
        <Suspense>
          <Search placeholder="search song or artist"/>
        </Suspense>
        <SignOutButton/>
      </header>
      <main className="mt-28 mb-4">
        {children}
      </main>
    </>
  );
}