import { Link } from "react-router-dom";
import { Button } from "./Button";
import { InputBox } from "./InputBox";
import { useState } from "react";
import { SigninInput } from "@sachinagr/medium-common";
import axios  from "axios"
import { useNavigate } from "react-router-dom";
import { DATABASE_URL } from "../config";

export function SigninBox() {
  const [postInputs, setPostInputs] = useState<SigninInput>({
    email: "",
    password: ""
  });

  const navigate = useNavigate();
  async function sendRequest() {
    try{
      const response = await axios.post(`${DATABASE_URL}/user/signin`, postInputs);
        const jwt = response.data;
        localStorage.setItem("token",jwt);
        navigate("/blogs");
    } catch(e) {
      alert("Error while signing in");
    }
  }

  return<div className="flex justify-center items-center min-h-screen">
    <div className="space-y-4">
      <div className="font-bold	 text-3xl">Log into your account</div>
      <div className="text-slate-500 my-2 font-semibold">
        Don't have an account?
        <Link className="underline" to={"/signup"}>SignUp</Link>
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
      
      <Button onClick={sendRequest} label={"Sign In"}></Button>
    </div>
  </div>
}