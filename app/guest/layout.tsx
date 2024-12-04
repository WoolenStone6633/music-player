import BackButton from "../ui/backButton";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="fixed flex justify-between w-full pt-5 pb-4 top-0 bg-white z-50">
        <div className="w-32 opacity-0"/>
        {/* change to back button */}
        <BackButton/>
      </header>
      <main className="mt-28 mb-4">
        {children}
      </main>
    </>
  );
}