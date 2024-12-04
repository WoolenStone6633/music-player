import BackButton from "../ui/backButton";

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed flex justify-between w-full pt-5 pb-4 top-0 bg-white z-50">
        <div className="w-32 opacity-0"/>
        <BackButton/>
      </header>
      <main className="mt-28 mb-4">
        {children}
      </main>
      <footer className="mt-auto bg-gray-200 border-gray-600 border-t-[1px]">
        <p className="text-center py-2 text-gray-700">All songs listed above were obtained through <a className='underline underline-offset-2' href="https://freetouse.com/music">freetouse.com</a></p>
      </footer>
    </div>
  );
}