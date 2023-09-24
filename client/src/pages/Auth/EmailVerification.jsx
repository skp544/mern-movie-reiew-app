import { useEffect, useRef, useState } from "react";
import { Container, FormContainer, Submit, Title } from "../../components";
import { commonModalClasses } from "../../utils/theme";

const OTP_LENGTH = 6;
let currentOTPIndex;

const EmailVerification = () => {
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  const focusNextInputField = (index) => {
    setActiveOtpIndex(index + 1);
  };

  const focusPrevInputField = (index) => {
    let nextIndex;
    const diff = index - 1;
    nextIndex = diff !== 0 ? diff : 0;

    setActiveOtpIndex(nextIndex);
  };

  const handleOtpChange = (e) => {
    const value = e.target.value;
    // console.log(value);
    const newOtp = [...otp];
    newOtp[currentOTPIndex] = value.substring(value.length - 1, value.length);

    if (!value) {
      focusPrevInputField(currentOTPIndex);
    } else {
      focusNextInputField(currentOTPIndex);
    }
    setOtp([...newOtp]);
  };

  const handleKeyDown = ({ key }, index) => {
    currentOTPIndex = index;
    if (key === "Backspace") {
      focusPrevInputField(currentOTPIndex);
    }
  };

  return (
    <FormContainer>
      <Container>
        <form
          action=""
          className={`${commonModalClasses} py-8 space-y-7 text-center w-max `}
        >
          <div className="flex flex-col gap-2">
            <Title small={true}>
              Please Enter the OTP to verify your account
            </Title>
            <p className=" text-center dark:text-dark-subtle text-light-subtle">
              OTP has been sent to your email
            </p>
          </div>

          <div className=" space-x-4">
            {otp.map((_, index) => {
              return (
                <input
                  key={index}
                  type="number"
                  value={otp[index] || ""}
                  ref={activeOtpIndex === index ? inputRef : null}
                  onChange={handleOtpChange}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 rounded-md border-2 dark:border-dark-subtle border-light-subtle font-semibold dark:focus:border-white focus:border-primary  bg-transparent outline-none text-center dark:text-white text-primary text-xl spin-button-none"
                />
              );
            })}
          </div>

          <Submit value={"Send Link"} />
        </form>
      </Container>
    </FormContainer>
  );
};

export default EmailVerification;
