'use client'

import Link from "next/link"

export default function BackButton () {
  return (
    <Link href='/' className="place-self-end text-lg py-2 px-4 mr-6 rounded-lg bg-red-300">Back</Link>
  )
}