import React from "react"
import Header from "../Header"

const LoginPage = () => {
  return (
    <div className="mt-4">
      <h1 className="text-4xl text-center">Login</h1>
      <form action="">
        <input type="email" placeholder="'your@email.com" />
        <input type="password" placeholder="password" />
        <button>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
