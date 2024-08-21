"use client"
import PasswordManagerIcon from "@/icons/lock-main";
import { useState } from "react";
//cambiar por elementos de shacn maybe?


export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = {
      email: username,
      password: password
    };

    try {
      const response = await fetch('http://localhost:3000/api/sign-in', {
        method: "POST",
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      //data es la access token
      console.log(data);

    } catch(error) {
      console.log(error);
    }
  };

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value.trim());
  };

  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value.trim());
  };

  return (
    <>
      <div className="flex justify-center">
        <PasswordManagerIcon />
      </div>
      {/* set a max width instead of breaks */}
      {/* give form elements names, put inside of a form that submits to back-end */}
      {/* take access token recieved by back-end and store it or idk */}
      <form onSubmit={handleSubmit}>
        <h1 className="text-[#EF233C] font-bold text-6xl text-center">Log in to password <br></br> manager</h1>
        <p className="text-black font-bold text-2xl mt-10">Email or username</p>
        <input type="text" name="username" value={username} onChange={handleUsernameChange} className="w-full rounded-md border border-black p-2 mt-1" />
        <p className="text-black font-bold text-2xl mt-4">Password</p>
        <input type="password" name="password" value={password} onChange={handlePasswordChange} className="w-full rounded-md border border-black p-2 mt-1" />
        <div className="flex flex-row justify-around mt-4">
          <button className="bg-[#2B2D42] text-white font-bold text-lg rounded-full w-1/2 mr-1 mt-2 py-4">Create account</button>
          <button className="bg-[#FF0000] text-white font-bold text-lg rounded-full w-1/2 ml-1 mt-2 py-4">Log in</button>
        </div>
      </form>
    </>
  )
}