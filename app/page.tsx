import GuestButton from "./ui/guestButton";
import LoginButton from "./ui/loginButton";

export default function Home() {
  return (
    <main className="flex min-h-screen justify-center items-center text-center -mt-12">
      <div className="inline-block py-7 px-16 mx-2 rounded-2xl bg-zinc-300">
        <p className="text-2xl mb-6">Welcome to the Music PLayer! Login with Spotify premium to continue.</p>
        <LoginButton text={'Login'}/>
        <p className="text-2xl p-4">Or</p>
        <GuestButton text={'View App as a Guest'}/>
      </div>
    </main>
  );
}
