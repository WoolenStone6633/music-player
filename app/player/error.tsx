'use client'

type props = {
  error: Error,
}

const error = ({error}: props) => {
  return <p>{error.message}</p>
}