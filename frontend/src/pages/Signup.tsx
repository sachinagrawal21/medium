import { Quote } from "../components/Quote";
import { SignupBox } from "../components/SignupBox";

export function Signup() {
  const label = "The cutomer service I received was exceptional. The support team went above and beyond to address my concerns."

  return <div className="flex grid grid-cols-2">
    <SignupBox></SignupBox>
    <Quote label={label}></Quote>
  </div>
}