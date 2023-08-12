"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
    // console.log(object);
    const { accessToken } = await res.json();
    console.log(accessToken);
    if (accessToken) {
      // const nextUrl = searchParams.get('next')
      // @see: https://github.com/vercel/next.js/discussions/44149
      router.push("/");
    } else {
      // Make your shiny error handling with a great user experience
      alert("Login failed");
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full h-screen">
      <h1>JWT Token</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 justify-center items-center "
      >
        <label>
          Username:
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="text-black outline-none border border-gray-400 ml-2 rounded-lg px-2"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="text-black outline-none border border-gray-400 ml-2 rounded-lg px-2"
          />
        </label>
        <button
          type="submit"
          className="border bg-blue-300 px-3 py-2 rounded-lg hover:bg-black hover:text-white ease-in duration-300 "
        >
          Login
        </button>
      </form>
    </div>
  );
}
