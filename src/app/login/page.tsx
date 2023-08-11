'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    const formData = new FormData(event.target)
    const username = formData.get('username')
    const password = formData.get('password')

    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    })
    // console.log(object);
    const { accessToken } = await res.json()
    console.log(accessToken)
    if (accessToken) {
      // const nextUrl = searchParams.get('next')
      // @see: https://github.com/vercel/next.js/discussions/44149
      router.push('/')
    } else {
      // Make your shiny error handling with a great user experience
      alert('Login failed')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type='text' name='username' className='text-black' />
      </label>
      <label>
        Password:
        <input type='password' name='password' className='text-black' />
      </label>
      <button type='submit'>Login</button>
    </form>
  )
}
