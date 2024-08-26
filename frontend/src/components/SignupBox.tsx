import { Link } from "react-router-dom";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { useState } from "react";
import { SignupInput } from "@sachinagr/medium-common";
import axios  from "axios"
import { useNavigate } from "react-router-dom";
import { DATABASE_URL } from "../config";


export function SignupBox() {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  async function sendRequest() {
    try{
      const token = await axios.post(`${DATABASE_URL}/user/signup`, postInputs);
      const jwt = token.data;
      localStorage.setItem("token",jwt);
      navigate("/blogs");
    } catch(e) {
      alert("Error while signing up( Password must be min 8 char long)");
    }
  }

  return<div className="flex justify-center items-center min-h-screen">
    <div className="space-y-4">
      <div className="font-bold	 text-3xl">Create an account</div>
      <div className="text-slate-500 my-2 font-semibold">
        Already have an account?
        <Link className="underline" to={"/signin"}> Login</Link>
      </div>
      <InputBox label={"Email"} placeholder={"m@example.com"} onChange={(e) => {
        setPostInputs({
          ...postInputs,
          email: e.target.value
        })
      }}></InputBox>
      <InputBox type={"password"} label={"Password"} placeholder={""} onChange={(e) => {
        setPostInputs({
          ...postInputs,
          password: e.target.value
        })
      }}></InputBox>
      <InputBox label={"Name"} placeholder={"Enter your username"} onChange={(e) => {
        setPostInputs({
          ...postInputs,
          name: e.target.value
        })
      }}></InputBox>
      <Button label={"Sign Up"} onClick={sendRequest}></Button>
    </div>
  </div>
}