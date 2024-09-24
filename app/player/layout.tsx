import Search from "../ui/search";
import SignOutButton from "../ui/signOutButton"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex justify-end">
        <Search placeholder="search"/>
        <SignOutButton/>
      </div>
      <div className="flex-grow p-12">{children}</div>
    </>
  );
}