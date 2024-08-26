import { Quote } from "../components/Quote";
import { SigninBox } from "../components/SinginBox";

export function Signin() {
  const label = "This blogging platform is outstanding! It offers a seamless experience for both writing and sharing content, making it a go-to choice for bloggers.";
  
  return <div className="flex grid grid-cols-2">
  <Quote label={label}></Quote>
  <SigninBox></SigninBox>
</div>
}