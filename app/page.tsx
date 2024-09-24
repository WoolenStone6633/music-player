'use client'

import LoginButton from "./ui/loginButton";
import { useSearchParams } from "next/navigation"

export default function Home() {
  return (
    <main className="text-center mt-16">
      <p>Welcome to the Music PLayer!</p>
      <div className="flex justify-center gap-4">
        <LoginButton/>
      </div>
    </main>
  );
}
