'use client'

import LoginButton from "./ui/loginButton";
import { usePathname, useSearchParams, useRouter } from "next/navigation"
import { getTokens } from "@/auth";
import { useEffect } from "react";

export default function Home() {
 const grantType = 'authorization_code'
 const redUri = 'http://localhost:3000/'

  const code = useSearchParams().get('code')
  const pathname = usePathname()
  const { replace } = useRouter()
  const parms = new URLSearchParams
  parms.set('grant_type', grantType)
  code && parms.set('code', code)
  parms.set('redirect_uri', redUri)
  replace(`${pathname}?${parms.toString()}`)

  useEffect(() => {
    code && getTokens('')
  }, [parms])

  return (
    <main className="text-center mt-16">
      <p>Welcome to the Music PLayer!</p>
      <div className="flex justify-center gap-4">
        <LoginButton/>
        <button>Sign up</button>
      </div>
    </main>
  );
}
