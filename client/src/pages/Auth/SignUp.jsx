import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  Container,
  CustomLink,
  FormContainer,
  FormInput,
  Submit,
  Title,
} from "../../components";
import { commonModalClasses } from "../../utils/theme";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormContainer>
      <Container>
        <form action="" className={commonModalClasses}>
          <Title>Sign Up</Title>
          <FormInput
            label={"Name"}
            placeholder={"John Doe"}
            name={"text"}
            type="text"
          />
          <FormInput
            label={"Email"}
            placeholder={"xyz@example.com"}
            name={"email"}
            type="email"
          />
          <div className=" relative">
            <FormInput
              label={"Password"}
              placeholder={"*******"}
              name={"password"}
              type={showPassword ? "text" : "password"}
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[40px] z-[10] cursor-pointer"
            >
              {!showPassword ? (
                <AiOutlineEyeInvisible
                  fontSize={24}
                  className=" dark:text-dark-subtle"
                />
              ) : (
                <AiOutlineEye fontSize={24} className="dark:text-dark-subtle" />
              )}
            </span>
          </div>
          <Submit value={"Sign Up"} />

          <div className=" flex items-center justify-center dark:text-dark-subtle">
            <p className="flex gap-2">
              Already a user?
              <CustomLink to={"/auth/sign-in"} className="hover:underline">
                Sign In
              </CustomLink>
            </p>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignUp;
