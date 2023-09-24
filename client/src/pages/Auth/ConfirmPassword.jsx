import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {
  Container,
  FormContainer,
  FormInput,
  Submit,
  Title,
} from "../../components";
import { commonModalClasses } from "../../utils/theme";

const ConfirmPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  return (
    <FormContainer>
      <Container>
        <form
          action=""
          className={` ${commonModalClasses} w-[460px] space-y-6`}
        >
          <Title small={true}>Enter New Password</Title>

          <div className="flex flex-col gap-1 relative">
            <FormInput
              label={"New Password"}
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

          <div className="flex flex-col gap-1 relative">
            <FormInput
              label={"Confirm New Password"}
              placeholder={"*******"}
              name={"confirmPassword"}
              type={confirmShowPassword ? "text" : "password"}
            />
            <span
              onClick={() => setConfirmShowPassword((prev) => !prev)}
              className="absolute right-3 top-[40px] z-[10] cursor-pointer"
            >
              {!confirmShowPassword ? (
                <AiOutlineEyeInvisible
                  fontSize={24}
                  className=" dark:text-dark-subtle"
                />
              ) : (
                <AiOutlineEye fontSize={24} className="dark:text-dark-subtle" />
              )}
            </span>
          </div>

          <Submit value={"Change Password"} />
        </form>
      </Container>
    </FormContainer>
  );
};

export default ConfirmPassword;
