import {
  Container,
  CustomLink,
  FormContainer,
  FormInput,
  Submit,
  Title,
} from "../../components";
import { commonModalClasses } from "../../utils/theme";

const ForgetPassword = () => {
  return (
    <FormContainer>
      <Container>
        <form
          action=""
          className={`${commonModalClasses}  w-[460px] space-y-6`}
        >
          <Title small={true}>Please Enter Your Email</Title>
          <FormInput
            label={"Email"}
            placeholder={"xyz@example.com"}
            name={"email"}
            type="email"
          />

          <Submit value={"Send Link"} />

          <div className=" flex items-center justify-between text-dark-subtle">
            <p className="flex gap-2">
              <CustomLink to={"/auth/sign-up"} className=" hover:underline">
                Sign Up
              </CustomLink>
            </p>
            <p className="flex gap-2">
              <CustomLink to={"/auth/sign-in"} className=" hover:underline">
                Sign in
              </CustomLink>
            </p>
          </div>
        </form>
      </Container>
    </FormContainer>
  );
};

export default ForgetPassword;
