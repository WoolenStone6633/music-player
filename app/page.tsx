'use client'

import LoginButton from "./ui/loginButton";
import { useSearchParams } from "next/navigation"

export default function Home() {
  const grantType = 'authorization_code'
  const redUri = 'http://localhost:3000/'

  const code = useSearchParams().get('code')

  return (
    <main className="text-center mt-16">
      <p>Welcome to the Music PLayer!</p>
      <div className="flex justify-center gap-4">
        {/* <LoginButton/> */}
        <a href="/login/spotify">Sign in with Spotify</a>
        {/* <button>Sign up</button> */}
      </div>
    </main>
  );
}
