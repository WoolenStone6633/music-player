import LoginButton from "../ui/loginButton";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center text-center -mt-12">
      <div className="inline-block pt-7 pb-6 px-16 rounded-2xl bg-zinc-300">
        <p className="text-2xl mb-6">Your session has ended. Re-login with spotify to continue</p>
        <LoginButton text={'Login'}/>
      </div>
    </main>
  );
}