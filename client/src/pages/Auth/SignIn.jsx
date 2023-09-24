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

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormContainer>
      <Container>
        <form className={commonModalClasses}>
          <Title>Sign In</Title>
          <FormInput
            label={"Email"}
            placeholder={"xyz@example.com"}
            name={"email"}
            type="email"
          />
          <div className="flex flex-col gap-1 relative">
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
            <CustomLink
              to={"/auth/forget-password"}
              className=" flex justify-end items-center text-sm"
            >
              Forgot Password?
            </CustomLink>
          </div>
          <Submit value={"Sign In"} />

          <div className=" flex items-center justify-center dark:text-dark-subtle">
            <p className="flex gap-2">
              Don&apos;t have an account?
              <CustomLink to={"/auth/sign-up"} className=" hover:underline">
                Sign Up
              </CustomLink>
            </p>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default SignIn;
