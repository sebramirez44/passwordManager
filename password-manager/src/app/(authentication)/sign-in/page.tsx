import PasswordManagerIcon from "@/icons/lock-main";
//cambiar por elementos de shacn maybe?
export default function SignIn() {
   return (
    <>
      <div className="flex justify-center">
        <PasswordManagerIcon />
      </div>
      {/* set a max width instead of breaks */}
      {/* give form elements names, put inside of a form that submits to back-end */}
      {/* take access token recieved by back-end and store it or idk */}
      <h1 className="text-[#EF233C] font-bold text-6xl text-center">Log in to password <br></br> manager</h1>
      <p className="text-black font-bold text-2xl mt-10">Email or username</p>
      <input type="text" className="rounded-md border border-black p-2 mt-1" />
      <p className="text-black font-bold text-2xl mt-4">Password</p>
      <input type="password" className="rounded-md border border-black p-2 mt-1" />
      <div className="flex flex-row justify-around mt-4">
        <button className="bg-[#2B2D42] text-white font-bold text-lg rounded-full w-1/2 mr-1 mt-2 py-4">Create account</button>
        <button className="bg-[#FF0000] text-white font-bold text-lg rounded-full w-1/2 ml-1 mt-2 py-4">Log in</button>
      </div>
    </>
   )
}